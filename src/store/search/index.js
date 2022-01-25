import { reSearchList } from "../../api"
export default {
    namespaced: true,
    actions: {
        async searchList(context, params = {}) {
            //query参数是当action被派发是传过来的，其至少得是一个空对象，上面就是默认参数空对象写法
            let result = await reSearchList(params)
            if (result.code == 200) {
                context.commit('SEARCHLIST', result.data)
            }
        }
    },
    mutations: {
        SEARCHLIST(state, value) {
            state.searchList = value
        }
    },
    state: { searchList: {} ,
 },
    getters: {
        goodsList(state) {//后面加或符号是为了没网的时候返回空数组，不能让它没有数据，否则会报错
            return state.searchList.goodsList||[]
        },
        trademarkList(state) {
            return state.searchList.trademarkList||[]
        },
        attrsList(state) {
            return state.searchList.attrsList||[]
        },
    }
}
