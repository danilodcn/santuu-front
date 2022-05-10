const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/static/vue/",
  outputDir: path.resolve(__dirname, "../static/vue/"),
  filenameHashing: false,
  runtimeCompiler: true,
});
