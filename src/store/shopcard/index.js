import { reShopCard, reDeleteCard, reChangeCardIsChecked } from "../../api";
export default {
    namespaced: true,
    actions: {
        async shopcard(context) {//获取购物车数据
            let result = await reShopCard()
            if (result.code == 200) {
                context.commit('SHOPCARD', result.data)
            }
        },
        async deletecard(context, skuId) {//删除购物车，只是传数据告诉服务器删除对应数据，不需要返回数据
            let result = await reDeleteCard(skuId)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('失败了'))
            }
        },
        async changecardischecked(context, {skuId, isChecked}) {
            // 同样不需要返回数据，只需要让服务器修改对应数据就可以了，操作DOM时再拉去数据就可以了
            let result = await reChangeCardIsChecked(skuId, isChecked)
            if (result.code == 200) {
                return 'ok'
            }else {
                return Promise.reject(new Error('失败了'))
            }
        },
     
    },
    mutations: {
        SHOPCARD(state, value) {
            state.shopcard = value
        },
    
    },
    state: {
        shopcard: []
    },
    getters: {
        cardList(state) {
            return state.shopcard[0] || {}
        },
        //         cardInfoList() {
        // return 
        //         }
    }
}