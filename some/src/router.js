import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/dashboard',
      models: () => [import('./models/dashboard')],
      component: () => import('./routes/dashboard/'),
    },
 
    {
      path: '/sortManage',
      models: () => [import('./models/sortManage')],
      component: () => import('./routes/commodity/sortManage/'),
    },
    {
      path: '/goodManage',
      models: () => [import('./models/goodManage')],
      component: () => import('./routes/commodity/goodManage'),
    },

    {
      path: '/labelManage',
      models: () => [import('./models/labelManage')],
      component: () => import('./routes/commodity/labelManage'),
    },
    {
      path: '/property',
      models: () => [import('./models/property')],
      component: () => import('./routes/commodity/property'),
    },
    {
      path: '/downCheck',
      models: () => [import('./models/downCheck')],
      component: () => import('./routes/commodity/downCheck'),
    },
    {
      path: '/manageCheck',
      models: () => [import('./models/manageCheck')],
      component: () => import('./routes/commodity/manageCheck'),
    },



    // 设置
    {
      path: '/bgSetting',
      models: () => [import('./models/setting/bgSetting')],
      component: () => import('./routes/setting/bgSetting'),
    },
    {
      path: '/chargeSetting',
      models: () => [import('./models/setting/chargeSetting')],
      component: () => import('./routes/setting/chargeSetting'),
    },
    {
      path: '/webSetting',
      models: () => [import('./models/setting/webSetting')],
      component: () => import('./routes/setting/webSetting'),
    },
    {
      path: '/chargeSetting',
      models: () => [import('./models/setting/chargeSetting')],
      component: () => import('./routes/setting/chargeSetting'),
    },

  //订单
  {
    path: '/salesReturnList',
    models: () => [import('./models/order/salesReturnList')],
    component: () => import('./routes/order/salesReturnList'),
  },
  {
    path: '/orderList',
    models: () => [import('./models/order/orderList')],
    component: () => import('./routes/order/orderList'),
  },

  //会员
  {
    path: '/memberNameAudit',
    models: () => [import('./models/vipMenber/memberNameAudit')],
    component: () => import('./routes/vipMenber/memberNameAudit'),
  },
  {
    path: '/memberSign',
    models: () => [import('./models/vipMenber/memberSign')],
    component: () => import('./routes/vipMenber/memberSign'),
  },
  {
    path: '/memberList',
    models: () => [import('./models/vipMenber/memberList')],
    component: () => import('./routes/vipMenber/memberList'),
  },
  {
    path: '/memberGrade',
    models: () => [import('./models/vipMenber/memberGrade')],
    component: () => import('./routes/vipMenber/memberGrade'),
  },
    //网站
    {
      path: '/navigation',
      models: () => [import('./models/website/navigation')],
      component: () => import('./routes/website/navigation'),
    },
    {
      path: '/hotSearch',
      models: () => [import('./models/website/hotSearch')],
      component: () => import('./routes/website/hotSearch'),
    },
    {
      path: '/friendLink',
      models: () => [import('./models/website/friendLink')],
      component: () => import('./routes/website/friendLink'),
    },
    {
      path: '/webCd',
      models: () => [import('./models/website/webCd')],
      component: () => import('./routes/website/webCd'),
    },
    {
      path: '/articleClassify',
      models: () => [import('./models/website/articleClassify')],
      component: () => import('./routes/website/articleClassify'),
    },
    {
      path: '/articleList',
      models: () => [import('./models/website/articleList')],
      component: () => import('./routes/website/articleList'),
    },
    //积分规则
    {
      path: '/integralRule',
      models: () => [import('./models/integralRule')],
      component: () => import('./routes/integral/integralRule'),
    },

    // 资金
    {
      path: '/rechargeRecord',
      models: () => [import('./models/money/rechargeRecord')],
      component: () => import('./routes/money/rechargeRecord'),
    },
    {
      path: '/withdraw',
      models: () => [import('./models/money/withdraw')],
      component: () => import('./routes/money/withdraw'),
    },
    {
      path: '/payWay',
      models: () => [import('./models/money/payWay')],
      component: () => import('./routes/money/payWay'),
    },
    {
      path: '/tradingRecord',
      models: () => [import('./models/money/tradingRecord')],
      component: () => import('./routes/money/tradingRecord'),
    },

//setting

{
  path: '/serviceSetting',
  models: () => [import('./models/setting/serviceSetting')],
  component: () => import('./routes/setting/serviceSetting'),
},
//
    {
      path: '/user',
      models: () => [import('./models/user')],
      component: () => import('./routes/user/'),
    }, {
      path: '/user/:id',
      models: () => [import('./models/user/detail')],
      component: () => import('./routes/user/detail/'),
    }, {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    }, {
      path: '/request',
      component: () => import('./routes/request/'),
    }, {
      path: '/UIElement/iconfont',
      component: () => import('./routes/UIElement/iconfont/'),
    }, {
      path: '/UIElement/search',
      component: () => import('./routes/UIElement/search/'),
    }, {
      path: '/UIElement/dropOption',
      component: () => import('./routes/UIElement/dropOption/'),
    }, {
      path: '/UIElement/layer',
      component: () => import('./routes/UIElement/layer/'),
    }, {
      path: '/UIElement/dataTable',
      component: () => import('./routes/UIElement/dataTable/'),
    }, {
      path: '/UIElement/editor',
      component: () => import('./routes/UIElement/editor/'),
    }, {
      path: '/chart/ECharts',
      component: () => import('./routes/chart/ECharts/'),
    }, {
      path: '/chart/highCharts',
      component: () => import('./routes/chart/highCharts/'),
    }, {
      path: '/chart/Recharts',
      component: () => import('./routes/chart/Recharts/'),
    }, {
      path: '/post',
      models: () => [import('./models/post')],
      component: () => import('./routes/post/'),
    },
  ]

  return (
    <ConnectedRouter history={history}>
      <LocaleProvider locale={enUS}>
        <App>
          <Switch>
            
            <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
            {
              routes.map(({ path, ...dynamics }, key) => (
                <Route key={key}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics,
                  })}
                />
              ))
            }
            <Route component={error} />

          </Switch>
        </App>
      </LocaleProvider>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
