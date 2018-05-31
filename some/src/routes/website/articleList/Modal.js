import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,Switch ,Upload,Button,Icon } from 'antd'
const { TextArea } = Input;

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
      console.log("传过去的data")
      console.log(data)
      // data.address = data.address.join(' ')
      onOk(data)
    })
  }
 
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  // console.log(modalOpts)
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  return (
    <Modal {...modalOpts} >
      <Form layout="horizontal">
        <FormItem label="文章标题" hasFeedback {...formItemLayout}>
          {getFieldDecorator('contentname', {
            initialValue: item.contentname,
            rules: [
              {
                required: true,
                message: '请填写文章标题',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="文章分类" hasFeedback {...formItemLayout}>
          {getFieldDecorator('typeid', {
            initialValue: item.typeid,
            rules: [
              {
                required: true,
                message: '请填写链接',
              },
            ],
          })(<Input  />)}
        </FormItem>
        <FormItem label="是否显示" hasFeedback {...formItemLayout}>
          {getFieldDecorator('contentstatus', {
            initialValue: Boolean(item.contentstatus),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(<Switch  />)}
        </FormItem>
        <FormItem label="关键字" hasFeedback {...formItemLayout}>
          {getFieldDecorator('typeid', {
            initialValue: item.typeid,
            rules: [
              {
                required: true,
                message: '请填写关键字',
              },
            ],
          })(<Input  />)}
        </FormItem>
        <FormItem label="网页描述" hasFeedback {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: item.description,
            rules: [
              {
                required: true,
                message: '请填写网页描述',
              },
            ],
          })(<TextArea autosize={{ minRows: 2, maxRows: 6 }}  />)}
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
