import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,Switch ,Upload,Button,Icon } from 'antd'
import CropperUp from '../../cropperUP'

const FormItem = Form.Item
const Option = Select.Option;
// const childImg = ''
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
}

const modal = ({
  item = {},
  onOk,
  childImg= '',
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      console.log(childImg)
      data.shoptype_img = childImg
      onOk(data)
    })
  }
 
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  console.log(modalOpts)
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  
  return (
    <Modal {...modalOpts} >
        <div>
          <h3>基本信息</h3>
          <div>
            <span>退货单流水号:</span>
            <span style={{marginRight:'20px',}}>{modalOpts.currentItem[0].id}</span>
            <span>退货时间:</span>
            <span style={{marginRight:'20px'}}>{modalOpts.currentItem[0].refund_time}</span>
            <span>订单编号:</span>
            <span>{modalOpts.currentItem[0].order_no}</span>
          </div>
          <br/>
          <div>
            <span>下单时间:</span>
            <span style={{marginRight:'20px'}}>{modalOpts.currentItem[0].order_info.order_createtime}</span>
            <span>购买用户:</span>
            <span >{modalOpts.currentItem[0].order_info.bay_user_name}</span>
          </div>
          <br/>
          <h3>商品信息</h3>
          <div>
            <span>商品名称:</span>
            <span style={{marginRight:'20px'}}>{modalOpts.currentItem[0].order_info.shop_info.shop_title}</span>
            <span>商品编号:</span>
            <span style={{marginRight:'20px'}}>{modalOpts.currentItem[0].order_info.shop_info.shop_id}</span>
            <span>退货数量:</span>
            <span>{modalOpts.currentItem[0].order_info.order_count}</span>
          </div>
        </div>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
