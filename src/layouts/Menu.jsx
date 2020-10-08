import { Component } from 'react'
import { Menu } from 'antd'
import './style.less'
import { NavLink, withRouter } from 'umi'
import { hasAuth } from '@u/common'
import PropTypes from 'prop-types'

const { SubMenu } = Menu

@withRouter
class MenuTree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openKeys: [],
    }
  }

  static propTypes = {
    menuTree: PropTypes.array,
  }

  //把打开的折叠菜单记录下来，以便刷新界面时，快速展开之前的菜单
  onOpenChange = keyPath => {
    this.setState({ openKeys: keyPath })
    sessionStorage.setItem('openKeys', keyPath.join(','))
  }

  //生成菜单的选中项，在刷新页面时，提供刷新之前选中的菜单项
  getSelectedKey() {
    const { pathname = '' } = this.props.history.location
    return [
      `/${pathname
        .split('/')
        .splice(1)
        .join('/')}`,
    ]
  }

  //生成菜单的展开项，在刷新页面时，提供刷新之前展开的菜单项
  getOpenKey() {
    const { openKeys } = this.state
    return this.findMenuOpenKey(openKeys)
  }

  findMenuOpenKey = (list = []) => {
    const openKeys = (sessionStorage.getItem('openKeys') || '').split(',').filter(e => e)
    if (list.length) {
      const _openKey = []
      let curOpenKey = ''
      for (let i = 0, len = list.length; i < len - 1; ++i) {
        if (!openKeys.includes(list[i])) {
          curOpenKey += '/' + list[i]
          _openKey.push(curOpenKey)
        }
      }
      return [...new Set([...openKeys, ..._openKey])]
    } else {
      return openKeys
    }
  }

  //根据权限渲染菜单
  getMenu = menuTree =>
    menuTree.map(item => {
      const ifShow = typeof item.show === 'undefined' ? true : item.show

      if (!ifShow || !hasAuth(item.tag)) {
        return void 0
      }
      // 显示的子菜单的数量
      const showMenuItemLength = (item.children || []).filter(v => (typeof v.show === 'undefined' ? true : v.show)).length
      // 有子菜单项，并且子菜单必须有一个时显示
      if (item.children && showMenuItemLength) {
        return (
          <SubMenu key={item.key} title={item.name} icon={item.icon}>
            {this.getMenu(item.children)}
          </SubMenu>
        )
      }

      return (
        <Menu.Item key={item.key}>
          <NavLink to={item.path}>{item.name}</NavLink>
        </Menu.Item>
      )
    })

  render() {
    const { menuTree } = this.props
    const configMenu = {
      onOpenChange: this.onOpenChange,
      selectedKeys: this.getSelectedKey(),
      openKeys: this.getOpenKey(),
    }
    return (
      <Menu theme="dark" mode="inline" className="menu" {...configMenu}>
        {this.getMenu(menuTree)}
      </Menu>
    )
  }

  componentDidMount() {}
}
export default MenuTree
