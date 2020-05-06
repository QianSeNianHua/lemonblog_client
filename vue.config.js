/* eslint-disable indent */
const path = require('path')

module.exports = {
  css: {
    sourceMap: true
  },
  transpileDependencies: ['vuex-module-decorators'],
  chainWebpack: config => {
    config.module.rules.delete('svg')

    // svgRule.uses.clear()

    config.module
      .rule('icon-svg')
      .test(/\.svg$/)
      .include
        .add(path.join(__dirname, 'src/icons/svg'))
        .end()
      .use('svg-sprite')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]',
          include: ['./src/icons']
        })
        .end()

    config.module
    .rule('cke-svg')
    .test(/\.svg$/)
    .include
      .add(path.join(__dirname, 'node_modules/@ckeditor'))
      .end()
    .use('raw')
      .loader('raw-loader')
      .end()
  },
  devServer: {
    port: 7002,
    disableHostCheck: true
  },
  productionSourceMap: false
}
