import {resolve as reso} from "path";

// ref: https://umijs.org/config/
export default {
  history: 'hash',
  targets: {
    ie: 11,
  },
  publicPath: "./",
  disableCSSModules: true,
  alias: {
    '@': reso(__dirname, './src'),
    '@v': reso(__dirname, './public'),
    '@u': reso(__dirname, './src/utils')
  },
//   routes: [{
//     path: '/',
//     redirect: '/manage/organization',
//   },
//   {
//     path: '/',
//     component:'../layouts/index.jsx',
// 		routes:[
//       {
//         path: '/manage/organiZation',
//         component:'manage/organization/index.jsx',
//       },
//       {
//         path: '/manage/userStati',
//         component:'manage/userStati/index.jsx',
//       },
//       {
//         path: '/manage/rightsManagement',
//         component:'manage/rightsManagement/index.jsx',
//       },
//       {
//         path: '/manage/encryptedDogManagement',
//         component:'manage/encryptedDogManagement/index.jsx',
//       },
//       {
//         path: '/manage/topUpCenter',
//         component:'manage/topUpCenter/index.jsx',
//       },

//       {
//         path: '/register',
//         component:'register/index.jsx',
//       },

//       {
//         path: '/statireport/corporateTranslationStatistics',
//         component:'statireport/corporateTranslationStatistics/index.jsx',
//       },
//       {
//         path: '/statireport/reswordcount',
//         component:'statireport/reswordcount/index.jsx',
//       },
//       {
//         path: '/statireport/userTranslationDetailStatistics',
//         component:'statireport/userTranslationDetailStatistics/index.jsx',
//       },
//       {
//         path: '/statireport/userTranslationStatistics',
//         component:'statireport/userTranslationStatistics/index.jsx',
//       },

//       {
//         path: '/404',
//         component:'404',
//       },
//     ]
//   }
//   ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      // dynamicImport: {
      //   loadingComponent: './components/PageLoading/PageLoading',
      // },
      dynamicImport: true,
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
