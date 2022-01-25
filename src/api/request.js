//对axios进行二次封装,主要是为了使用其请求和响应拦截器
import axios from "axios"
// 引入进度条
// 其中start方法代表进度条开始；done代表进度条结束
import nprogress from "nprogress";
//引入进度条的样式
import 'nprogress/nprogress.css'
// 引入仓库
import detail from "../store/detail"
// 利用axios对象方法create创造axios实例
const requests = axios.create({
    // baseURL: 基础路径，发送请求时路径里会出现并与url拼接
    //只所以要在后面添加/api1是因为我们在做代理服务器时标识了api1
    baseURL: "http://localhost:8080/api1",
    timeout: 5000,//请求超时时间
})
// 请求拦截器：在发送请求之前请求拦截器可以检测到，可以在请求发送之前做一些事情
requests.interceptors.request.use((config) => {// config为配置对象，其中有一个属性headers非常重要
    if(detail.state.getNanoId){//设置请求头，userTempId是后台设置的格式,
    //此处为为每一次请求都封装请求头，也可以在index.js中单独发送请求头
        config.headers.userTempId=detail.state.getNanoId
    }
    // 请求中带上token令牌
    if(localStorage.getItem('token')){
        config.headers.token=localStorage.getItem('token')
    }
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