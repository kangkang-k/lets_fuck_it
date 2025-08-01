<template>
  <div>
    <div class="container">
      <el-input v-model="account" placeholder="请输入账号"></el-input>
      <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
      <div class="button-container">
        <el-button type="success" class="terminate-button" @click="login">登录</el-button>
        <el-button type="success" class="terminate-button" @click="register">注册</el-button>
      </div>
    </div>


  </div>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      account: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://49.234.27.225:8000/userapp/login/', {
          username: this.account,
          password: this.password,
        });
        localStorage.setItem('username', this.account);
        this.$router.push('/info');

        const h = this.$createElement;
        this.$notify({
          title: '登录结果',
          message: h('i', {style: 'color: teal'}, response.data.message)
        });
      } catch (error) {
        if (error.response) {
          const h = this.$createElement;
          this.$notify({
            title: '登录结果',
            message: h('i', {style: 'color: teal'}, error.response.data.message)
          });
        } else if (error.request) {
          const h = this.$createElement;
          this.$notify({
            title: '登录结果',
            message: h('i', {style: 'color: teal'}, '服务未响应')
          });
        } else {
          const h = this.$createElement;
          this.$notify({
            title: '登录结果',
            message: h('i', {style: 'color: teal'}, error.message)
          });
        }
      }
    },
    async register() {
      try {
        const response = await axios.post('http://49.234.27.225:8000/userapp/register/', {
          username: this.account,
          password: this.password,
        });
        const h = this.$createElement;
        this.$notify({
          title: '注册结果',
          message: h('i', {style: 'color: teal'}, response.data.message)
        });
      } catch (error) {
        if (error.response) {
          const h = this.$createElement;
          this.$notify({
            title: '注册结果',
            message: h('i', {style: 'color: teal'}, error.response.data.message)
          });
        } else if (error.request) {
          const h = this.$createElement;
          this.$notify({
            title: '注册结果',
            message: h('i', {style: 'color: teal'}, '服务未响应')
          });
        } else {
          const h = this.$createElement;
          this.$notify({
            title: '注册结果',
            message: h('i', {style: 'color: teal'}, error.message)
          });
        }
      }
    },
  },
};
</script>

