import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,Switch ,Upload,Button,Icon } from 'antd'


const FormItem = Form.Item
const Option = Select.Option;

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
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,//获取控件的值
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
        id: item.id,
      }

      // data.address = data.address.join(' ')
      onOk(data)
    })
  }
 
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const normFile = (e) => {

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  return (
    <Modal {...modalOpts} >
      <Form layout="horizontal">
        <FormItem label="友情链接名称" {...formItemLayout}>
          {getFieldDecorator('friendname', {
            initialValue: item.friendname,
            rules: [
              {
                required: true,
                message: '请填写友情链接名称',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="链接" {...formItemLayout}>
          {getFieldDecorator('friendurl', {
            initialValue: item.friendurl,
            rules: [
              {
                required: true,
                message: '请填写链接',
              },
            ],
          })(<Input  />)}
        </FormItem>
        <FormItem label="是否启用" {...formItemLayout}>
          {getFieldDecorator('friendstatus', {
            initialValue: Boolean(item.friendstatus),
            rules: [
              {
                type:Boolean
              },
            ],
          })(<Switch defaultChecked={Boolean(item.friendstatus)}/>)}
           </FormItem>
      </Form>
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
