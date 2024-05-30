const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/auth": {
        target: "http://127.0.0.1:3000",
      },
      "/lists": {
        target: "http://127.0.0.1:3000",
      }
    }
  }
});
