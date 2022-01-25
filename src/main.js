// 整个项目的入口文件
import Vue from 'vue'//引入vue
import App from './App.vue'//引入APP组件，这是所有组件的父组件
import store from './store/index'//引入vuex仓库
import VueRouter from "vue-router"//引入Router插件
import router from "./router/index"//引入router配置
import TypeNav from "./components/typeNav"//引入三级联动组件，使其为全局组件
import Pagination from "./components/Pagination"
import * as API from "./api"//引入所有接口函数（统一全部导入方法）
import { Button, MessageBox} from "element-ui"
import VueLazyload from 'vue-lazyload'//图片懒加载插件
import fireflow from "./assets/fireflow.gif"
Vue.component('TypeNav', TypeNav)//注册全局组件,第一个参数是名字第二个参数是暴露的具体组件
Vue.component('Pagination', Pagination)
Vue.component(Button.name, Button)//全局注册element中的botton样式
//在原型上添加element方法
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.use(VueRouter)//使用Router插件
Vue.use(VueLazyload, {//使用懒加载插件
  // 懒加载默认图片
  loading: fireflow,
})
import './mock/mockServe'//引入mocksearch.js文件，因为该文件没有对外暴露，直接引入让它执行一遍（就和引入样式一样）
import 'swiper/css/swiper.css'// 引入swiper样式
import  "./plugins/validate"//引入表单验证插件
// 关闭vue的生产提示
Vue.config.productionTip = false
new Vue({
  el: "#app",
  // render是一个函数，其参数也是一个函数createlement的创造函数，下面是其简写形式h(App)即创造并将第三行所引的组件放入容器
  render: h => h(App),//因为上面引入的是残缺版的vue所以只能使用render而不能解析template
  // template:`<App></App>`
  // components:{App}
  store: store,
  router: router,
  beforeCreate() {//利用生命周期函数在创建vm后就立即添加
    Vue.prototype.$bus = this
    //当不用vuex时怎么处理接口和数据
    //这样所有组件都可以通过$api.xxx来调用api接口函数
    Vue.prototype.$api = API
  }
})
