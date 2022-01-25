// 如果项目很小完全可以在生命周期函数中发送请求，axios.get("xxx")
// api统一管理文件
import requests from "./request"
import mockRequests from "./mockAjax"
// import detail from "../store/detail"
// 三级联动接口
// /api/product/getBaseCategoryList，为get请求且无接口
export const reCatagoryList = () => {
  // 发送请求
  return requests({ url: "/api/product/getBaseCategoryList", method: 'get' })
}

//获取轮播图的请求接口
export const reBannerList = () => {
  // 发送请求
  return mockRequests({ url: "/banner" })
}

//获取floor组件及其中的轮播图接口
export const reFloor = () => {
  return mockRequests({ url: "/floor" })
}

//获取搜索模块的数据,既然要传参数那就必须传哪怕默认一个空对象，否则服务器会请求失败
export const reSearchList = (params) => {
  return requests({ url: "/api/list", method: 'post', data: params })
}

// 获取产品详情消息接口
export const reGoodsInfo = (skuId) => {
  return requests({ url: `/api/item/${skuId}`, method: 'get' })
}

// 获取购物车添加接口，只是前台将参数发给服务器，服务器不用返回数据
export const reAddToCard = (skuId, skuNum) => {
  return requests({ url: `/api/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}

//获取购物车接口
export const reShopCard = () => {//添加请求头headers:{userTempId:detail.state.getNanoId}
  return requests({ url: `/api/cart/cartList`, method: 'get' })
}

// 删除购物车接口
export const reDeleteCard = (skuId) => {
  return requests({ url: `/api/cart/deleteCart/${skuId}`, method: 'delete' })
}

// 修改购物车商品选中状态接口
export const reChangeCardIsChecked = (skuId, isChecked) => {
  return requests({ url: `/api/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
}

// 获取验证码请求
export const reSendCode = (phone) => {
  return requests({
    url: `/api/user/passport/sendCode/${phone}`, method: 'get'
  })
}

//用户注册,有三个参数，整合到一起去，(post请求可以带请求体)
export const reRegister = (data) => {
  return requests({
    url: `/api/user/passport/register`, data: data, method: 'post'
  })
}

//用户登录
export const reLogin = (data) => {
  return requests({
    url: `/api/user/passport/login`, data: data, method: 'post'
  })
}

// 获取用户信息，需要带token令牌
export const reGetUserInfo = () => {
  return requests({
    url: `/api/user/passport/auth/getUserInfo`, method: 'get'
  })
}

// 退出登录，清除用户信息
export const reLogout = () => {
  return requests({
    url: `/api/user/passport/logout`, method: 'get'
  })
}

//获取用户收货地址
export const reGetAddress = () => {
  return requests({
    url: `/api/user/userAddress/auth/findUserAddressList`, method: 'get'
  })
}

//获取商品清单接口
export const reGetTrade = () => {
  return requests({
    url: `/api/order/auth/trade`, method: 'get'
  })
}

//从这里开始练习不再从vuex中处理请求而是直接在组件中处理数据
//所以该文件作为整体打包在main.js中统一引入，以类似全局事件总线的方式在原型上添加所有api接口函数
//提交订单
export const reSubmitOrder = (tradeNo, data) => {
  return requests({
    url: `/api/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post'
  })
}


// 获取订单支付信息
export const rePayment = (orderId) => {
  return requests({
    url: `/api/payment/weixin/createNative/${orderId}`, method: 'get'
  })
}

// 获取支付订单状态
export const rePayState = (orderId) => {
  return requests({
    url: `/api/payment/weixin/queryPayStatus/${orderId}`, method: 'get'
  })
}
// 获取我的订单信息
export const reMyOrder= (page,limit) => {
  return requests({
    url: `/api/order/auth/${page}/${limit}`, method: 'get'
  })
}