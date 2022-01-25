module.exports = {
  pages: {
    index: {//入口
      entry: 'src/main.js',
    },
  },
  productionSourceMap:false,//打包时去掉map文件
  lintOnSave: false,//关闭语法检查
  // devServer: {//开启代理服务器(方式一)
  //     proxy: "http://localhost:5000"//表示代理服务器端口为5000端口，可以与已有的该端口进行交互了
  // },
  devServer: {
    proxy: {
      '/api1': {//前面加了这个符号表示走代理不走本地
        target: 'http://39.98.123.211',
        //要发请求时我们写的地址前面必须加上/api1这个标识来让其只走代理，
        // 虽然地址里写的有/api1但是当正式发送请求时不能有这串代码，所以用正则来过滤掉它，
        // 这样发送的一瞬间我们地址里的/api1就被过滤掉了
        pathRewrite: { '^/api1': '' },//注意：这只是在代理时帮我们过滤掉了/api1，但我们写请求地址时还是要加上的
        ws: true,//表示支持websocked
        changeOrigin: true//允许跨域,将自己的地址隐藏为了5000,实际用于控制请求头中的host值
      },

      '/api2': {//前面加了这个符号表示走代理不走本地
        target: 'https://api.ghser.com/qinghua',
        pathRewrite: { '^/api2': '' },//因为前面加了/api这个标识来让其只走代理，但是发送请求时不能有这串代码，所以用正则来过滤掉它
        ws: true,//表示支持websocked
        changeOrigin: true//允许跨域,实际用于控制请求头中的host值
      },
    }
  }
}