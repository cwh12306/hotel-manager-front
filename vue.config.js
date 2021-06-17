module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        $assets: "@/assets",
        $components: "@/components",
        $network: "@/network",
        $common: "@/common",
        $views: "@/views",
      },
    },
  },
  /* devServer: {
    proxy: {
      "/api": {
        // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
        target: "http://localhost:8088",
        // 允许跨域
        changeOrigin: true,
        ws: true,
      },
    },
  },*/
};
