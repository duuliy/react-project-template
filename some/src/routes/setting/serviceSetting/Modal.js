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
      const oldList =  modalOpts.currentItem
      console.log(data)
      for(var i = 0;i<oldList.length;i++){
        delete oldList[i].customer_name
      }
      oldList[0].customer_qq = data.customer_qq0
      oldList[1].customer_qq = data.customer_qq1
      oldList[2].customer_qq = data.customer_qq2
      oldList[3].customer_qq = data.customer_qq3
      
      
      onOk(oldList)
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
      {
       modalOpts.currentItem.map((itemes,i)=>{
        return <FormItem key={i} label={itemes.customer_name} hasFeedback {...formItemLayout}>
            {getFieldDecorator('customer_qq'+ i, {
              initialValue: itemes.customer_qq,
              rules: [
                {
                  required: true,
                  message: '请填写客服QQ',
                  
                },
              ],
            })(<Input />)}
          </FormItem>
        })
      }
        
        
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.array,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
