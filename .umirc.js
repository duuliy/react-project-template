import { defineConfig } from 'umi'
import { resolve as reso } from 'path'

export default defineConfig({
  title: 'duuliy Page',
  history: {
    type: 'hash',
  },
  publicPath: './',
  hash: true,
  // devServer: {
  //   https: true
  // },
  antd: {
    // dark: true,
  },
  dva: {
    immer: true,
  },
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  targets: {
    chrome: 58,
    ie: 9,
  },
  dynamicImport: {},
  // manifest:{},
  // layout: {},
  // esbuild: {}, //加载慢了考虑使用
  links: [
    {
      rel: 'stylesheet',
      href: 'http://localhost:9000/bigemap.js/v2.1.0/bigemap.css',
    },
  ],
  scripts: [
    'https://webapi.amap.com/maps?v=2.0&key=4a5b71a582d1245762d01a6cec855f61',
    'https://webapi.amap.com/ui/1.1/main.js?v=1.1.1',
    'http://localhost:9000/bigemap.js/v2.1.0/bigemap.js',
    // 'http://localhost:9000/Public/offline/huge/glify.js',
    // 'https://cdnjs.cloudflare.com/ajax/libs/cytoscape/2.3.15/cytoscape.js'
  ],
  metas: [
    {
      name: 'title',
      content: 'duuliy',
    },
    {
      name: 'keywords',
      content: 'duuliy',
    },
    {
      name: 'description',
      content: 'duuliy',
    },
  ],
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: false,
    baseSeparator: '-',
  },
  // routes: [{
  //     path: '/',
  //     component: '@/pages/index'
  //   },
  //   {
  //     path: '/onLineMap',
  //     component: '@/pages/onLineMap',
  //     access: 'onLineMap', // 权限定义返回值的某个 key
  //   }
  // ],

  // plugins: [  离线插件引用
  //   // `${__dirname}/plugin/mapPlugin.js`,
  //   './plugin/mapPlugin.js'
  //   // [require.resolve('./plugin/mapPlugin.js')]
  // ]
  alias: {
    '@': reso(__dirname, './src'),
    '@a': reso(__dirname, './src/assets'),
    '@p': reso(__dirname, './public'),
    '@c': reso(__dirname, './src/components'),
    '@u': reso(__dirname, './src/utils'),
    '@s': reso(__dirname, './src/services'),
    '@stores': reso(__dirname, './src/stores'),
  },
  //修改webpack配置
  // chainWebpack(memo, { env, webpack, createCSSRule }) {
  //   // 设置 alias
  //   memo.resolve.alias.set('foo', '/tmp/a/b/foo');
  //   // 删除 umi 内置插件
  //   memo.plugins.delete('copy');
  // },
  proxy: {
    '/api': {
      target: 'http://10.240.50.105:8110',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api',
      },
    },
  },
})
