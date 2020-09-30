import { PureComponent } from 'react'
import { Breadcrumb } from 'antd'
import PropTypes from 'prop-types'
import menuTree from '@a/js/menuTree'
import './style.less'
import { Link, withRouter } from 'umi'

const Item = Breadcrumb.Item
@withRouter
class Breadcrumbs extends PureComponent {
  state = {
    PrefixCls: 'breadcrumb',
    list: [],
  }
  list = []
  static defaultProps = {
    urlArr: [],
    excludePathname: ['/indexPage'], // 被排除的路由，被排除时，就不在面包屑中显示
  }
  static propTypes = {
    urlArr: PropTypes.array,
  }

  /**
   * 渲染面包屑的每个节点
   * @param route
   * @param params
   * @param routes
   * @param paths
   * @return {*}
   */
  itemRender = (route, params, routes, paths) => {
    const { notTo } = route
    let to = '/' + paths.join('/')
    // 最后一行显示蓝色
    const last = routes.indexOf(route) === routes.length - 1
    const className = last ? 'current_url' : ''
    return notTo ? <span className={className}>{route.breadcrumbName}</span> : <Link to={to}>{route.breadcrumbName}</Link>
  }
  /**
   * 渲染面包屑的每个节点
   * @param route
   * @param params
   * @param routes
   * @param paths
   * @return {*}
   */
  itemRender2 = (route, i, routes) => {
    const { notTo } = route
    let to = route.link
    // console.log('-----to', to)
    // 最后一行显示蓝色
    const last = routes.indexOf(route) === routes.length - 1
    const className = last ? 'current_url' : ''
    return notTo ? (
      <span className={className} key={`${route.breadcrumbName}${Math.random()}`}>
        {route.breadcrumbName}
      </span>
    ) : (
      <a onClick={() => this.linkTo(to)} key={`${route.breadcrumbName}${Math.random()}`}>
        {route.breadcrumbName}
      </a>
    )
  }
  linkTo = url => {
    const { push } = this.props.history
    push(url)
  }
  /**
   * 通过当前路径找到对应的节点信息
   * @param data
   * @param path
   * @return {*}
   */
  findNodeByPath = (data = [], path) => {
    //此处 findNodeList 充当队列的作用
    let findNodeList = [...data]
    while (findNodeList.length > 0) {
      let rootNode = findNodeList[0]
      if (rootNode.path === path) {
        return rootNode
      }
      //清除队列中的第一个元素
      findNodeList.shift()
      let childrenNode = rootNode.children
      if (childrenNode) {
        childrenNode.forEach(item => {
          findNodeList.push(item)
        })
      }
    }
  }
  /**
   * 生成路由
   * @param urlArr
   * @return {*[]}
   */
  findMenuPath = (urlArr = []) => {
    const { excludePathname = [] } = this.props
    if (urlArr.length) {
      const breadcrumbs = []
      let curLink = ''
      for (let i = 0, len = urlArr.length; i < len; ++i) {
        curLink += '/' + urlArr[i]
        const currentMenuItem = this.findNodeByPath(menuTree, curLink)
        if (currentMenuItem) {
          const showMenuItemLength = (currentMenuItem.children || []).filter(e => (typeof e.show === 'undefined' ? true : e.show)).length
          breadcrumbs.push({
            name: currentMenuItem.name, // 名称
            breadcrumbName: currentMenuItem.name, // 名称
            link: curLink, //跳转地址
            path: urlArr[i], //跳转地址
            notTo: i === urlArr.length - 1 || !!showMenuItemLength, // 最后以及不能进行跳转
          })
        }
      }
      return breadcrumbs.filter(e => !excludePathname.includes(e.link))
    } else {
      return []
    }
  }

  render() {
    const { PrefixCls, list } = this.state
    return (
      <Breadcrumb className={PrefixCls} separator=">">
        {list.map((el, i) => {
          return (
            <Item key={`${el.breadcrumbName}${Math.random()}`} separator=">">
              {this.itemRender2(el, i, list)}
            </Item>
          )
        })}
      </Breadcrumb>
    )
  }
  componentDidMount() {
    const { pathname = '' } = this.props.history.location
    const urlArr = pathname.split('/').splice(1)
    const list = this.findMenuPath(urlArr)
    this.setState({ list })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { pathname = '' } = nextProps.history.location
    const urlArr = pathname.split('/').splice(1)
    const list = this.findMenuPath(urlArr)
    this.setState({ list })
  }
}

export default Breadcrumbs
