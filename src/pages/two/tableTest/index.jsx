import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'dva'
import { Aform } from '@c/index'
import { cloneDeep, throttle } from 'lodash'
import moment from 'moment'

const TableTest = () => {
  let search = null
  const PrefixCls = 'TableTest'
  const history = useHistory()

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

  const onFinish = values => {
    console.log(values)
  }

  const onReset = values => {
    console.log(values)
  }

  const jumpDEtail = () => {
    history.push('/two/tableTest/detail')
  }

  const jumpEdit = () => {
    history.push('/two/tableTest/edit')
  }

  useEffect(() => {
    // console.log(search)
  }, [])

  return (
    <div className={PrefixCls}>
      <button onClick={jumpDEtail}>去详情</button>
      <button onClick={jumpEdit}>去编辑</button>
      <br />
      <Aform defaultFields={defaultFields} fieldList={fieldList} aFromRef={now => (search = now)} onFinish={onFinish} onReset={onReset} />
      <br />
    </div>
  )
}

export default TableTest
