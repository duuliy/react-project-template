import React, { PureComponent } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Aform } from '@c/index'
import { cloneDeep, throttle, values } from 'lodash'
import moment from 'moment'
import { withRouter } from 'umi'

@withRouter
class TableTest extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      PrefixCls: 'TableTest',
    }
  }

  onFinish = values => {
    console.log(values)
  }

  onReset = values => {
    console.log(values)
  }

  render() {
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
      { type: 'input', label: '补丁编号', initialValue: 666, placeholder: '请输入', key: 'antiyPatchNumber', allowClear: true, rules: [{ type: 'object', required: true, message: '请输入!' }] },
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
      { type: 'dateRange', label: '发布时间', placeholder: ['开始时间', '结束时间'], key: 'aTime' },
    ]
    const fieldList = [{ type: 'input', label: '补丁号码2', placeholder: '请输入', key: 'patchNumber', allowClear: true, maxLength: 64 }]
    const defaultFields2 = [...defaultFields, { type: 'select', label: '当前状态', placeholder: '请选择', key: 'warehousingStatus', data: [{ name: 555, value: 666 }] }, { label: '树下拉', key: 'categoryModels', treeCheckable: true, multiple: true, config: { name: 'title', value: 'value' }, type: 'treeSelect', placeholder: '全部', data: treeData }]
    return (
      <div>
        <Aform defaultFields={defaultFields} searchFrom={now => (this.search = now)} onFinish={this.onFinish} onReset={this.onReset} />
        <Aform defaultFields={defaultFields2} fieldList={fieldList} searchFrom={now => (this.search2 = now)} onFinish={this.onFinish} onReset={this.onReset} />
      </div>
    )
  }
  componentDidMount() {
    // console.log(this.search)
  }
}

export default TableTest
