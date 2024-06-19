const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/auth": {
        target: process.env.SERVER_URL ?? "http://localhost:3000",
      },
      "/lists": {
        target: process.env.SERVER_URL ?? "http://localhost:3000",
      }
    }
  }
});
