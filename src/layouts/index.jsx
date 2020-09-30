import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import BaseLayout from './BaseLayout'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
// import Context from './MenuContext';
// import cls from 'classnames';
// import moment from 'moment';

@connect(({ common, loading }) => ({ common, loading }))
class Layout extends PureComponent {
  state = {
    catalogs: {},
  }

  static defaultProps = {}

  static propTypes = {}

  render() {
    const { children, location } = this.props
    if (location.pathname === '/404' || location.pathname === '/login') {
      return <Fragment>{children}</Fragment>
    }
    //重定向自己写
    // if (!sessionStorage.menus) this.props.history.push('/login')
    // if (location.pathname === '/' && sessionStorage.menus) this.props.history.push('/indexPage')

    return (
      <ConfigProvider locale={zhCN}>
        <BaseLayout>{children}</BaseLayout>
      </ConfigProvider>
    )
  }

  componentDidMount() {}

  componentDidUpdate() {}
}

export default Layout
