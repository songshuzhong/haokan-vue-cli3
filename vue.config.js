const path = require('path')
const glob = require('glob')
const fs = require('fs')
const manifestPlugin = require('webpack-manifest-plugin')
const SupportWebPWebpackPlugin = require('support-webp-webpack-plugin')

const dev = process.env.NODE_ENV !== 'production'
const publicPath = ''
const pages = {}
const rewrites = []

glob.sync('./src/pages/*.js').forEach(entry => {
  const filename = entry.replace(/(.*\/)*([^.]+).*/gi, '$2')
  rewrites.push({
    from: new RegExp('^/' + filename),
    to: `/pages/${filename}.html`,
  })
  let pageConfig
  try {
    let fileContent = fs.readFileSync(
      `./src/modules/${filename}/index.json`,
      'utf-8'
    )
    pageConfig = JSON.parse(fileContent)
  } catch (e) {
    pageConfig = {}
  }
  pages[filename] = {
    entry,
    template: path.join(__dirname, '/src/template.html'),
    filename: `${filename}.html`,
    title: pageConfig.title || '',
    metas: pageConfig.metas || {},
    styles: pageConfig.styles || [],
    scripts: pageConfig.scripts || [],
    skeleton: pageConfig.skeleton || '',
    skeletonStyle: pageConfig.skeletonStyle || '',
    initData: JSON.stringify(pageConfig.initData || {}),
    favicon: pageConfig.icon || '',
    debug: dev
      ? `
       <script src="//cdn.bootcss.com/eruda/1.1.3/eruda.min.js"></script>
       <script>eruda.init();window.isDebug=true;</script>                `
      : '',
    minify: dev
      ? {}
      : {
          minifyJS: true,
          minifyCSS: true,
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        },
  }
})

module.exports = {
  pages,
  publicPath: dev ? '' : publicPath,
  productionSourceMap: true,
  configureWebpack: {
    output: {
      filename: 'js/[name].[hash:6].js',
      chunkFilename: 'js/chunks/[name].[hash:6].js',
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
    },
    plugins: [
      new SupportWebPWebpackPlugin({
        useCheckScript: false,
      }),
    ],
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: './src/assets/styles/index.scss',
        })
        .end()
    })

    config.plugin('manifest').use(manifestPlugin, [
      {
        fileName: 'mf.json',
        publicPath: config.baseUrl,
      },
    ])
    config.resolve.alias
      .set('~utils', path.join(__dirname, 'src/utils'))
      .set('~assets', path.join(__dirname, 'src/assets'))
      .set('~modules', path.join(__dirname, 'src/modules'))
      .set('~components', path.join(__dirname, 'src/components'))
  },
  devServer: {
    hot: true,
    port: 8980,
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: rewrites,
    },
    proxy: {
      '/members': {
        target: 'http://mock.biz.weibo.com/api/app/mock/23/',
        changeOrigin: true,
      },
    },
  },
}
