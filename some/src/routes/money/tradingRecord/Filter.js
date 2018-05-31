/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch,Select } from 'antd'
import DateRange from './date'


const { Search } = Input
const { RangePicker } = DatePicker
const Option = Select.Option;

const ColProps = {
  xs: 24,
  sm: 8,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  onAdd,
  fatherHandleClick,
  isMotion,
  switchIsMotion,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }
  const { name, address } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }
  const dates = {
    datestart : '',
    dateend : '',
    selectVal:''
  }
  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
        {getFieldDecorator('name')(
          <div>
            <span>请输入会员名&emsp;</span><Input style={{width:'60%'}} placeholder=""  />
          </div>
        )}
      </Col>
     
      <Col xl={{ span: 6 }} md={{ span: 6 }}>
        <DateRange fatherHandleClick={ (e)=>{dates.datestart = e}}  fatherHandleClickend={ (e)=>{dates.dateend = e}} />
      </Col>
      <Col xl={{ span: 6 }} md={{ span: 6 }}>
        交易状态&emsp;
        <Select defaultValue="" style={{ width: 120 }} onChange={(e)=>{dates.selectVal = e}}>
          <Option value="">全部</Option>
          <Option value="1">交易中</Option>
          <Option value="9" >退款成功</Option>
          <Option value="2">交易成功</Option>
      </Select>
      </Col>
      <Col {...TwoColProps} xl={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            {/* <Button type="primary" className="margin-right" onClick={handleSubmit}>Search</Button>
            <Button onClick={handleReset}>Reset</Button> */}
          </div>
          <div className="flex-vertical-center" >
            {/* <Switch className="ant-switch-large" style={{ marginRight: 16 }} defaultChecked={isMotion} onChange={switchIsMotion} checkedChildren="Motion" unCheckedChildren="Motion" /> */}
            <Button type="ghost" onClick={
              ()=>{
                const val = {...getFieldsValue()}
                val.datestart =dates.datestart
                val.dateend =dates.dateend
                val.status =dates.selectVal
                
                onAdd(val)
              }
              
              }>搜索</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  fatherHandleClick: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
