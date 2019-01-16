import imgsrc from '@v/images/icon.png'
// import imgbg from '@v/images/img_bg.png'

module.exports = {
    siteName: '云译通后台系统',
    copyright: '@2017-2018四川译讯信息科技有限公司',
    logoPath: imgsrc,
//     imgbg:imgbg,
    apiPrefix: '/api/v1',
    fixedHeader: true, // sticky primary layout header
  
    /* Layout configuration, specify which layout to use for route. */
    layouts: [
      {
        name: 'login',
        include: [/.*/],
        exlude: [/(\/(en|zh))*\/login/],
      },
      {
        name: 'register',
        include: [/.*/],
        exlude: [/(\/(en|zh))*\/register/],
      }
    ],
  
    /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
    i18n: {
      /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
      languages: [
        {
          key: 'en',
          title: 'English',
          flag: '/america.svg',
        },
        {
          key: 'zh',
          title: '中文',
          flag: '/china.svg',
        },
      ],
      defaultLanguage: 'en',
    },
  }
  
