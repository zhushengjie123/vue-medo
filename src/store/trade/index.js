import { reGetAddress, reGetTrade } from "../../api"
export default {
    namespaced: true,
    actions: {
        async getaddress(context) {
            let result = await reGetAddress()
            if (result.code == 200) {
                context.commit("GETADDRESS", result.data)
            }
        },
        async gettrade(context) {
            let result = await reGetTrade()
            if (result.code == 200) {
                context.commit("GETTRADE", result.data)
            }
        }
    },
    mutations: {
        GETADDRESS(state, value) {
            state.address = value
        },
        GETTRADE(state,value){
state.tradeInfo=value
        }
    },
    state: {
        address: [],tradeInfo:{}
    },
    getters: {

    }
}