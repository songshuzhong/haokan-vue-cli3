const path = require('path');
const glob = require('glob');
const fs = require('fs');
const manifestPlugin = require('webpack-manifest-plugin');

const publicPath = 'https://mjs.sinaimg.cn/weiboad/apps/fentiao/mobile/coupon/';
const dev = process.env.NODE_ENV !== 'production';
const pages = {};
const rewrites = [];

glob.sync('./src/pages/*.ts').forEach(entry => {
  const filename = entry.replace(/(.*\/)*([^.]+).*/ig,'$2');
  rewrites.push({from: new RegExp('^/' + filename), to: `/pages/${filename}.html`});
  let pageConfig;
  try {
    let fileContent = fs.readFileSync(`./src/modules/${filename}/index.json`, 'utf-8');
    pageConfig = JSON.parse(fileContent);
  } catch (e) {
    pageConfig = {};
  }

  pages[filename] = {
    entry,
    template: path.join(__dirname, '/src/template.html'),
    filename:  `pages/${filename}.html`,
    chunks: ['common', 'vue', filename, ...pageConfig.chunks],
    title: pageConfig.title || '',
    metas: pageConfig.metas || {},
    styles: pageConfig.styles || [],
    scripts: pageConfig.scripts || [],
    skeleton: pageConfig.skeleton || '',
    skeletonStyle: pageConfig.skeletonStyle || '',
    initData: JSON.stringify(pageConfig.initData || {}),
    icons: pageConfig.icons || [],
    debug: dev ? `
       <script src="//cdn.bootcss.com/eruda/1.1.3/eruda.min.js"></script>
       <script>eruda.init();window.isDebug=true;</script>                `
        : '',
    minify: dev ? {} : {
      minifyJS: true,
      minifyCSS: true,
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  };
});

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
      extensions: ['.ts', '.js', '.vue', '.json']
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vue: {
            name: 'vue',
            test: /[\\/]node_modules[\\/]vue|vue-router[\\/]/,
            chunks: 'all',
            priority: -5,
            enforce: true
          },
          common: {
            name: 'common',
            test: /[\\/]node_modules[\\/]@babel|url|scheduler|debug|process|core-js|regenerator-runtime|axios[\\/]/,
            chunks: 'all',
            priority: 10,
            enforce: true
          },
          echarts: {
            name: 'echarts',
            test: /echarts|zrender/,
            chunks: 'all',
            priority: 20,
            enforce: true
          },
          styles: {
            name: 'styles',
            test: /\.(css|scss)$/,
            chunks: 'async',
            priority: 20,
            enforce: true
          },
          async: {
            name: 'async',
            chunks: 'async',
            minChunks: 2,
            reuseExistingChunk: true,
            priority: 7
          }
        }
      }
    }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  chainWebpack: config => {
    config
        .plugin('manifest')
        .use(manifestPlugin, [
          {
            fileName: 'mf.json',
            publicPath: config.baseUrl
          },
        ]);
  },
  devServer: {
    hot: true,
    port: 8980,
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: rewrites
    },
    proxy: {
      '/members': {
        target: 'http://mock.biz.weibo.com/api/app/mock/23/',
        changeOrigin: true
      },
    },
  }
};
