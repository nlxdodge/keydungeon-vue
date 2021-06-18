module.exports = {
    css: {
        loaderOptions: {
          sass: {
            additionalData: `@import "@/settings.scss"; @import "@/defaults.scss";`,
          },
        },
      },
}