//vuex中的store文件
// 引入vuex文件
import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import {nanoid} from 'nanoid'
import home from "./home"
import search from "./search"//引入多文件模块化仓库
import detail from "./detail"
import shopcard from "./shopcard"
import loginAndregister from "./loginAndregister"
import trade from "./trade"
Vue.use(Vuex)//使用vuex插件，可以传入store属性了
const countOption = {//该为单文件模块化仓库
    namespaced: true,//允许模块化命名，必须写
    // actions用于响应组件中的动作
    actions: {//提交给mutations中的ADD函数一个value 
        add(context, value) { context.commit('ADD', value) },
        cut(context, value) { context.commit('CUT', value) },
        addodd(context, value) { context.commit('ADDODD', value) },
        waitadd(context, value) { setTimeout(() => { context.commit('WAITADD', value) }, 1000) }
    },
    // mutations用于操作数据（state）
    mutations: {
        ADD(state, value) { state.sum += value },
        CUT(state, value) { state.sum -= value },
        ADDODD(state, value) { state.sum = state.sum % 2 ? state.sum + value : state.sum },
        WAITADD(state, value) { state.sum += value },
    },
    // state用于存储数据
    state: { sum: 0, count: '计算' },

    getters: {
        bigSum(state) {
            return state.sum * 10
        }
    }
}
const personOption = {
    namespaced: true,
    actions: {
        poem(context) {
            axios.get('http://api.uixsj.cn/hitokoto/get?type=social').then(
                response => { context.commit('POEM', response.data) 
                context.commit('ADDPERSON',{id:nanoid(),name:response.data})},
                error => { console.log("数据获取失败", error.message) }
            )
            // 'https://api.ghser.com/qinghua/'
            // 'http://localhost:8080/api2'
            //http://api.uixsj.cn/hitokoto/get?type=social
        }
    },
    // mutations用于操作数据（state）
    mutations: {
        ADDPERSON(state, value) {
            state.personList.unshift(value)
        },
        POEM(state, value) {
            state.poem = value
        }
    },
    // state用于存储数据
    state: { personList: [{ id: '001', name: '张三' }], poem: "我不允许你们说自己胖 你们那不叫胖 那叫可爱到膨胀" },

    getters: {

    }
}

// 创建store实例对象并暴露它
export default new Vuex.Store({
    modules: {//暴露的多个模块化仓库
        count: countOption,
        person: personOption,
        home:home,
        search:search,
        detail:detail,
        shopcard:shopcard,
        loginAndregister,
        trade
    }
})

