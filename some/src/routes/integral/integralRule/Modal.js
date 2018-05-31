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


      
      if(data.one_day == undefined){
        data.one_day = listes[0].one_day
      }
      if(data.other_day == undefined){
        data.other_day = listes[0].other_day
      }
      if(!data.two_day ){
        data.two_day = listes[0].two_day
      }
      if(!data.three_day ){
        data.three_day = listes[0].three_day
      }
      if(!data.invite ){
        data.invite = Number(listes[0].invite)
      }
      if(!data.shop ){
        data.shop = Number(listes[0].shop)
      }

      if(arr1.is_open_shop == true ){
        console.log(arr1.is_open_shop)
        data.is_open_shop = 1
      }
      else if(arr1.is_open_shop === false){
        console.log(arr1.is_open_shop)
        data.is_open_shop = 0
      }
      else{
        console.log(arr1.is_open_shop)
        data.is_open_shop = listes[0].is_open_shop
      }


      if(arr1.is_open_invite == true){
        data.is_open_invite = 1
      }else if(arr1.is_open_invite === false){
        data.is_open_invite = 0
      }
      else {
        data.is_open_invite = listes[0].is_open_invite
      }


      if(arr1.is_open_sign == true){
        data.is_open_sign = 1
      }
      else if(arr1.is_open_sign === false){
        data.is_open_sign = 0
      }
      else{  
        data.is_open_sign = listes[0].is_open_sign
      }


      console.log(data)
      console.log( listes[0])
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
        <div>
          <FormItem style={{display:'inline-block'}} >
                  {getFieldDecorator('shop', {
                    
                  })(
                    <div>
                      <span>1，出售一个商品，按照这个商品的 <input placeholder={modalOpts.list[0].shop}/>  % 获取积分</span>
                    
                    </div>
                  )}
          </FormItem>

          <FormItem   {...formItemLayout } style={{display:'inline-block'}}>
          {getFieldDecorator('is_open_shop', {
            initialValue: Boolean(modalOpts.list[0].is_open_shop),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(
            <div style={{width:'120px'}}>
              <Switch style={{}} onChange={(e)=>{arr1.is_open_shop = e}} defaultChecked={Boolean(modalOpts.list[0].is_open_shop)}/>
              <span>&nbsp;是否启动</span>
            </div>
          )}
           </FormItem>
        </div>
        <div>
          <FormItem style={{display:'inline-block'}} >
                  {getFieldDecorator('one_day', {
                    
                  })(
                    <div>
                       <span>2，签到第一天送<input placeholder={modalOpts.list[0].one_day}/>积分，</span>
                    
                    </div>
                  )}
          </FormItem>
          <FormItem style={{display:'inline-block'}} >
                  {getFieldDecorator('two_day', {
                    
                  })(
                    <div>
                       <span>连续签到第二天<input placeholder={modalOpts.list[0].two_day}/>积分，</span>
                    
                    </div>
                  )}
          </FormItem>
          <FormItem style={{display:'inline-block'}} >
                  {getFieldDecorator('three_day', {
                    
                  })(
                    <div>
                       <span>第三天<input placeholder={modalOpts.list[0].three_day}/>积分，</span>
                    
                    </div>
                  )}
          </FormItem>
          <FormItem style={{display:'inline-block'}} >
                  {getFieldDecorator('other_day', {
                    
                  })(
                    <div>
                       <span>从第四天开始连续签到每次获取<input placeholder={modalOpts.list[0].other_day}/>积分</span>
                    
                    </div>
                  )}
          </FormItem>
          <FormItem   {...formItemLayout } style={{display:'inline-block'}}>
          {getFieldDecorator('is_open_sign', {
            initialValue: Boolean(modalOpts.list[0].is_open_sign),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(
            <div style={{width:'120px'}}>
                <Switch  onChange={(e)=>{arr1.is_open_sign = e}} defaultChecked={Boolean(modalOpts.list[0].is_open_sign)}/>
    
              <span>&nbsp;是否启动</span>
            </div>
          )}
           </FormItem>
        
        </div>
        <div>
          <FormItem style={{display:'inline-block'}} >
                  {getFieldDecorator('invite', {
                    
                  })(
                    <div>
                      <span>3，邀请一个好友注册成功送<input placeholder={modalOpts.list[0].invite}/>积分，邀请好友不设上限</span>
                    
                    </div>
                  )}
          </FormItem>
          <FormItem   {...formItemLayout } style={{display:'inline-block'}}>
          {getFieldDecorator('is_open_invite', {
            initialValue: Boolean(modalOpts.list[0].is_open_invite),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(
            <div style={{width:'120px'}}>
              <Switch  onChange={(e)=>{arr1.is_open_invite = e}} defaultChecked={Boolean(modalOpts.list[0].is_open_invite)}/>
              <span>&nbsp;是否启动</span>
            </div>
          )}
           </FormItem>
         
        </div>
      
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
