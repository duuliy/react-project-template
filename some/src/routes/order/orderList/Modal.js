import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,Switch ,Upload,Button,Icon ,Row, Col} from 'antd'
import CropperUp from '../../cropperUP'

const FormItem = Form.Item
const Option = Select.Option;
const priceModal = false
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
  priceModal,
  priceeOk,
  priceCancel,
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
    // priceModal:priceModal,
    // priceeOk:priceeOk,
    // priceCancel:priceCancel,

  }
  // console.log(modalProps)
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  const order_status_arr = [
    '待付款', '交易中' ,'交易完成' ,'交易失败' , '','退款中', '退款失败', '交易取消' ,'', '退款成功' ,'已删除' 
  ]
  const order_paytype_arr = [
    '微信', '支付宝' ,'余额', '银行卡'
  ]
 
  return (
    <Modal {...modalOpts} >
        <div>
          <h3>基本信息</h3>
          <ul>
            <li>
              <span>订单编号:</span>
              <span style={{marginRight:'20px',}}>{modalOpts.currentItem[0].order_no}</span>
            </li>
            <li>
              <span>订单状态:</span>
              <span style={{marginRight:'20px',}}>{order_status_arr[modalOpts.currentItem[0].order_status] }</span>
            </li>
            <li>
              <span>购买用户:</span>
              <span style={{marginRight:'20px',}}>{modalOpts.currentItem[0].user_name}</span>
            </li>
            <li>
              <span>下单时间:</span>
              <span style={{marginRight:'20px',}}>{modalOpts.currentItem[0].order_createtime}</span>
            </li>
            <li>
              <span>支付方式:</span>
              <span style={{marginRight:'20px',}}>{order_paytype_arr[modalOpts.currentItem[0].order_paytype]}</span>
            </li>
            <li>
              <span>付款时间:</span>
              <span style={{marginRight:'20px',}}>{modalOpts.currentItem[0].order_paytime}</span>
            </li>
          </ul>
          <h3>收货人信息</h3>
          <ul>
            <li>
              <span>姓名:</span>
              <span style={{marginRight:'20px',}}>{modalOpts.currentItem[0].user_id_name}</span>
            </li>
            <li>
              <span>手机:</span>
              <span style={{marginRight:'20px',}}>{modalOpts.currentItem[0].user_phone}</span>
            </li>
            <li>
              <span>qq:</span>
              <span style={{marginRight:'20px',}}>{modalOpts.currentItem[0].user_qq}</span>
            </li>
          </ul>
          <h3>商品信息</h3>
          <ul>
            <li>
              <span>商品名称:</span>
              <span style={{marginRight:'20px',}}>{modalOpts.currentItem[0].shop_title}</span>
            </li>
            <li>
              <span>商品编号:</span>
              <span style={{marginRight:'20px',}}>{modalOpts.currentItem[0].shop_no}</span>
            </li>
            <li>
              <span>价格:</span>
              <span style={{marginRight:'20px',}}>{modalOpts.currentItem[0].shop_markedprice}</span>
            </li>
            <li>
              <span>数量:</span>
              <span style={{marginRight:'20px',}}>{modalOpts.currentItem[0].order_count}</span>
            </li>
            <li>
              <span>小计:</span>
              <span style={{marginRight:'20px',}}>{modalOpts.currentItem[0].shop_markedprice * modalOpts.currentItem[0].order_count}</span>
            </li>
            
          </ul>
          <h3>费用信息</h3>
          <ul>
            <li>
              <span>商品总金额:</span>
              <span style={{marginRight:'6px',}}>￥{modalOpts.currentItem[0].order_money}</span>
              <span>- 使用优惠券:</span>
              <span style={{marginRight:'6px',}}>￥{modalOpts.currentItem[0].coupon_money}</span>
              <span>= 应付款金额:</span>
              <span >￥{modalOpts.currentItem[0].order_money - modalOpts.currentItem[0].coupon_money}</span>
            </li>           
          </ul>
        </div>
        <div style={{margin:'20px 0'}}>
          <span >可执行操作:&emsp;</span>
          {
              // order_status_arr[modalOpts.currentItem[0].order_status]
              0 == 0 ?
              <div style={{display:'inline-block'}}>
                <Button type="primary" onClick={()=>{priceModal()}}>修改订单价格</Button>
                <Modal
                  title="修改订单价格"
                  visible={modalOpts.priceModalvisible}
                  onOk={priceeOk}
                  onCancel={priceCancel}
                >
                  <input name="priceVal" id="priceVal"/>
                </Modal>
              </div>
              : order_status_arr[modalOpts.currentItem[0].order_status] == 1 ? 
              <Button type="primary">确认交易成功</Button>
              : order_status_arr[modalOpts.currentItem[0].order_status] == 5 ? 
              <Button type="primary">退款</Button>
              :  <Button type="primary">售后</Button>
           
          }
          
        </div>
        <div style={{margin:'10px 0'}}>
          <span>操作备注:&emsp;</span>
         <textarea style={{width:"60%",height:'100px',resize:'none',verticalAlign:'top'}}></textarea>
        </div>
        <Row style={{margin:'30px 0 10px'}}>
          <Col  span={4}>
            操作者
          </Col>
          <Col  span={6}>
            操作时间
          </Col>
          <Col  span={2}>
            订单状态
          </Col>
          <Col  span={2}>
            付款状态
          </Col>
          <Col  span={4}>
            发货状态
          </Col>
          <Col  span={6}>
            备注
          </Col>

        </Row>
        {
          modalOpts.currentItem[0].order_log.map((item,i)=>{
            return <Row key={i}>
            <Col  span={4}>
              {item.operation_name}
            </Col>
            <Col  span={6}>
            {item.operation_time}
            </Col>
            <Col  span={2}>
            {order_status_arr[item.order_status]}
            </Col>
            <Col  span={2}>
            {order_paytype_arr[item.pay_status]}
            </Col>
            <Col  span={4}>
            {/* 停用  发货状态 */}
            {/* {item.fh_status} */}
            </Col>
            <Col  span={6}>
            {item.content}
            </Col>
  
          </Row>
          })
        }
        
      
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  priceeOk: PropTypes.func,
  priceCancel: PropTypes.func,
  priceModal: PropTypes.func,
}

export default Form.create()(modal)
