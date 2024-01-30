import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let productModal = null;
let delProductModal = null;

// import pagination from './pagination.js'
import productModel from './productModal.js';

createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'kun123',
      products: [],
      pages:{},
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
      
    }
  },
  mounted() {
    

    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    });

    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin();
  },
  methods: {
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then((res) => {
          this.getData();
          console.log(res.data.success)
        })
        .catch((err) => {
          // alert(err.response.data.message)
          console.log(err)
          window.location = 'login.html';
        })
    },
    getData(page) {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;
      axios.get(url).then((response) => {
        this.products = response.data.products;
        this.pages = res.data.pagination;
        
      }).catch((err) => {
        // alert(err.response.data.message);
      })
    },
    updateProduct() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let http = 'post';

      if (!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        http = 'put'
      }

      axios[http](url, { data: this.tempProduct }).then((response) => {
        alert(response.data.message);
        // productModal.hide();
        this.$refs.pModal.closeModal();
        this.getData();
      }).catch((err) => {
        alert(err.response.data.message);
      })
    },
    openModal(isNew, item) {
      if (isNew === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        // productModal.show();
        this.$refs.pModal.openModal();
      } else if (isNew === 'edit') {
        this.tempProduct = { ...item };
        this.isNew = false;
        // productModal.show();
        this.$refs.pModal.openNodal();
      } else if (isNew === 'delete') {
        this.tempProduct = { ...item };
        delProductModal.show()
      }
    },
    delProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

      axios.delete(url).then((response) => {
        alert(response.data.message);
        delProductModal.hide();
        this.getData();
      }).catch((err) => {
        alert(err.response.data.message);
      })
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
  },
  components: {
    // pagination
    productModel,
  },
}).mount('#app');
