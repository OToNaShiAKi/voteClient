module.exports = {
  publicPath: "./",
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  pages: {
    index: "./src/pages/index/main.js",
    check: "./src/pages/check/main.js"
  }
}