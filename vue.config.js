const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports={
  devServer:{
    port:10001,
    proxy:{
      'api':{
        target:"http://localhost:8080/SSM",
        changeOrigin:true,
        pathRewrite:{
          '/api':''
        }
      }
    }
  }
}