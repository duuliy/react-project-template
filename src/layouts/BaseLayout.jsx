import React, { PureComponent } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import './style.less'
import config from '../config/config.js'
import Header from './HeaderView'
import Footer from './Footer'
import Menu from './Menu'
import menuTree from '@a/js/menuTree'
import { Layout } from 'antd'
import Breadcrumbs from './Breadcrumbs'

const SubMenu = Menu.SubMenu
const { Sider, Content } = Layout

class BasicLayout extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      PrefixCls: 'BasicLayout',
      islogin: true,
    }
  }

  static propTypes = {
    children: PropTypes.object,
  }
  onSignOut() {
    console.log('退出登录')
  }

  render() {
    const { children } = this.props
    const { PrefixCls, islogin } = this.state
    return (
      <Layout className={PrefixCls}>
        <Header onSignOut={this.onSignOut} islogin={islogin} />
        <Layout>
          <Sider trigger={null} collapsible>
            <Menu menuTree={menuTree} />
          </Sider>
          <Layout>
            <Breadcrumbs />

            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>{children}</Content>
            <Footer footer={config.footer} />
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default connect()(BasicLayout)
