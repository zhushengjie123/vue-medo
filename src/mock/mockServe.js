
import Mock from 'mockjs'
//json和图片数据是默认对外暴露的所以可以直接引入
import banner from './banner.json'
import floor from './floor.json'
// mock方法,第一个参数是需要拦截的URL，第二个参数表示拦截的Ajax请求类型这里默认,第三个表示拦截的数据模板
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})
//最后将该文件在main.js文件中引入执行一次