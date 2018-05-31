const path = require('path')
const { version } = require('./package.json')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, '')
]

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  theme: "./theme.config.js",
  publicPath: `/${version}/`,
  outputPath: `./dist/${version}`,
  // 接口代理示例
  proxy: {
    // "/api/v1/weather": {
    //   "target": "https://api.seniverse.com/",
    //   "changeOrigin": true,
    //   "pathRewrite": { "^/api/v1/weather": "/v3/weather" }
    // },
    
    // "/api/v2": {
    //   "target": "http://ppg.luodan.xin/",
    //   "changeOrigin": true,
    //   "pathRewrite": { "^/api/v2" : "" }
    // },
    "/api/v2": {
      "target": "",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v2" : "" }
    },
    "/api/v3": {
      "target": "",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v3" : "" }
    },
    "/api/v4": {
      "target": "",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v4" : "" }
    }

  },
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    },
    production: {
      extraBabelPlugins: [
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    }
  },
  dllPlugin: {
    exclude: ["babel-runtime", "roadhog", "cross-env"],
    include: ["dva/router", "dva/saga", "dva/fetch"]
  }
}
