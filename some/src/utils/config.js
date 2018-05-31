const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
const APIV3 = '/api/v3'
const APIV4 = '/api/v4'

module.exports = {
  name: '泡泡阁',
  prefix: '泡泡阁',
  footerText: '',
  logo: '/logo.svg',
  // logo: '/svg/cute/cry.svg',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  APIV3,
  APIV4,
  api: {
    ap1All2:`${APIV4}`,
    ap1All3:`${APIV2}`,
    imgSrc : `${APIV3}`,   //回显url
    userLogin: `${APIV2}/admin/login`,
    //商品
    getCa: `${APIV2}/getCaptcha`,
    users: `${APIV2}/shop/getshoptypelist`,
    addshoptype: `${APIV2}/shop/addshoptype`,
    updateshoptype: `${APIV2}/shop/updateshoptype`,
    deleteshoptype: `${APIV2}/shop/deleteshoptype`,
    uploadfile: `${APIV2}/uploadfile`,
    getLabel: `${APIV4}/shop/getshoptaglistall`,
    getSquatList: `${APIV2}/admin/getSquatList`,
    getSquatInfo: `${APIV2}/admin/getSquatInfo`,
    examineSquat: `${APIV2}/admin/examineSquat`,

    searchshoplistbystatus: `${APIV2}/shop/searchshoplistbystatus`,

    //订单  
    getRefundList: `${APIV2}/admin/getRefundList`,
    getRefundOrder: `${APIV2}/admin/getRefundOrder`,
    getOrder: `${APIV2}/admin/getOrder`,
    getOrderInfo: `${APIV2}/admin/getOrderInfo`,
    yijiaOrder: `${APIV2}/admin/yijiaOrder`,
    
    //会员
    getUserAuthenticationList: `${APIV2}/admin/getUserAuthenticationList`,
    getUserInfo: `${APIV2}/admin/getUserInfo`,
    edtUserAuthentication: `${APIV2}/admin/edtUserAuthentication`,
    getUserSignLog: `${APIV2}/admin/getUserSignLog`,

    getUserList: `${APIV2}/admin/getUserList`,   //会员列表
    getUserIntegralLog: `${APIV2}/admin/getUserIntegralLog`,   //积分
    getCapitalLog: `${APIV2}/admin/getCapitalLog`,   //资金
    adjustAccount: `${APIV2}/admin/adjustAccount`,   //调整会员账户
    getUserLvAll: `${APIV2}/getUserLvAll`,   //等级列表
    updataUserLv: `${APIV2}/admin/updataUserLv`,   //等级列表



    userLogout: `${APIV2}/logout`,  //退出

    //积分规则
    setSignData: `${APIV2}/admin/setSignData`, 
    getSignData: `${APIV2}/admin/getSignData`, 

    // 资金
    getCapitalLog: `${APIV2}/admin/getCapitalLog`, 
    getCapitalLogInfo: `${APIV2}/admin/getCapitalLogInfo`, 
    cheakApplyWithdraw: `${APIV2}/admin/cheakApplyWithdraw`, 
    remittanceMoney: `${APIV2}/admin/remittanceMoney`, 
    getPayType: `${APIV2}/admin/getPayType`, 
    updatePayTypeInfo: `${APIV2}/admin/updatePayTypeInfo`, 
    getPayTypeInfo: `${APIV2}/admin/getPayTypeInfo`, 
    //设置
    getCustomerInfo: `${APIV2}/admin/getCustomerInfo`,
    updateCustomerInfo: `${APIV2}/admin/updateCustomerInfo`,
    getwebInstall: `${APIV2}/getwebInstall`,
    setwebInstall: `${APIV2}/admin/setwebInstall`,


    userInfo: `${APIV1}/userInfo`,
    
    posts: `${APIV1}/posts`,
    user: `${APIV2}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
