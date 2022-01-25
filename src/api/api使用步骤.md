## 对Ajax进行函数封装
简化api开头，使用拦截器加载进度条等 
## 创建api总管理文件
1.引入封装函数  

2.创建函数用于暴露接口数据，其返回值为传入请求地址URL（非服务器地址）的封装函数
## vuex仓库进行数据管理
1.引入api文件内的接口函数  

2.action方法内，用（async+await方法或.then方法）获取接口函数的
promise返回结果，将返回结果的data作为值传递到mutations方法中  

3.mutations方法内，将获得的参数赋值给state数据  

4.state方法内，存放需要用到的数据的默认初始值  

5.getters方法内，可能会用到的对state中数据的计算
## 组件中运用
1.引入state数据：
```
import {mapState} from 'vuex'
```
2.mounted挂载时，对仓库进行推送  

第一个参数必选，为仓库下的某action方法名的路径默认以store为根目录  
第二个参数可选，传递想要传给仓库的数据
```
mounted(){
this.$store.dispatch('home/floorList')
}
```

3.获取state数据  

第一个参数为（分）仓库名  
第二个参数可为对象，获取想要的数据以键值对命名，键名自定义，值为仓库state方法中所存取的数据
```
computed:{
...mapState('home',{floorList:'floorList'})
}
```
