import { Input, TreeSelect, Select, Col, InputNumber, TimePicker, DatePicker, Switch, Radio, Checkbox, Cascader } from 'antd'
import { chunk } from 'lodash'
import cls from 'classnames'
import AdateRange from '../AdateRange'
import PropTypes from 'prop-types'
import './style.less'

const { SHOW_PARENT, TreeNode } = TreeSelect
const { Option } = Select
const { TextArea } = Input

/**
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
 *            reder:渲染
 *            更多参数参考antd
 *          }
 *        ]
 * props  column { Number } 分多少列渲染
 */

const Detail = ({ detailVal, render }) => <>{render ? render() : detailVal}</>

const CustomForm = ({ fieldList = [], column, getBuiltInBtn, FormItem }) => {
  const PrefixCls = 'CustomForm'
  //渲染树
  const renderNodeTree = (data = {}, config = {}) => {
    return !!data && !!data.length
      ? data.map(item => (
          <TreeNode value={item[config.value || 'stringId']} title={item[config.name || 'name']} key={`${item[config.value || 'value']}`}>
            {item.childrenNode && item.childrenNode.length ? renderNodeTree(item.childrenNode, config) : void 0}
          </TreeNode>
        ))
      : void 0
  }

  //渲染form的组件
  const renderComponent = (item = {}, index) => {
    const { type, label = '', key, initialValue, rules, placeholder, className, valuePropName = 'checked', validateTrigger, allowClear = true, data, config = {}, ...other } = item
    let component = null

    const classes = cls('search-from-item ', className, {
      ['search-item-separation ']: index === 1,
    })

    // 自带组件
    if (item.component) {
      return (
        <FormItem name={key} label={label} key={label + key} className={classes} initialValue={initialValue} rules={rules}>
          {item.component}
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
        component = (
          <TreeSelect allowClear={allowClear} getPopupContainer={triggerNode => triggerNode.parentNode} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} placeholder={placeholder || '请选择' + label} treeDefaultExpandAll showCheckedStrategy={SHOW_PARENT} treeNodeFilterProp="title" {...other}>
            {renderNodeTree(data, config)}
          </TreeSelect>
        )
        break
      }
      case 'dateRange': {
        // style={{ width: 638 }}
        component = <AdateRange placeholder={placeholder || '请选择' + label} {...other} />
        break
      }
      case 'detail': {
        component = <Detail {...other} />
        break
      }
      case 'number': {
        component = <InputNumber placeholder={placeholder || '请输入' + label} {...other} />
        break
      }
      case 'timePicker': {
        component = <TimePicker getCalendarContainer={triggerNode => triggerNode.parentNode} {...other} />
        break
      }
      case 'datePicker': {
        component = <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode} {...other} />
        break
      }
      case 'textArea': {
        component = <TextArea placeholder={placeholder || '请输入' + label} {...other} />
        break
      }
      case 'switch': {
        component = <Switch {...other} />
        break
      }
      case 'radioGroup': {
        component = (
          <Radio.Group {...other}>
            {(data || []).map(v => {
              return (
                <Radio value={v[config.value || 'value']} key={v[config.value || 'value']}>
                  {v[config.name || 'name']}
                </Radio>
              )
            })}
          </Radio.Group>
        )
        break
      }
      case 'checkboxGroup': {
        const _data = data.map(v => {
          v.label = v[config.name || 'label']
          v.value = v[config.value || 'value']
          return v
        })
        component = <Checkbox.Group options={_data || []} {...other} />
        break
      }
      case 'cascader': {
        component = <Cascader options={data} placeholder={placeholder || '请选择' + label} {...other} />
        break
      }
      default:
        return null
    }
    return (
      <FormItem name={key} label={label} key={label + key} initialValue={initialValue} validateTrigger={validateTrigger} rules={rules} valuePropName={valuePropName} className={classes}>
        {component}
      </FormItem>
    )
  }

  //渲染formItem
  const renderFormItem = (fieldList, column) => {
    return chunk(fieldList, column).map(row =>
      row.map((item, index) => (
        <Col key={index} span={24 / column}>
          {renderComponent(item, index)}
        </Col>
      ))
    )
  }

  return (
    <div className={PrefixCls}>
      {renderFormItem(fieldList, column)}
      <Col span={24 / column}>{getBuiltInBtn && getBuiltInBtn()}</Col>
    </div>
  )
}
CustomForm.propTypes = {
  fieldList: PropTypes.array,
  column: PropTypes.number,
  getBuiltInBtn: PropTypes.func,
  FormItem: PropTypes.func,
}

export default CustomForm
