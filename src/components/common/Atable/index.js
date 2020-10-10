import { useState } from 'react'
import { Table, Button, message } from 'antd'
import { debounce } from 'lodash'
import PropTypes from 'prop-types'
import { Amodal } from '@c/index'
import cls from 'classnames'
import './style.less'

/**
 *  表格上部的功能按钮
 * @param leftBtns { Array} 左边的按钮
 *                  格式：[
 *                          {
 *                            check: Function, // 是否显示该按钮
 *                            label:String, // 按钮文字
 *                            onClick: Function, // 按钮点击事件
 *                            confirm: {
 *                              text: String, // 确认提示文字
 *                              onOk: Function, // 确认
 *                              onCancel: Function, // 取消
 *                            }, // 按钮点击事件
 *                          }
 *                        ]
 * @param rightBtns { Array} 右边的按钮  数据格式同 leftBtns
 *
 * 表格:
 * @props columns {Array} 条件的列表
 */

// 验证是否显示该按钮 权限
const check = ({ check }) => {
  if (typeof check === 'undefined') {
    return true
  } else if (typeof check === 'boolean') {
    return check
  } else if (typeof check === 'function') {
    return check()
  }
  return true
}

const Atable = props => {
  const PrefixCls = 'Atable'
  const { rowKey = 'stringId', className, columns = [], dataSource = {}, pagination = {}, changePage, tableHandleSort, onChangeSelect, leftBtns, rightBtns, ...other } = props
  const { showQuickJumper = true, pageSizeOptions = ['10', '20', '40', '80'] } = pagination
  const classes = cls(PrefixCls, className)
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmData, setConfirmData] = useState({
    text: '',
    onOk: '',
    onClose: '',
  })
  const [selecteds, setSelecteds] = useState({
    selectedRowKeys: [],
    selectedRows: [],
  })

  //弹窗回调
  const moDalCb = callBack => {
    callBack && callBack()
    setSelecteds({
      selectedRowKeys: [],
      selectedRows: [],
    })
    setModalVisible(false)
    setConfirmData({})
  }

  //控制确认弹框
  const controlConfirm = confirmData => {
    if (!selecteds.selectedRowKeys.length) {
      message.warn('请先勾选!')
      return void 0
    }
    setModalVisible(true)
    setConfirmData(confirmData)
  }

  //渲染按钮
  const renderBtn = (btn, i, className) => {
    const disabled = btn.disabled || false

    const callback = () => (btn.confirm ? controlConfirm(btn.confirm) : btn.onClick() || (() => {}))
    return (
      <Button type="primary" className={className} key={`${btn.label}${i}`} onClick={callback} disabled={disabled}>
        {btn.label}
      </Button>
    )
  }

  const handleTableSort = debounce((pagination, filters, sorter) => {
    tableHandleSort({
      field: sorter.field,
      order: sorter.order,
    })
  }, 300)

  const pageChange = debounce((currentPage, pageSize) => {
    changePage({
      currentPage,
      pageSize,
    })
  }, 300)

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    //这里考虑会有点击后产生的不允许条件，可以从外部传进来影响selectedRowKeys
    setSelecteds({
      selectedRowKeys,
      selectedRows,
    })
    onChangeSelect({
      selectedRowKeys,
      selectedRows,
    })
  }

  const rowSelection = {
    selectedRowKeys: selecteds.selectedRowKeys, //保证key唯一就可以跨页
    onChange: onSelectChange,
    getCheckboxProps: record => {
      return {
        disabled: record.disabled,
      }
    },
  }

  return (
    <section className={classes}>
      <div className="table-btn">
        <div className="left-btn">
          {leftBtns.filter(check).map((btn, i) => {
            return renderBtn(btn, i, 'btn-left')
          })}
        </div>
        <div className="right-btn">
          {rightBtns.filter(check).map((btn, i) => {
            return renderBtn(btn, i, 'btn-right')
          })}
        </div>
      </div>
      <Table
        rowKey={rowKey}
        columns={columns}
        dataSource={dataSource.items || []}
        // scroll={{ x: true }}
        // className={`asset-table ${isAllSelectShow ? '' : 'disabled-select-table'}`}
        // rowClassName={rowClassNameFunc}
        rowSelection={rowSelection}
        onChange={handleTableSort}
        pagination={{
          //   current: pages.currentPage,
          //   pageSize: pages.pageSize,
          showQuickJumper,
          showSizeChanger: dataSource.totalRecords > 10,
          onShowSizeChange: pageChange,
          onChange: pageChange,
          pageSizeOptions,
          showTotal: () => `共 ${dataSource.totalRecords || 0} 条数据`,
          total: dataSource.totalRecords || 0,
        }}
        {...other}
      />
      <Amodal type="normal" title="提示" children={confirmData.text} visible={modalVisible} onSubmit={() => moDalCb(confirmData.onOk)} onClose={() => moDalCb(confirmData.onClose)} />
    </section>
  )
}

Atable.propTypes = {
  visible: PropTypes.bool,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  columns: PropTypes.array,
  dataSource: PropTypes.object,
  pagination: PropTypes.object,
  changePage: PropTypes.func,
  handleTableSort: PropTypes.func,
  onChangeSelect: PropTypes.func,
  leftBtns: PropTypes.array,
  rightBtns: PropTypes.array,
}

export default Atable
