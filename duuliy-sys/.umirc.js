import {resolve} from "path";


// ref: https://umijs.org/config/
export default {
  history: 'hash',
  targets: {
    ie: 11,
  },
  publicPath: "./",
  disableCSSModules: true,
  alias: {
    '@': resolve(__dirname, './src'),
    '@v': resolve(__dirname, './public'),
    '@u': resolve(__dirname, './src/utils')
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      // dynamicImport: {
      //   loadingComponent: './components/PageLoading/PageLoading',
      // },
      dynamicImport:true,
      title: 'umi-sys',
      dll: false,
      routes: [{
          include: [/.*/],
          exlude: [/(\/(en|zh))*\/login/]
        },
        {
          include: [/.*/],
          exlude: [/(\/(en|zh))*\/register/]
        }
      ],
      hardSource: false,
      locale: {
        enable: true, // default false
        default: 'zh-CN', // default zh-CN
        baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
      },
      
    }]
  ],
  proxy: {
    "/api": {
      target: "http://localhost:38080",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api"
      }
    }
  },
}
