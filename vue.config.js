module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    './' : '/', // 相对于 HTML 页面（目录相同）
}