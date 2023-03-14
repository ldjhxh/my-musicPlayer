import axios from "axios"

// 创建axios实例 
const request = new axios.create({
    // 设置初始请求地址
    baseURL: 'http://localhost:3000',
    // 设置请求超时时间
    timeout: 5000
})

export default request