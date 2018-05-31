import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,Switch ,Upload,Button,Icon } from 'antd'
import CropperUp from '../../cropperUP'
import styles from './List.less'
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
  childImg= '',
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const arr1 = {
    is_open_shop:'',
    is_open_invite:'',
    is_open_sign:''
  }
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        // key: item.key,
      }
      const listes = modalOpts.list
      console.log(listes)
      console.log(data)
      if(data.web_name === undefined){
        data.web_name = listes.web_name
      }
      if(data.index_title === undefined){
        data.index_title = listes.index_title
      }
      if(data.web_keyword === undefined){
        data.web_keyword = listes.web_keyword
      }
      if(data.web_descript === undefined){
        data.web_descript = listes.web_descript
      }
      if(data.bottom === undefined){
        data.bottom = listes.bottom
      }
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
    <Modal {...modalOpts} className = {styles.modalInput}>
      <Form layout="horizontal" >
          <FormItem >
                  {getFieldDecorator('web_name', {
                    
                  })(
                    <div>
                      <span>&emsp;网站名称：<input defaultValue={modalOpts.list.web_name}/></span>
                    
                    </div>
                  )}
          </FormItem>
          <FormItem  >
                  {getFieldDecorator('index_title', {
                    
                  })(
                    <div>
                      <span>&emsp;首页 title：<input defaultValue={modalOpts.list.index_title}/></span>
                    
                    </div>
                  )}
          </FormItem>
          <FormItem  >
                  {getFieldDecorator('web_keyword', {
                    
                  })(
                    <div>
                      <span>网站关键词：<input defaultValue={modalOpts.list.web_keyword}/></span>
                    
                    </div>
                  )}
          </FormItem>
          <FormItem  >
                  {getFieldDecorator('web_descript', {
                    
                  })(
                    <div>
                      <span>&emsp;网站描述：<input defaultValue ={modalOpts.list.web_descript}/></span>
                    
                    </div>
                  )}
          </FormItem>
          <FormItem  >
                  {getFieldDecorator('bottom', {
           
                  })(
                    <div>
                      <span>&emsp;网站底部：<input defaultValue ={modalOpts.list.bottom}/></span>
                    
                    </div>
  
                  )}
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
