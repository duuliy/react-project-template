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
        tag_id: item.tag_id,
      }
      // console.log("传过去的data")
      // console.log(data)
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
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  return (
    <Modal {...modalOpts} >
      <Form layout="horizontal">
        <FormItem label="标签名称"  {...formItemLayout}>
          {getFieldDecorator('tag_name', {
            initialValue: item.tag_name,
            rules: [
              {
                required: true,
                message: '请填写标签名称',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="标签logo"
          extra=""
        >
          {getFieldDecorator('tag_icon', {
            valuePropName: 'fileList',
            initialValue:  item.tag_icon,
          })(
      
              <Upload name="logo"  listType="picture">
                <Button>
                  <Icon type="upload" /> 点击更换logo
                </Button>
              </Upload>
       
          )}
        </FormItem>
        <FormItem label="标签简介"  {...formItemLayout}>
          {getFieldDecorator('tag_remark', {
            initialValue: item.tag_remark,
            rules: [
              {
                required: true,
                message: '请填写标签简介',
              },
            ],
          })(<Input  />)}
        </FormItem>
        <FormItem label="是否启用"  {...formItemLayout}>
          {getFieldDecorator('tag_status', {
            initialValue: Boolean(item.tag_status),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(<Switch  defaultChecked={Boolean(item.tag_status)}/>)}
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
