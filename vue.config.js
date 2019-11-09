module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/", // 相对于 HTML 页面（目录相同）
  devServer: {
    proxy: {
      "/api": {
        target: "http://test.zgylt.com", //目标接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api": "/api" //重写接口
        }
      }
    },
    host: "abc.zgylt.com"
  }
};
