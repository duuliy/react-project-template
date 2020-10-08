import { PureComponent } from 'react'
import { Form, Button, Input, TreeSelect, Select, Icon } from 'antd'
import { chunk, debounce } from 'lodash'
import PropTypes from 'prop-types'
import { withRouter } from 'umi'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import cls from 'classnames'
import './style.less'
import AdateRange from '../AdateRange'

const { Item: FormItem } = Form
const { SHOW_PARENT, TreeNode } = TreeSelect
const { Option } = Select

const defaultFieldsInit = [{ label: '综合查询', maxLength: 30, className: '', key: 'multipleQuery', span: 12, style: { width: 638 }, type: 'input', placeholder: '名称/编号/IP' }]
/**
 * 注意：
 * props defaultFields { Array } 默认查询条件， 参考fieldList
 * props fieldList {Array} 查询条件的列表
 *        [
 *          {
 *            label: string, // 查询条件的显示名称
 *            key: string, // 查询条件的字段名
 *            config: { name: String, value: String }, // name为下拉框类型表单的属性字段名，默认为name， value为下拉框类型表单的id属性字段名，默认为value
 *            rules: Array //校验规则，
 *            type: 'select | dateRange | input | treeSelect',  // 查询条件的表单类型
 *            showSearch: boolean // 是否可搜索
 *            placeholder: string // 普通类型的是字符串
 *            data: Array | Object 为选择类型表单的 下拉值，  Array: 是select 类型的 options， Object：是treeSelect的下拉选项
 *            mode: multiple | tags	, // 设置 Select 的模式为多选或标签
 *            initialValue: string, // 设置子元素默认值
 *            更多参数参考antd
 *          }
 *        ]
 * props  onFinish { Function } 查询提交时的回调函数
 * props  onReset { Function } 重置
 * props  column { Number } 分多少列渲染
 * props  resetShow { Boolean } 是否显示 【重置】 按钮
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
    column: 3, // 分多少列渲染
    resetShow: true, // 是否显示 重置 按钮
    okText: '查询', // 查询按钮的显示
    defaultFields: defaultFieldsInit, //普通查询
    fieldList: [], //高级查询
  }
  static propTypes = {
    column: PropTypes.number,
    resetShow: PropTypes.bool,
    okText: PropTypes.string,
    defaultFields: PropTypes.array,
    fieldList: PropTypes.array,
    onFinish: PropTypes.func,
    onReset: PropTypes.func,
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

  //渲染formItem
  renderFormItem = (fieldList = [], column) => {
    return chunk(fieldList, column).map(row => row.map((item, index) => this.renderComponent(item, index)))
  }

  //渲染form的组件
  renderComponent = (item = {}, index) => {
    const { type, label = '', key, initialValue, rules, placeholder, className, allowClear = true, data, config = {}, ...other } = item
    // const { name, value } = config || {}
    let component = null

    const classes = cls('search-from-item ', className, {
      ['search-item-separation ']: index === 1,
    })

    // 自带组件
    if (item.component) {
      const _component = item.component
      return (
        <FormItem name={key} label={label} key={label + key} className={classes} initialValue={initialValue} rules={rules}>
          {_component}
        </FormItem>
      )
    }
    switch (type) {
      case 'input': {
        component = <Input autoComplete="off" allowClear={allowClear} placeholder={placeholder || '请输入' + label} maxLength={item.maxLength} {...other} />
        break
      }
      case 'select': {
        let _data = data,
          _allowClear = { allowClear: allowClear }
        // 多选没有'全部'选项
        if (!item.mode) {
          _data = (data || []).filter(e => e[config.name || 'name'] === '全部').length ? data : [{ [config.name || 'name']: '全部', [config.value || 'value']: null }, ...data]
          _allowClear = { allowClear: false }
        }
        component = (
          <Select getPopupContainer={triggerNode => triggerNode.parentNode} placeholder={placeholder || '请选择' + label} optionFilterProp="label" {..._allowClear} {...other}>
            {_data.map((v, i) => {
              return (
                <Option key={i} value={v[config.value || 'value']} label={v[config.name || 'name']}>
                  {v[config.name || 'name']}
                </Option>
              )
            })}
          </Select>
        )
        break
      }
      case 'treeSelect': {
        const className = 'filter-form-item ' + item.className
        component = (
          <TreeSelect allowClear={allowClear} getPopupContainer={triggerNode => triggerNode.parentNode} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} placeholder={placeholder || '请选择' + label} treeDefaultExpandAll showCheckedStrategy={SHOW_PARENT} treeNodeFilterProp="title" {...other}>
            {this.renderNodeTree(data, config)}
          </TreeSelect>
        )
        break
      }
      case 'dateRange': {
        // style={{ width: 638 }}
        component = <AdateRange placeholder={placeholder || '请选择' + label} {...other} />
        break
      }
      default:
        return null
    }
    return (
      <FormItem name={key} label={label} key={label + key} initialValue={initialValue} rules={rules} className={classes}>
        {component}
      </FormItem>
    )
  }

  //渲染树
  renderNodeTree = (data = {}, config = {}) => {
    return !!data && !!data.length
      ? data.map(item => (
          <TreeNode value={item[config.value || 'stringId']} title={item[config.name || 'name']} key={`${item[config.value || 'value']}`}>
            {item.childrenNode && item.childrenNode.length ? this.renderNodeTree(item.childrenNode, config) : void 0}
          </TreeNode>
        ))
      : void 0
  }

  render() {
    const { fieldList, defaultFields, column, resetShow, okText } = this.props
    const { conditionShow } = this.state
    return (
      <div className="custom-form">
        <Form className="filter-form" layout="inline" ref={this.formRef} onFinish={this.onFinish}>
          <div className="default-filter-item">
            {this.renderFormItem(defaultFields, column)}
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
          </div>
          <div className={'hide-form ' + (conditionShow ? 'flex' : 'none')}>{this.renderFormItem(fieldList, column)}</div>
        </Form>
      </div>
    )
  }

  componentDidMount() {
    if (this.props.searchFrom) this.props.searchFrom(this)
  }
}
export default Aform
