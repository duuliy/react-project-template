import { PureComponent } from 'react'
import { Form, Button } from 'antd'
import { debounce } from 'lodash'
import PropTypes from 'prop-types'
import { withRouter } from 'umi'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { CustomForm } from '@c/index'
import cls from 'classnames'
import './style.less'

const { Item: FormItem } = Form

const defaultFieldsInit = [{ label: '综合查询', maxLength: 30, className: '', key: 'multipleQuery', span: 12, style: { width: 638 }, type: 'input', placeholder: '名称/编号/IP' }]
/**
 * @props  type search | form
 * @props  defaultFields { Array } 默认查询条件， 参考fieldList
 * @props  fieldList {Array} 查询条件的列表
 * @props  onFinish { Function } 查询提交时的回调函数
 * @props  onReset { Function } 重置
 * @props  column { Number } 分多少列渲染
 * @props  resetShow { Boolean } 是否显示 【重置】 按钮
 */
@withRouter
class Aform extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      PrefixCls: 'Aform',
      conditionShow: false,
    }
    this.formRef = React.createRef()
  }

  static defaultProps = {
    type: 'search',
    column: 3, // 分多少列渲染
    resetShow: true, // 是否显示 重置 按钮
    okText: '查询', // 查询按钮的显示
    defaultFields: defaultFieldsInit, //普通查询
    fieldList: [], //高级查询
  }
  static propTypes = {
    type: PropTypes.oneOf(['search', 'form']),
    column: PropTypes.number,
    resetShow: PropTypes.bool,
    okText: PropTypes.string,
    defaultFields: PropTypes.array,
    fieldList: PropTypes.array,
    onFinish: PropTypes.func,
    onReset: PropTypes.func,
    className: PropTypes.string,
  }

  //展开搜索条件
  isExpand = () => {
    this.setState({ conditionShow: !this.state.conditionShow })
  }

  //获取查询参数
  onFinish = debounce(values => {
    const { onFinish } = this.props
    onFinish && onFinish(values)
  }, 300)

  //重置数据
  onReset = debounce(() => {
    this.formRef.current.resetFields()
    this.props.onReset({})
  }, 300)

  render() {
    const { fieldList, defaultFields, column, resetShow, okText, type, className } = this.props
    const { conditionShow, PrefixCls } = this.state
    const classes = cls(`${PrefixCls}-filter-form`, className)

    return (
      <Form className={classes} layout="inline" ref={this.formRef} onFinish={this.onFinish}>
        <CustomForm
          fieldList={defaultFields}
          column={column}
          getBuiltInBtn={() =>
            type === 'search' ? (
              <FormItem className="search-item search-more-item search-from-btn">
                <div className="search-from-btn-content">
                  <Button type="primary" htmlType="submit">
                    {okText}
                  </Button>
                  {resetShow && (
                    <Button htmlType="button" type="primary" ghost onClick={() => this.onReset()}>
                      重置
                    </Button>
                  )}
                  {fieldList.length ? (
                    <span className="show-ondition" onClick={this.isExpand}>
                      {conditionShow ? <UpOutlined /> : <DownOutlined />}
                      {conditionShow ? '收起' : '高级查询'}
                    </span>
                  ) : null}
                </div>
              </FormItem>
            ) : null
          }
          FormItem={FormItem}
        />
        {type === 'form' ? (
          <div className="from-btn-center-wrap">
            <Button type="primary" htmlType="submit">
              {okText}
            </Button>
            <Button htmlType="button" style={{ marginLeft: 16 }} type="primary" ghost onClick={() => this.onReset()}>
              重置
            </Button>
            {/* 此处可以加自定义按钮 */}
          </div>
        ) : null}
        <div className={'hide-form ' + (conditionShow ? 'flex' : 'none')}>
          <CustomForm fieldList={fieldList} column={column} FormItem={FormItem} />
        </div>
      </Form>
    )
  }

  componentDidMount() {
    if (this.props.aFromRef) this.props.aFromRef(this)
  }
}
export default Aform
