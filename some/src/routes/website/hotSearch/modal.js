import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,Switch ,Upload,Button,Icon } from 'antd'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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
  type,
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
        type:Number(type),
        id:item.id
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
        <FormItem label="热词名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('hotname', {
            initialValue: item.hotname,
            rules: [
              {
                required: true,
                message: '请输入热词名称',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="热词链接" hasFeedback {...formItemLayout}>
          {getFieldDecorator('hoturl', {
            initialValue: item.hoturl,
            rules: [
              {
                required: true,
                message: '请输入热词链接',
              },
            ],
          })(<Input  />)}
        </FormItem>
        <FormItem label="打开方式" hasFeedback {...formItemLayout}>
          {getFieldDecorator('openstyle', {
            initialValue: item.openstyle,
            rules: [
              {
                required: true,
                message: '请选择打开方式',
            }
            ],
          })(<RadioGroup >
              <RadioButton value="0">当前窗口</RadioButton>
              <RadioButton value="1">新窗口</RadioButton>
              </RadioGroup>)}
        </FormItem>
        <FormItem label="状态" hasFeedback {...formItemLayout}>
          {getFieldDecorator('hotstatus', {
            initialValue: item.hotstatus,
            rules: [
              {
                required: true,
                message: '请选择打开方式',
            }
            ],
          })(<RadioGroup >
              <RadioButton value="0">显示</RadioButton>
              <RadioButton value="1">隐藏</RadioButton>
              </RadioGroup>)}
        </FormItem>
        <FormItem label="排序" hasFeedback {...formItemLayout}>
          {getFieldDecorator('hotsort', {
            initialValue: item.hotsort,
            rules: [
              {
                required: true,
                message: '请填写栏目排序',
            }
            ],
          })(<Input/>)}
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
  type:PropTypes.number
}

export default Form.create()(modal)