module.exports = {
  devServer: {
    progress: true
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
