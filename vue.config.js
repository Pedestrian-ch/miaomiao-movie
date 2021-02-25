module.exports = {
  // 配置静态资源路径，打包环境就需要配置一下
  publicPath: '/miaomiao-movices',
  devServer: {
    proxy: {
      '/ajax': {
        target: 'http://m.maoyan.com',
        changeOrigin: true
      }
    }
  }
}
