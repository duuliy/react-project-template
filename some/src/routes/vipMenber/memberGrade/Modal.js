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
      // console.log(data)
      const modalList = modalOpts.lists
      for(var i = 0;i<modalList.length;i++){
        delete modalList[i].lv_grade;
      }
      console.log(modalList)
      modalList[modalOpts.id-1].lv_name = data.lv_name
      modalList[modalOpts.id-1].lv_min_score = Number(data.lv_min_score)
      modalList[modalOpts.id-1].lv_max_score = Number(data.lv_max_score)
      onOk(modalList)
    })
  }
 
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  // console.log(modalOpts.lists[modalOpts.id])
  // console.log(modalOpts)
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  // const  fatherImges = (e)=>{
  //   console.log(e)
  // }
  return (
    <Modal {...modalOpts} >
      <Form layout="horizontal">
   
        <FormItem label="等级名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('lv_name', {
            initialValue: modalOpts.lists[modalOpts.id-1].lv_name,
            rules: [
              {
                required: true,
                message: '请填写等级名称',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="积分下限" hasFeedback {...formItemLayout}>
          {getFieldDecorator('lv_min_score', {
            initialValue: modalOpts.lists[modalOpts.id-1].lv_min_score,
            rules: [
              {
        
                required: true,
                message: '请填写正确的积分下限',
              },
            ],
          })(<InputNumber min={modalOpts.id == 1 ? 1 : (modalOpts.lists[modalOpts.id-2].lv_max_score+1)} max={modalOpts.id == modalOpts.lists.length ? modalOpts.lists[modalOpts.id-1].lv_max_score: modalOpts.lists[modalOpts.id].lv_min_score-1} />)}
        </FormItem>
        <FormItem label="积分上限" hasFeedback {...formItemLayout}>
          {getFieldDecorator('lv_max_score', {
            initialValue: modalOpts.lists[modalOpts.id-1].lv_max_score,
            rules: [
              {
    
                required: true,
               
                message: '请填写正确的积分上限',
              },
            ],
          })(<InputNumber min={modalOpts.id == 1 ? 1 : (modalOpts.lists[modalOpts.id-2].lv_max_score+1)} max={modalOpts.id == modalOpts.lists.length ? modalOpts.lists[modalOpts.id-1].lv_max_score: modalOpts.lists[modalOpts.id].lv_min_score-1} />)}
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
