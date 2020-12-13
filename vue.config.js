module.exports = {
  devServer: {
    progress: false
  },

  // configureWebpack: {
  //   devServer: {
  //     progress: false
  //   }
  // },

  transpileDependencies: ["vuetify"],

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locale",
      enableInSFC: false
    }
  }
};
