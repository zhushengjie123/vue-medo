//对axios进行二次封装,主要是为了使用其请求和响应拦截器
import axios from "axios"
// 引入进度条
// 其中start方法代表进度条开始；done代表进度条结束
import nprogress from "nprogress";
//引入进度条的样式
import 'nprogress/nprogress.css'
// 利用axios对象方法create创造axios实例
const requests = axios.create({
    baseURL: "/mock",//基础路径，发送请求时路径里会出现api
    timeout: 5000,//请求超时时间
})
// 请求拦截器：在发送请求之前请求拦截器可以检测到，可以在请求发送之前做一些事情
requests.interceptors.request.use((config) => {
    // config为配置对象，其中有一个属性headers非常重要
    //进度条开始动
    nprogress.start()
    return config;
})                                                                                                                                                                                                                                                                                                                                                                  
// 响应拦截器：可以在数据返回后做一些事情
requests.interceptors.response.use(
    (res) => { 
        //进度条结束
        nprogress.done();
        return res.data },
    (error) => {
        console.log(error.message);
        // 返回回调函数，终止promise
        return Promise.reject(new Error("false"))
    })

export default requests;