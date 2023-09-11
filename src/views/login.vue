<template>
    <div class="login-form">
      <h1>登录</h1>
      <form>
        <div class="form-group">
          <label >用户名</label>
          <el-input v-model="username" />
        </div>
        <div class="form-group">
          <label >密码</label>
          <el-input v-model="password" />
        </div>
        <button type="button" @click="loginHandle()">登录</button>  
        <!-- type如果不等于"button"会自动刷新 -->
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive } from "vue"
  import { login } from "@/apis/user"
  import router from '../router'

  let username = ref('')
  let password = ref('') 
  const loginData = {
    username: '',
    password: ''
  }

  const loginHandle = () => {
    login(username.value, password.value).then(res=>{
      console.log(res.data.msg)
      if(res.data.code==100) {
        if(res.data.auth=='admin') {  //管理员
          localStorage.setItem('status','admin')
          router.push('/')
        } else if(res.data.auth=='user') {  //游客
          localStorage.setItem('status','user')
          router.push('/')
        }
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  </script>
  
  <style scoped>
  .login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
  }
  
  input {
    width: 100%;
    padding: 5px;
  }
  
  button {
    width: 100%;
    padding: 10px;
  }
  
  .error {
    color: red;
  }
  </style>
  