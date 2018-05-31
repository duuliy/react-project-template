import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,Switch ,Upload,Button,Icon } from 'antd'
import CropperUp from '../../cropperUP'
import { request, config } from 'utils'
const { api } = config
const { uploadfile,imgSrc } = api


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
  agreeModal,
  agreeOk,
  agreeCancel,
  unagreeModal,
  unagreeOk,
  unagreeCancel,
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
  // const  fatherImges = (e)=>{
  //   console.log(e)
  // }
  return (
    <Modal {...modalOpts} >
      <div>
          <h3>基本信息</h3>
          <div>
            <span>当前头像:</span>
            <div style={{background:'url('+imgSrc+modalOpts.currentItem[0].user_img_url+') no-repeat',backgroundSize:'cover',width:'90%',height:'100px'}}></div>
            {/* <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].user_img_url}</span> */}
          </div>
          <div>
            <span>昵称:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].user_name}</span>
          </div>
          <div>
            <span>真实姓名:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].user_real_name}</span>
          </div>
          <div>
            <span>性别:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].user_sex}</span>
          </div>
          <div>
            <span>生日:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].user_birthday}</span>
          </div>
          <div>
            <span>居住地:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].user_domicile}</span>
          </div>
          <div>
            <span>家乡:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].user_hometown}</span>
          </div>
          <div>
            <span>手机:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].user_phone_num}</span>
          </div>
          <div>
            <span>qq:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].user_qq}</span>
          </div>

          <h3>安全认证</h3>
          <div>
            <span>身份认证:&emsp;</span>
            {
              // console.log(modalOpts.currentItem[0].security_certification.user_authentication)
               modalOpts.currentItem[0].security_certification.user_authentication == 1 ? 
               <Icon type="check-square" style={{ fontSize: 16, color: 'rgb(53, 251, 152)' }} /> : ''
            }
            {/* // <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].security_certification.user_authentication}</span> */}
          </div>
          <div>
            <span>登录密码:&emsp;</span>
            {
               modalOpts.currentItem[0].security_certification.pass == 1 ? 
              <Icon type="check-square" style={{ fontSize: 16, color: 'rgb(53, 251, 152)' }} /> : ''
            }
            {/* <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].security_certification.pass}</span> */}
          </div>
          <div>
            <span>绑定手机:&emsp;</span>
            {
               modalOpts.currentItem[0].security_certification.user_phone_num == 1 ? 
              <Icon type="check-square" style={{ fontSize: 16, color: 'rgb(53, 251, 152)' }} /> : ''
            }
            {/* <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].security_certification.user_phone_num	}</span> */}
          </div>
          <div>
            <span>支付密码:&emsp;</span>
            {
               modalOpts.currentItem[0].security_certification.paypass == 1 ? 
              <Icon type="check-square" style={{ fontSize: 16, color: 'rgb(53, 251, 152)' }} /> : ''
            }
            {/* <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].security_certification.paypass}</span> */}
          </div>

          <h3>账户信息</h3>
          <div>
            <span>会员等级:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].user_integral_lv_name}</span>
          </div>
          <div>
            <span>账户余额:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].user_money}</span>
          </div>
          <div>
            <span>消费积分:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].user_integral}</span>
          </div>
          <div>
            <span>等级积分:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].user_integral_lv}</span>
          </div>

          <h3>账户信息</h3>
            <div>
              <span>姓名:</span>
              <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].authentication_info ? modalOpts.currentItem[0].authentication_info.authentication_real_name : ''}</span>
            </div>
            <div>
              <span>身份证号码:</span>
              <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].authentication_info ? modalOpts.currentItem[0].authentication_info.authentication_idcard_num : ''}</span>
            </div>
            <div style={{background:'url('+imgSrc+(modalOpts.currentItem[0].authentication_info ? modalOpts.currentItem[0].authentication_info.authentication_idcard_facade_url :'') +') no-repeat',backgroundSize:'cover',width:'90%',height:'100px'}}></div>
            <div style={{background:'url('+imgSrc+(modalOpts.currentItem[0].authentication_info ? modalOpts.currentItem[0].authentication_info.authentication_idcard_back_url : '') +') no-repeat',backgroundSize:'cover',width:'90%',height:'100px'}}></div>
            
            
            {/* {   
                modalOpts.authentication_status == 0 ? 
                
                  <div style={{textAlign:'center'}}>
                    <Button type="primary" style={{marginRight:'30px'}} onClick={()=>{agreeModal()}}>通过</Button>
                    <Button onClick={()=>{unagreeModal()}}>不通过</Button>
                  </div>
                
                : ''
            } */}
             
           
            <Modal
                  title="提示"
                  visible={modalOpts.agreeVisible}
                  onOk={agreeOk}
                  onCancel={agreeCancel}
                >
                  <span>是否确认信息无误，需要审核通过？</span>
           </Modal>
            <Modal
                  title="不通过理由"
                  visible={modalOpts.unagreeVisible}
                  onOk={unagreeOk}
                  onCancel={unagreeCancel}
                >
                  <textarea id="unAgree" style={{width:'100%',resize:'none',height:'100px',padding:'5px'}}></textarea>
           </Modal>
         </div>

    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  agreeOk: PropTypes.func,
  agreeCancel: PropTypes.func,
  agreeModal: PropTypes.func,
  unagreeOk: PropTypes.func,
  unagreeCancel: PropTypes.func,
  unagreeModal: PropTypes.func,
}

export default Form.create()(modal)
