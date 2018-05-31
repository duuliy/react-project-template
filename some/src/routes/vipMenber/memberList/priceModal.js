import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col,Input, Modal,Select ,Upload,Button,Icon,Tabs } from 'antd'
import CropperUp from '../../cropperUP'
import { request, config } from 'utils'
const { api } = config
const { uploadfile,imgSrc } = api

const TabPane = Tabs.TabPane;


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
  addUserPrice,
  agreeVisibleOk,
  unagreeVisible,
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
  const formLists = {
    zijin:'增加',
    dengji:'增加',
    xiaofei:'增加',
  }
  return (
    <Modal {...modalOpts} >
        <div>
            <div>
                <span>所有账户</span>
                <Button type="primary" style={{float:'right'}} onClick={()=>{addUserPrice(...modalOpts)}}>调整会员账户</Button>
            </div>
            <Modal
              title="调整会员账户"
              width='800px'
              visible={modalOpts.agreeVisible}
              onOk={()=>{agreeVisibleOk(formLists,getFieldsValue(),modalOpts.user_id)}}
              onCancel={unagreeVisible}
            >
          <Form>
              <div style={{width:'100%',margin:'10px 0'}}>
                  <span>当前会员：{modalOpts.user_name}</span>
              </div>
              <FormItem>
              {getFieldDecorator('resion', {
                
              })(
                <div style={{width:'100%',margin:'10px 0'}}>
                  账户变动原因：<input />
                </div>
              )}
              </FormItem>
              <FormItem>
              {getFieldDecorator('zijin', {
                
              })(
                  <div style={{width:'100%',margin:'20px 0'}}>
                    <span>可用资金账户&emsp;</span>
                    <Select defaultValue="增加" style={{ width: 120 }} onChange={(e)=>{formLists.zijin = e}}>
                      <Option value="增加">增加</Option>
                      <Option value="减少">减少</Option>
                    </Select>
                    <input style={{margin:'0 20px'}}/>
                    <span>&emsp;当前值：￥{modalOpts.user_money}</span>
                  </div>
              )}
              </FormItem>
              <FormItem>
              {getFieldDecorator('dengji', {
                
              })(
                <div style={{width:'100%',margin:'20px 0'}}>
                <span>等级积分账户&emsp;</span>
                <Select defaultValue="增加" style={{ width: 120 }} onChange={(e)=>{formLists.dengji = e}}>
                  <Option value="增加">增加</Option>
                  <Option value="减少">减少</Option>
                </Select>
                <input style={{margin:'0 20px'}}/>
                <span>&emsp;当前值：￥{modalOpts.user_integral_lv}</span>
              </div>
              )}
              </FormItem>
              <FormItem>
              {getFieldDecorator('xiaofei', {
                
              })(
                <div style={{width:'100%',margin:'20px 0'}}>
                <span>消费积分账户&emsp;</span>
                <Select defaultValue="增加" style={{ width: 120 }} onChange={(e)=>{formLists.xiaofei = e}}>
                  <Option value="增加">增加</Option>
                  <Option value="减少">减少</Option>
                </Select>
                <input style={{margin:'0 20px'}} />
                <span>&emsp;当前值：￥{modalOpts.user_integral}</span>
              </div>
              )}
              </FormItem>
             
             
            </Form>
            </Modal>
            <div style={{width:'100%',background:'#e0e0e0',padding:'5px',margin:'30px 0'}}>
                <span>当前会员：{modalOpts.user_name}&emsp;可用资金账户：￥{modalOpts.user_money}&emsp;等级积分账户：{modalOpts.user_integral_lv}&emsp;消费积分账户：{modalOpts.user_integral}</span>
            </div>
            <Tabs defaultActiveKey="1" onChange={()=>{}}>
                <TabPane tab="积分变动明细" key="1">
                <Row>
                    <Col span={6}>账户变动时间</Col>
                    <Col span={6}>等级积分账户</Col>
                    <Col span={6}>消费积分账户</Col>
                    <Col span={6}>账户变动原因</Col>
                </Row>
                {
                    // console.log(modalOpts.jifen.data.list)
                    modalOpts.jifen.data.list ?  modalOpts.jifen.data.list.map((item,i)=>{
                      return <Row key={i}>
                          <Col span={6}>{item.updated_at}</Col>
                          <Col span={6}>{item.integral_lv_num}</Col>
                          <Col span={6}>{item.integral_num}</Col>
                          <Col span={6}>{item.integral_text}</Col>
                      </Row>
                    }) : ''
                }
                </TabPane>
                <TabPane tab="可用资金账户" key="2">
                <Row>
                    <Col span={8}>账户变动时间</Col>
                    <Col span={8}>可用资金账户</Col>
                    <Col span={8}>账户变动原因</Col>
                </Row>
                {
                  // console.log(modalOpts.zijin.data)
                    modalOpts.zijin.data ? modalOpts.zijin.data.list.map((item,i)=>{
                      return <Row key={i}>
                          <Col span={6}>{item.updated_at}</Col>
                          <Col span={6}>{item.capitalflow_real_money}</Col>
                          <Col span={6}>{item.integral_text}</Col>
                      </Row>
                    }) :''
                }
                </TabPane>
            </Tabs>
        </div>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  addUserPrice: PropTypes.func,
  agreeVisibleOk: PropTypes.func,
  unagreeVisible: PropTypes.func,

}

export default Form.create()(modal)
