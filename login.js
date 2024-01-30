import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      user: {
        username: 'barry91205@gmail.com',
        password: 'asd19951004',
      },
    }
  },
  methods: {
    login() {
      const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      axios.post(api, this.user)
      .then((response) => {
        const { token, expired } = response.data;
        alert('登入成功');
        
        document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
        window.location = 'products.html';
      }).catch((err) => {
        alert('帳號或密碼錯誤，請重新登入！')
      });
    },
  },
}).mount('#app');
