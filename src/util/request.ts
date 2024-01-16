import router from '@/router';
import axios from 'axios'
import { ElMessage } from 'element-plus';
//login-request
// const baseURL = 'http://43.142.32.223:3060'
const baseURL = 'http://localhost:8080'

const request = axios.create({
    baseURL,
    timeout: 5000,
})

// 给实例添加请求拦截器
request.interceptors.request.use(config => {
    config.headers.token = localStorage.getItem('token') || ' ';
    return config;
}, (err) => {
    return Promise.reject(err)
})

// 给实例添加请求响应拦截器
request.interceptors.response.use((res) => {
    // 响应内容中有token就自动存储到本地存储（localStorage）
    if (res.data?.data?.token) {
        localStorage.setItem('token', res.data.data.token)
    }
    // 响应内容中有message提示信息401,403
    if (res.data?.msg) {
        const type = res.data.code == 401 && 403? 'error' : 'success';
        // element-plus的消息提示ElMessage
        ElMessage({
                message: res.data.msg,
                type,
        })
        // 401返回token错误/过期，清除用户数据并且返回logon
        if(res.data.code == 401) {
            localStorage.removeItem("userId")
            localStorage.removeItem("token")
            localStorage.removeItem("status")
            router.push("/login")
        }
    }
    // 把后端数据提前出来给then
    return res.data
}, (err) => {
    console.log(err);
    return Promise.reject(err)
})

// 后期使用这个实例发送请求，就会有上面的默认配置
export default request;