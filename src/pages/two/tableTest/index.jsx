import React, { PureComponent, useEffect } from 'react'
import { connect } from 'dva'
import { Aform } from '@c/index'
import { cloneDeep, throttle } from 'lodash'
import moment from 'moment'
import { withRouter } from 'umi'

const TableTest = () => {
  let search = null,
    search2 = null
  const PrefixCls = 'TableTest'
  const treeData = [
    {
      title: 'Node1',
      value: '0-0',
      childrenNode: [
        {
          title: 'Child Node1',
          value: '0-0-1',
        },
        {
          title: 'Child Node2',
          value: '0-0-2',
        },
      ],
    },
    {
      title: 'Node2',
      value: '0-1',
    },
  ]
  const defaultFields = [
    { type: 'input', label: '补丁编号', disabled: true, initialValue: '666', placeholder: '请输入', key: 'antiyPatchNumber', allowClear: true, rules: [{ type: 'string', required: true, message: '请输入!' }] },
    {
      type: 'select',
      label: '补丁号码',
      key: 'patchNumber',
      mode: 'multiple',
      data: [
        { name: 555, value: 666 },
        { name: 556, value: 667 },
      ],
    },
    { type: 'input', label: '补丁名称', placeholder: '请输入', key: 'patchName', allowClear: true, maxLength: 10 },
    { type: 'dateRange', label: '发布时间', placeholder: ['开始时间', '结束时间'], key: 'aTime', future: true },
  ]
  const fieldList = [{ type: 'input', label: '补丁号码2', placeholder: '请输入', key: 'patchNumber2', allowClear: true, maxLength: 64 }]
  const defaultFields2 = [
    ...defaultFields,
    { type: 'select', label: '当前状态', placeholder: '请选择', key: 'warehousingStatus', data: [{ name: 555, value: 666 }] },
    { label: '树下拉', key: 'categoryModels', treeCheckable: true, multiple: true, config: { name: 'title', value: 'value' }, type: 'treeSelect', placeholder: '全部', data: treeData },
    { type: 'detail', label: 'detail', key: 'detail1', detailVal: '详情' },
    { type: 'number', label: 'number', key: 'number1', max: 10 },
    { type: 'timePicker', label: 'timePicker', key: 'timePicker1' },
    { type: 'datePicker', label: 'datePicker', key: 'datePicker1' },
    { type: 'textArea', label: 'textArea', key: 'textArea1' },
    { type: 'switch', label: 'switch', key: 'switch1', valuePropName: 'checked' },
    {
      type: 'radioGroup',
      label: 'radioGroup',
      key: 'radioGroup1',
      data: [
        { name: 555, value: 666 },
        { name: 585, value: 686 },
      ],
    },
    {
      type: 'checkboxGroup',
      label: 'checkboxG',
      key: 'checkboxGroup1',
      data: [
        { label: 555, value: 666 },
        { label: 585, value: 686 },
      ],
    },
  ]

  const onFinish = values => {
    console.log(values)
  }

  const onReset = values => {
    console.log(values)
  }

  useEffect(() => {
    // console.log(search)
  }, [])

  return (
    <div className={PrefixCls}>
      <Aform defaultFields={defaultFields} fieldList={fieldList} aFromRef={now => (search = now)} onFinish={onFinish} onReset={onReset} />
      <br />
      <Aform defaultFields={defaultFields2} aFromRef={now => (search2 = now)} onFinish={onFinish} onReset={onReset} column={4} type="form" okText="确定" />
    </div>
  )
}
export default withRouter(TableTest)
