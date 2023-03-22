import axios from "axios"
// 引入进度条
import nProgress from "nprogress"
import 'nprogress/nprogress.css'
// 创建axios实例 
const request = new axios.create({
    // 设置初始请求地址
    baseURL: 'http://localhost:3000',
    // 设置请求超时时间
    timeout: 5000
})


// 配置请求拦截器
request.interceptors.request.use(
    (config) => {
        nProgress.start() // 展示进度条
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

// 配置响应拦截器
request.interceptors.response.use(
    (config) => {
        nProgress.done() // 隐藏进度条
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)


export default request