/**
 * 获取token
 */
export const getToken = () => {
  let info = localStorage.getItem('userToken')
  return JSON.parse(unescape(info))
}

/**
 * 菜单及功能按钮权限验证
 */
export const hasAuth = tag => {
  // const menus = JSON.parse(sessionStorage.menus || '[]');
  const menus = ['one', 'one:OnLineMap', 'one:oneOffLineMap', 'one:oneOffLineMap:detail', 'two', 'two:LeafLetMap', 'two:twoTableTest', 'two:twoTableTest:detail', 'wo:twoTableTest:edit', 'four', 'four:fourOption13']
  return menus.includes(tag)
}

/**  气泡
 * @param text 要显示的内容
 */
export const TooltipFn = text => {
  return (
    <Tooltip getPopupContainer={triggerNode => triggerNode.parentNode} placement="topLeft" title={text}>
      {emptyFilter(text)}
    </Tooltip>
  )
}
