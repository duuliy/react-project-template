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
      <div>
          <div>
            <span>方案名称:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].squat_title}</span>
          </div>
          {
            modalOpts.currentItem[0].squat_status == 3 ? 
            <div>
                <span>方案编号:</span>
                <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].squat_title}</span>
            </div>
            : ''
          }
         
          <div>
            <span>发布人:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].user_name}</span>
          </div>
          <div>
            <span>发布时间:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].squat_createtime}</span>
          </div>
          <div>
            <span>商品分类:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].shoptype_name}</span>
          </div>
          <div>
            <span>方案需求:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].squat_demand}</span>
          </div>
          <div>
            <span>自定义:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].squat_custom}</span>
          </div>
          <div>
            <span>数量:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].squat_count}</span>
          </div>
          <div>
            <span>发布有效期:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].squat_time}</span>
          </div>
          <div>
            <span>联系电话:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].user_phone}</span>
          </div>
          <div>
            <span>联系QQ:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].user_qq}</span>
          </div>

          
             {   
                modalOpts.currentItem[0].squat_status == 0 ? 
                
                  <div style={{textAlign:'center'}}>
                    <Button type="primary" style={{marginRight:'30px'}} onClick={()=>{agreeModal()}}>通过</Button>
                    <Button onClick={()=>{unagreeModal()}}>不通过</Button>
                  </div>
                
                : ''
            } 
             
           
             <Modal
                  title="提示"
                  visible={modalOpts.agreeVisible}
                  onOk={()=>{agreeOk(modalOpts.currentItem[0].squat_id)}}
                  onCancel={agreeCancel}
                >
                  <span>是否确认信息无误，需要审核通过？</span>
           </Modal>
            <Modal
                  title="不通过理由"
                  visible={modalOpts.unagreeVisible}
                  onOk={()=>{unagreeOk(modalOpts.currentItem[0].squat_id)}}
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
