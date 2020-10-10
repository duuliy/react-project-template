import { Tooltip } from 'antd'

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
/* 判断内容是否为空
 * @param s 要判断的内容
 * @return Boolean
 */
export const isEmpty = s => {
  return s === null || typeof s === 'undefined' || (typeof s === 'string' && s.replace(/\s*/g, '') === '') || s === 'null/null' || s === 'null'
}

/* 判断内容是否为空，为空显示占位符
 * @param str 要判断的内容
 * @return str 返回实际显示的内容
 */
export const emptyFilter = str => {
  if (isEmpty(str)) return '--'
  return str
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
