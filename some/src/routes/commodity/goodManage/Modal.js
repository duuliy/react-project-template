import React from 'react'
import PropTypes from 'prop-types'
import { Form, Checkbox ,Input, InputNumber, Radio, Modal, Cascader,Select,Switch ,Upload,Button,Icon  } from 'antd'
import city from '../../../utils/city'
import CropperUp from '../../cropperUP'
import PicturesWall from '../../PicturesWall'
import Lists from 'components/customTag'

const FormItem = Form.Item
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;


const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 6,
  },
}
const formItemLayout2 = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 3,
  },
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps,
  ...sortManage
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
      console.log(data)
      // data.address = data.address.join(' ')
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

  return (
    <Modal {...modalOpts} >
      <Form layout="horizontal">
        <FormItem label="商品标题"  {...formItemLayout}>
          {getFieldDecorator('shop_title', {
            initialValue: item.shop_title,
            rules: [
              {
                required: true,
                message: '请填写商品标题',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="单价"  {...formItemLayout}>
          {getFieldDecorator('shop_markedprice', {
            initialValue: item.shop_markedprice,
            rules: [
              {
                required: true,
                message: '请填写单价',
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label="商品属性"
          >
            {getFieldDecorator('propertyids', {
              // initialValue:sortManage.sortManage[0].shoptype_name  ? sortManage.sortManage[0].shoptype_name : '请选择',
              rules: [
                { 
                  // required: true, 
                  message: '请选择商品属性', 
                  type: 'array' 
                },
              ],
            })(
              <Select mode="multiple" placeholder="请选择商品属性"  onChange={()=>{
                function handleChange(value) {
                console.log(`selected ${value}`);
              }}}>
               {
                 sortManage.sortManage.map((item,i)=>{
                   return <Option key={i} value={item.shoptype_id}>{item.shoptype_name}</Option>
                 })
               }
              </Select>
            )}
        </FormItem>


        <FormItem label="商品有效期(月)"  {...formItemLayout2}>
          {getFieldDecorator('shop_validity', {
            initialValue: item.shop_validity,
            rules: [
              {
                required: true,
                message: '请填写商品有效期',
              },
            ],
          })(<Input /> )}
        </FormItem>
        <FormItem label="商品编号"  {...formItemLayout2}>
          {getFieldDecorator('shop_no', {
            initialValue: item.shop_no,
            rules: [
              {
                required: true,
                message: '请填写商品编号',
              },
            ],
          })(<Input /> )}
        </FormItem>
        <FormItem label="发布时间"  {...formItemLayout2}>
          {getFieldDecorator('shop_createtime', {
            initialValue: item.shop_createtime,
            rules: [
              {
                required: true,
                message: '请填写发布时间',
              },
            ],
          })(<Input /> )}
        </FormItem>
        <FormItem label="数量"  {...formItemLayout2}>
          {getFieldDecorator('shop_count', {
            initialValue: item.shop_count,
            rules: [
              {
                required: true,
                message: '请填写数量',
              },
            ],
          })(<Input /> )}
        </FormItem>


        <FormItem
            {...formItemLayout}
            label="发布主体"
          >
            {getFieldDecorator('propertyids', {
              // initialValue:item.propertyids[],
              rules: [
                { 
                  // required: true, 
                  message: '请选择发布主体', 
                  type: 'array' 
                },
              ],
            })(
              <Select mode="multiple" placeholder="请选择发布主体" onChange={(e)=>{console.log(e)}}>
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
            )}
        </FormItem>
        <FormItem label="商品标签"  {...formItemLayout2}>
          {getFieldDecorator('shop_tag', {
            initialValue: item.shop_tag,
          })(
            <Checkbox.Group style={{ width: '100%' }} onChange={()=>{}}>
             
                <Checkbox value="A">A</Checkbox>
               <Checkbox value="B">B</Checkbox>
                <Checkbox value="C">C</Checkbox>
         
            </Checkbox.Group>
           )}
        </FormItem>
        <FormItem label="自定义标签"  {...formItemLayout}>
          {getFieldDecorator('custom_tag', {
            initialValue: item.custom_tag,
          })(
            <div>
              {/* <input />
              <Button type="primary">提交</Button> */}
              {
                <Lists/>
              }
            </div>
           )}
        </FormItem>





       
        商品操作
        <FormItem label="上架"  {...formItemLayout}>
          {getFieldDecorator('shop_status', {
            initialValue: Boolean(item.shop_status),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(<Switch />)}
        </FormItem>
        <FormItem label="是否加入上榜"  {...formItemLayout}>
          {getFieldDecorator('is_hot', {
            initialValue: Boolean(item.is_hot),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(<Switch />)}
        </FormItem>
        <FormItem label="是否加入特色推荐"  {...formItemLayout}>
          {getFieldDecorator('is_tese', {
            initialValue: Boolean(item.is_tese),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(<Switch />)}
        </FormItem>
        <FormItem label="排序"  {...formItemLayout2}>
          {getFieldDecorator('shop_sort', {
            initialValue: item.shop_sort,
            rules: [
              {
                // required: true,
                message: '请填写排序',
              },
            ],
          })(<Input /> )}
        </FormItem>
        商品相册
        <FormItem
          {...formItemLayout}
          label="*封面图"
          extra=""
        >
          {getFieldDecorator('shoptype_img', {
            valuePropName: 'fileList',
            initialValue:  item.shoptype_img,
          })(

              <CropperUp imgSrc = {item.shoptype_img} fatherImg={(e)=>{childImg = e;console.log(e)}}/>
              // <Upload name="logo"  listType="picture">
              //   <Button>
              //     <Icon type="upload" /> 点击更换logo
              //   </Button>
              // </Upload>
       
          )}
        </FormItem>
        <PicturesWall/>
        <div></div>
        商品信息
        <FormItem label="商家名称"  {...formItemLayout2}>
          {getFieldDecorator('shop_count', {
            initialValue: item.shop_count,
          })(<Input /> )}
        </FormItem>
        <FormItem label="联系电话"  {...formItemLayout2}>
          {getFieldDecorator('user_phone', {
            initialValue: item.user_phone,
 
          })(<Input /> )}
        </FormItem>
        <FormItem label="联系QQ"  {...formItemLayout2}>
          {getFieldDecorator('user_qq', {
            initialValue: item.user_qq,
      
          })(<Input /> )}
        </FormItem>
        <FormItem label="商家寄语"  {...formItemLayout}>
          {getFieldDecorator('shop_message', {
            initialValue: item.shop_message,
      
          })(<textarea style={{resize:'none'}}/> )}
        </FormItem>
        账号资料
        <FormItem label="游戏账号"  {...formItemLayout2}>
          {getFieldDecorator('game_account', {
            initialValue: item.game_account,
      
          })(<Input /> )}
        </FormItem>
        <FormItem label="游戏密码"  {...formItemLayout2}>
          {getFieldDecorator('game_password', {
            initialValue: item.game_password,
      
          })(<Input /> )}
        </FormItem>

        <FormItem label="是否转阵营CD"  {...formItemLayout}>
          {getFieldDecorator('is_zycd', {
            initialValue: item.is_zycd,
          })(
            <RadioGroup onChange={(e)=>{console.log(e)}} >
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
            </RadioGroup>
          )}
           </FormItem>
        <FormItem label="是否直接重置身份证"  {...formItemLayout}>
          {getFieldDecorator('is_czsf', {
            initialValue: item.is_czsf,
          })(
            <RadioGroup onChange={(e)=>{console.log(e)}} >
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="有无转服CD"  {...formItemLayout}>
          {getFieldDecorator('is_zfcd', {
            initialValue: item.is_zfcd,
          })(
            <RadioGroup onChange={(e)=>{console.log(e)}} >
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="是否保留老账号"  {...formItemLayout}>
          {getFieldDecorator('is_blzh', {
            initialValue: item.is_blzh,
          })(
            <RadioGroup onChange={(e)=>{console.log(e)}} >
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="是否支持3+7打款"  {...formItemLayout}>
          {getFieldDecorator('is_dk', {
            initialValue: item.is_dk,
          })(
            <RadioGroup onChange={(e)=>{console.log(e)}} >
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="是否可以议价"  {...formItemLayout}>
          {getFieldDecorator('is_yj', {
            initialValue: item.is_yj,
          })(
            <RadioGroup onChange={(e)=>{console.log(e)}} >
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
            </RadioGroup>
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
