module.exports = {
    devServer: {
        port : 80,
        disableHostCheck: true
    },
    chainWebpack(config) {
        config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )


    }
}