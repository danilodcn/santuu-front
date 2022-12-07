const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  publicPath: "/static/vue/",
  outputDir: path.resolve(__dirname, "../static/vue/"),
  filenameHashing: false,
  runtimeCompiler: true,
  parallel: true,
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
});
