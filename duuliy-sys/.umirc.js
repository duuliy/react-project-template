import {resolve} from "path";

// ref: https://umijs.org/config/
export default {
  history: 'hash',
  targets: {
    ie: 11,
  },
  // publicPath: "./public",
  disableCSSModules: true,
  alias: {
    '@': resolve(__dirname, './src'),
    '@v': resolve(__dirname, './public')
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: {
        loadingComponent: './components/PageLoading/PageLoading',
      },
      title: 'umi-sys',
      dll: false,
      routes: {
        include: [/.*/],
        exlude: [/(\/(en|zh))*\/login/]
      },
      hardSource: false,
      proxy: {
        "/api": {
          target: "http://jsonplaceholder.typicode.com/",
          changeOrigin: true,
          pathRewrite: {
            "^/api": "/api"
          }
        }
      },
    }],
  ]
}
