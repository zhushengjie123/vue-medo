// 登录注册模块
import { reSendCode, reRegister, reLogin, reGetUserInfo,reLogout } from "../../api"
export default {
    namespaced: true,
    actions: {
        async sendcode(context, phone) {//发送验证码
            let result = await reSendCode(phone)
            if (result.code == 200) {
                return result.data
            }
        },
        async register(context, data) {//发送验证码
            let result = await reRegister(data)
            if (result.code == 200) {
                return 'ok'
            } else { return Promise.reject(new Error(result.message)) }
        },
        async login(context, data) {//登录验证
            let result = await reLogin(data)
            if (result.code == 200) {
                // 将令牌储存到本地,因为vuex中储存的数据不是永久的，刷新会清除
                localStorage.setItem('token', result.data.token)
                // console.log(result.data.token)
                return 'ok'
            } else { return Promise.reject(new Error(result.message)) }
        },
        async getUserInfo(context) {
            let result = await reGetUserInfo()
            if (result.code == 200) {
                context.commit('GETUSERINFO', result.data)
            } else { 
                return Promise.reject(new Error(result.message)) }
        },
        async logout(context){
            let result =await reLogout()
            if(result.code==200){
                localStorage.removeItem('token')
                context.commit('CLEARUSERINFO')
            }else{
                return Promise.reject(new Error(result.message))

            }
        }
    },
    mutations: {
        GETUSERINFO(state, value) {
            state.userInfo = value
        },
        CLEARUSERINFO(state){
state.userInfo={}
        }
    },
    state: {
        userInfo: {}
    },
    getters: {

    }
}