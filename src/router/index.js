import VueRouter from "vue-router";
import Home from "../views/home"
import Login from "../views/login"
import Register from "../views/register"
import Search from "../views/search"
import Detail from "../views/detail"
import AddCardSuccess from "../views/addcartsuccess"
import ShopCard from "../views/shopcard"
import store from "../store";
import Trade from "../views/trade"
import Pay from "../views/pay"
import Paysuccess from "../views/paysuccess"
import Center from "../views/center"
import MyOrder from "../views/center/myorder"
import GroupOrder from "../views/center/grouporder"
// 重写原型上的push方法，防止重复点击路由会报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
//路由地址默认为hash模式，hash模式在地址后面带#方便带参，如果是history模式没有#号但是服务器需要单独配置否则任意404
// 创建并暴露一个路由器
const router = new VueRouter({
    // mode: 'history',//切换为history模式
    scrollBehavior() {
        // 滚动条行为，路由跳转后视图出现默认的位置
        return { y: 0 }
    },
    routes: [
        {// 路由重定向，项目跑起来的时候访问/就转到首页组件
            path: "*",
            redirect: "/home"
        },
        {//一路径对应一组件
            // 路由取名
            name: "home",
            path: '/home',
            component: Home,
            //自定义元件属性，这里用来判断是否展示footer组件，
            //如果处于该路由模块且有show：true这个属性就展示footer组件
            meta: { show: true }
        }, {//一路径对应一组件
            // 路由取名
            name: "login",
            path: '/login',
            component: Login,

        }, {//一路径对应一组件
            // 路由取名
            name: "register",
            path: '/register',
            component: Register,

        }, {//一路径对应一组件
            // 路由取名
            name: "search",
            path: '/search/:keyWord',
            component: Search,
            meta: { show: true }
        },
        {
            name: "detail",
            path: '/detail/:skuid',
            component: Detail,
        },
        {
            name: "addcardsuccess",
            path: '/addcardsuccess',
            component: AddCardSuccess,
        },
        {
            name: "shopcard",
            path: '/shopcard',
            component: ShopCard,
        },
        {
            name: "trade",
            path: '/trade',
            component: Trade,
            meta: { show: true },
            beforeEnter: (to, from, next) => {//独享路由组件
                // 让其只能从上一个路由跳过来
                console.log(to, from)
                if (from.name == 'shopcard') { next() } else { next(false) }
            }
        },
        {
            name: "pay",
            path: '/pay',
            component: Pay,
            meta: { show: true },
        },
        {
            name: "paysuccess",
            path: '/paysuccess',
            component: Paysuccess,
            meta: { show: true }
        },
        {
            name: "center",
            path: '/center',
            component: Center,
            meta: { show: true },
            children: [
                {
                    name: "myorder",
                    path: 'myorder',
                    component: MyOrder,
                }, {
                    name: "grouporder",
                    path: 'grouporder',
                    component: GroupOrder,
                },
                {//重定向，如果在center路由，默认展示二级路由myorder
                    path: '/center',
                    redirect: "/center/myorder",
                }
            ]
        }
    ]
})
//全局前置路由守卫，在初始化和路由切换之前调用该函数
router.beforeEach((to, from, next) => {//next是一个函数调用它表示允许跳转
    // console.log(to, from)//前往哪个路由，从哪个路由
    let userInfo = store.state.loginAndregister.userInfo
    let toName = to.name
    // 用户登录了不能再前往登录模块
    if (to.name == 'login') { userInfo.name ? next('/home') : next() }
    //如果去的是其他路由那么就重新派发请求获取用户信息，成功后放行（不包括home和search以及register）
    else {
        if (to.name == 'search' || to.name == 'home' || to.name == 'register'|| to.name == 'detail') { next() }
        // 如果已经登录那么请求就一定会成功，所有组件都可以进入
        else {
            store.dispatch("loginAndregister/getUserInfo")
                .then(() => next())
                .catch(() => next(`/login?redirect=${toName}`))
        }//传query参数用于登录后直接跳转到这个路由
    }
    // router.options.routes.find(item => item.name == 'login')
})
// //全局后置路由守卫 
// router.afterEach((to, from) => {//由于是切换后调用该函数，所以相比前置路由它没有next函数
//     console.log(to, from)
// })
export default router