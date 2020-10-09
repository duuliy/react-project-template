import { Col, Row, Tooltip } from 'antd'
import { chunk } from 'lodash'
import PropTypes from 'prop-types'
import './style.less'

const overFlowObj = {
  hidden: 'hidden',
  ellipsis: 'text-ellipsis',
  visible: 'text-visible',
}

/**
 * @props fields{ Araay } 展示字段列表
 *        [{
 *            key: 'String' 字段属性要取data数据的key值
 *            name: 'String' 字段显示的中文名
 *            showTips: Boolean 是否显示antd 的Tooltip提示 默认true
 *            render: Function 自定义渲染字段的值
 *            overFlow: String 文件过长时处理 hidden 多余文字丢掉| ellipsis 多余文件以...显示 | visible 换行显示
 *        }]
 * @props column { Number } 展示位几列 默认为 4列
 * @props data { Object } 详情数据信息
 * @props gutter { Number } 每个字段的间隔  单位为px
 */

const DetailFiedls = ({ fields = [], data = {}, column = 4, gutter = 0 }) => {
  const PrefixCls = 'DetailFiedls'

  //渲染子列
  const renderItem = (filed, i) => {
    const { key, name, overFlow, showTips = true, value: customValue } = filed || {}
    const className = `detail-content-value ${overFlowObj[overFlow || 'visible']}`
    const labelClassName = 'detail-content-label custom-detail-content-label'
    let value = customValue || data[key]
    if (filed.render) {
      value = filed.render(data[key], data)
    }

    let rowClassName = `detail-from-content-col ${filed.breakLine ? 'break-line' : ''}`
    return (
      <Col key={i} className={rowClassName} span={24 / column}>
        <div className={labelClassName}>{name}</div>
        <div className={className}>
          {showTips ? (
            <Tooltip title={value}>
              <div className={className}>{value}</div>
            </Tooltip>
          ) : (
            value
          )}
        </div>
      </Col>
    )
  }

  //渲染多列
  const renderMultipleCol = () => {
    let row = column
    return chunk(fields, row).map((el, idx) => {
      const className = column === 1 ? 'detail-from-content-row detail-from-content-one-row' : 'detail-from-content-row'
      return (
        <Row className={className} key={idx} gutter={gutter}>
          {el.map((it, i) => {
            return renderItem(it, i)
          })}
        </Row>
      )
    })
  }
  return <div className={PrefixCls}>{renderMultipleCol()}</div>
}

DetailFiedls.propTypes = {
  fields: PropTypes.array,
  column: PropTypes.number,
  data: PropTypes.object,
  gutter: PropTypes.number,
}

export default DetailFiedls
