import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'dva'
import { Aform, Amodal, Atable } from '@c/index'
import { cloneDeep, throttle } from 'lodash'
import { TooltipFn } from '@u/common'
import moment from 'moment'
import TestRef from './TestRef'

const TableTest = props => {
  let search = null
  const PrefixCls = 'TableTest'
  const history = useHistory()
  const [visible, setVisible] = useState(true)
  const [scount, setScount] = useState(0)
  const [scount2, setScount2] = useState(0)

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

  const columns = [
    {
      title: '类型',
      dataIndex: 'categoryModelName',
      key: 'categoryModelName',
      isShow: true,
      render: text => TooltipFn(text),
    },
    {
      title: '厂商',
      dataIndex: 'mnv',
      key: 'mnv',
      isShow: true,
      render: text => TooltipFn(text),
    },
    {
      title: '所属组织',
      dataIndex: 'responsibleUserName',
      key: 'responsibleUserName',
      isShow: true,
      render: text => TooltipFn(text),
    },
    {
      title: '号码',
      dataIndex: 'number',
      key: 'number',
      isShow: false,
      sorter: true,
      render: text => TooltipFn(text),
    },
  ]

  const dataSource = {
    items: [
      { categoryModelName: 1, mnv: 666, responsibleUserName: 666, number: 666 },
      { categoryModelName: 2, mnv: 666, responsibleUserName: 666, number: 666 },
      { categoryModelName: 3, mnv: 666, responsibleUserName: 666, number: 666 },
      { categoryModelName: 4, mnv: 666, responsibleUserName: 666, number: 666 },
      { categoryModelName: 5, mnv: 666, responsibleUserName: 666, number: 666 },
      { categoryModelName: 6, mnv: 666, responsibleUserName: 666, number: 666 },
      { categoryModelName: 7, mnv: 666, responsibleUserName: 666, number: 666 },
      { categoryModelName: 8, mnv: 666, responsibleUserName: 666, number: 666 },
      { categoryModelName: 9, mnv: 666, responsibleUserName: 666, number: 666 },
      { categoryModelName: 10, mnv: 666, responsibleUserName: 666, number: 'asd', disabled: true },
      { categoryModelName: 11, mnv: 666, responsibleUserName: 666, number: 666 },
    ],
    totalRecords: 11,
  }

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

  const onSubmit = values => {
    console.log(values)
  }

  const onClose = () => {
    setVisible(false)
    console.log('关闭了')
  }

  const changePage = pages => {
    console.log(pages)
  }
  const tableHandleSort = sort => {
    console.log(sort)
  }

  const onChangeSelect = selecteds => {
    console.log(selecteds)
  }

  const rightFuncOk = () => {
    console.log('tableBtn is ok')
  }
  const rightFuncClose = () => {
    console.log('tableBtn is close')
  }

  useEffect(() => {
    // console.log(search)
    // console.log(props.count) hooks和dva一起用
    childCRef.current.changeVal(666)
    document.title = `You clicked ${scount2} times`
  }, [scount])

  const domRef = useRef(null)
  const childCRef = useRef(null)

  const fields = [
    { key: 'categoryModelName', name: '类型', showTips: false },
    { key: 'manufacturer', name: '厂商' },
    { key: 'name', name: '名称' },
    { key: 'version', name: '版本' },
    { key: 'categoryModelName1', name: '类型', showTips: false },
    { key: 'manufacturer1', name: '厂商', render: () => '按钮' },
    { key: 'name1', name: '名称' },
    { key: 'version1', name: '版本' },
  ]
  const data = {
    categoryModelName: 666,
    manufacturer: 666,
    name: 666,
    version: 666,
    categoryModelName1: 666,
    manufacturer1: 666,
    name1: 666,
    version1: 666,
  }

  const leftBtns = [{ label: '新增', onClick: () => console.log('新增了') }, { label: '导出' }, { label: '导入', disabled: true }, { label: '模板下载', check: false }]

  const rightBtns = [{ label: '批量操作', confirm: { text: '弹窗', onOk: rightFuncOk, onClose: rightFuncClose } }]

  return (
    <div className={PrefixCls}>
      <TestRef tt={555} ref={childCRef} />
      <input ref={domRef} />
      <button
        onClick={() => {
          setScount(scount)
          domRef.current.focus()
          domRef.current.value = 'hh'
        }}
      >
        ++
      </button>
      <button onClick={() => setScount2(scount2 + 1)}>2++</button>
      <button onClick={jumpDEtail}>去详情</button>
      <button onClick={jumpEdit}>去编辑</button>
      <br />
      <Aform defaultFields={defaultFields} fieldList={fieldList} aFromRef={now => (search = now)} onFinish={onFinish} onReset={onReset} />
      <br />
      <Atable rowKey={'categoryModelName'} columns={columns} dataSource={dataSource} changePage={changePage} tableHandleSort={tableHandleSort} onChangeSelect={onChangeSelect} leftBtns={leftBtns} rightBtns={rightBtns} />
      {/* <Amodal type="form" title="提交" width={650} fieldList={defaultFields} visible={visible} onSubmit={onSubmit} onClose={onClose} /> */}
      {/* <Amodal type="normal" title="提交" width={650} children={666} visible={visible} onSubmit={onSubmit} onClose={onClose} /> */}
      {/* <Amodal type="detail" title="提交" width={650} column={2} fieldList={fields} detailData={data} visible={visible} onSubmit={onSubmit} onClose={onClose} /> */}
    </div>
  )
}

// export default TableTest

export default connect(({ common }) => ({
  count: common.count,
}))(TableTest)
