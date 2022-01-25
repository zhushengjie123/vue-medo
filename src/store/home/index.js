import { reCatagoryList, reBannerList,reFloor } from "../../api"

export default {
    namespaced: true,
    actions: {//async为异步执行，其返回结果是一个promise，
        async catagoryList(context) {
            //await必须在async中使用，它会等这个promise完成，并将其resolve的结果返回出来
            //  其代替了.then方法，相当于输出了response，在promise链的处理上更灵活
            let result = await reCatagoryList()
            if (result.code == 200) {
                context.commit('CATAGORYLIST', result.data)
            }
        },
        //     catagoryList(context) {
        //         reCatagoryList().then(response => { context.commit('CATAGORYLIST', response.data) })
        //     }
        async bannerList(context) {
            let result = await reBannerList()
            if(result.code==200){
                context.commit('BANNERLIST', result.data)
            }
        },
        async floorList(context) {
            let result = await reFloor()
            if(result.code==200){
                context.commit('FLOORLIST', result.data)
            }
        },
    },
    mutations: {
        CATAGORYLIST(state, value) {
            state.categoryList = value
        },
        BANNERLIST(state, value){
            state.bannerList = value
        },
       FLOORLIST(state, value){
            state.floorList = value
        },

    },
    state: { categoryList: [],bannerList:[],floorList:[] },
    getters: {}

}
