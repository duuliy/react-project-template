import React, { PureComponent } from 'react'
import { Layout, Avatar, Menu, Dropdown } from 'antd'
import PropTypes from 'prop-types'
import config from '../config/config.js'

const { Header } = Layout
class HeaderView extends PureComponent {
  static propTypes = {
    toggle: PropTypes.func,
    islogin: PropTypes.bool,
    onSignOut: PropTypes.func,
  }
  handleClickMenu = e => {
    e.key === 'signOut' && this.props.onSignOut()
  }
  render() {
    const { islogin } = this.props

    const menu = (
      <Menu onClick={this.handleClickMenu}>
        <Menu.Item key="person"> 个人中心</Menu.Item>
        <Menu.Item key="signOut">退出登录</Menu.Item>
      </Menu>
    )

    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <div className={'logo'}>
          <img alt="logo" src={config.logoPath} />
          <span>{config.siteName}</span>
        </div>
        <div className="right">
          <Avatar size="small" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />

          {islogin && (
            <Dropdown overlay={menu} placement="bottomRight">
              <span>duuliy</span>
            </Dropdown>
          )}
        </div>
      </Header>
    )
  }
}

export default HeaderView
