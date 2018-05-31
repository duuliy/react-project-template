import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,Switch ,Upload,Button,Icon,Row, Col  } from 'antd'
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
  payMoney,
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




  const operation_status_arr = [
    '待审核 ','审核通过' ,'审核不通过' ,'已打款'
]
  return (
    <Modal {...modalOpts} >
      <div>
          <h3>基本信息</h3>
 
          <div>
            <span>会员名:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].user_name}</span>
          </div>
          <div>
            <span>提现金额:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].capitalflow_money}</span>
          </div>
          <div>
            <span>提现编号:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].capitalflow_no}</span>
          </div>
          <div>
            <span>提现时间:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].capitalflow_time}</span>
          </div>
          <div>
            <span>提现账号:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].capitalflow_account}</span>
          </div>
          <div>
            <span>提现状态:</span>
            <span style={{margin:'10px 0',}}>{operation_status_arr[modalOpts.currentItem[0].operation_status-1]}</span>
          </div>
          <div>
            <span>处理时间:</span>
            <span style={{margin:'10px 0',}}>{modalOpts.currentItem[0].operation_time}</span>
          </div>

          


          {
            modalOpts.currentItem[0].operation_status == 1 ? <div>
              <h3>备注</h3>
            <div>
                <textarea id="isAgree" style={{width:'100%',height:'100px',resize:'none'}}></textarea>
              </div>
              <div>
                <Button onClick={()=>{agreeOk(modalOpts.currentItem[0].capitalflow_no)}} style={{margin:'20px'}} type="primary">通过</Button>
                <Button onClick={()=>{unagreeOk(modalOpts.currentItem[0].capitalflow_no)}} style={{margin:'20px'}} type="primary">不通过</Button>
              </div>
            </div>
            : modalOpts.currentItem[0].operation_status == 2 ? <div>
              <h3>备注</h3>
              <div>
              <div>
                <textarea id="payMoney" style={{width:'100%',height:'100px',resize:'none'}}></textarea>
              </div>
                <Button onClick={()=>{payMoney(modalOpts.currentItem[0].capitalflow_no)}} style={{margin:'20px'}} type="primary">打款</Button>
              </div>
            </div>
            :''
          }
          




        <Row style={{margin:'30px 0 10px'}}>
          <Col  span={6}>
            操作者
          </Col>
          <Col  span={6}>
            操作时间
          </Col>
          <Col  span={6}>
            结算状态
          </Col>
          <Col  span={6}>
            备注
          </Col>

        </Row>
        {
          modalOpts.currentItem[0].capitalflow_log.map((item,i)=>{
            return <Row key={i}>
            <Col  span={6}>
              {item.operation_name}
            </Col>
          
            <Col  span={6}>
            {item.capitalflow_log_time}
            </Col>
            <Col  span={6}>
            {operation_status_arr[item.capitalflow_log_status-1]}
            </Col>
            <Col  span={6}>
            {item.capitalflow_log_remark}
            </Col>
     
          </Row>
             })
            }

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
  payMoney: PropTypes.func,
  unagreeCancel: PropTypes.func,
  unagreeModal: PropTypes.func,
}

export default Form.create()(modal)
