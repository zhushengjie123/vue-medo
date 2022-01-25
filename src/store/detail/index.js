import { reGoodsInfo, reAddToCard } from "../../api";
// 封装临时游客身份，生成一个随机字符串，但是只生成一次该ID就不能在变了
import { getNanoId } from "../../utils/getNanoId";
export default {
    namespaced: true,
    actions: {
        async goodsInfo(context, value) {
            let result = await reGoodsInfo(value)
            if (result.code == 200) {
                //执行下一步函数
                context.commit('GOODSINFO', result.data)
            }
        },
        // 加入购物车后发请求，前台将参数发给服务器，服务器不用返回数据
        async addToCard(context, { skuId, skuNum }) {
            let result = await reAddToCard(skuId, skuNum)
            if (result.code == 200) {
                // 将值返回给函数
                return 'ok'
            } else {
                // 返回失败的结果
                return Promise.reject(new Error('失败了'))
            }
        }
    },
    mutations: {
        GOODSINFO(state, value) {
            state.goodsInfo = value
        },

    },
    state: {
        goodsInfo: {},getNanoId:getNanoId()
    },
    getters: {
        categoryView(state) {
            return state.goodsInfo.categoryView || {}
        },
        skuInfo(state) {
            return state.goodsInfo.skuInfo || {}
        },
        spuSaleAttrList(state) {
            return state.goodsInfo.spuSaleAttrList || []
        },
    }
}