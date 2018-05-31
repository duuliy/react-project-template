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
      console.log(data)
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
      <Form layout="horizontal">
        <FormItem label="分类名称"  {...formItemLayout}>
          {getFieldDecorator('shoptype_name', {
            initialValue: item.shoptype_name,
            rules: [
              {
                required: true,
                message: '请填写分类名称',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="分类logo"
          extra=""
        >
          {getFieldDecorator('shoptype_img', {
            valuePropName: 'fileList',
            initialValue:  item.shoptype_img,
          })(

              <CropperUp imgSrc = {item.shoptype_img} fatherImg={(e)=>{childImg = e;console.log(e)}}/>

       
          )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label="商品属性"
          >
            {getFieldDecorator('propertyids', {
              initialValue:item.propertyids  ? item.propertyids.split(',') : '请选择',
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
                <Option  value="red">Red</Option>
                <Option  value="green">Green</Option>
                <Option  value="blue">Blue</Option>
              </Select>
            )}
        </FormItem>

        <FormItem label="分类排序"  {...formItemLayout}>
          {getFieldDecorator('shoptype_sort', {
            initialValue: item.shoptype_sort ? String(item.shoptype_sort ) : '0.00',
            rules: [
              {
                // required: true,
              },
            ],
          })(<Input  />)}
        </FormItem>

        <FormItem label="手续费"  {...formItemLayout}>
          {getFieldDecorator('shoptype_sxf', {
            initialValue: item.shoptype_sxf,
            rules: [
              {
                // required: true,
 
              },
            ],
          })(<Input  />)}
        </FormItem>
        <FormItem label="状态"  {...formItemLayout}>
          {getFieldDecorator('shoptype_status', {
            initialValue: Boolean(item.shoptype_status),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(<Switch  defaultChecked={Boolean(item.shoptype_status)}/>)}
           </FormItem>
        <FormItem label="是否展示在搜索栏"  {...formItemLayout}>
          {getFieldDecorator('is_search', {
            initialValue: Boolean(item.is_search),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(<Switch  defaultChecked={Boolean(item.is_search)}/>)}
           </FormItem>
        <FormItem label="是否展示到首页上榜"  {...formItemLayout}>
          {getFieldDecorator('is_index', {
            initialValue: Boolean(item.is_index),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(<Switch  defaultChecked={Boolean(item.is_index)}/>)}
           </FormItem>
        <FormItem label="是否展示到首页最新"  {...formItemLayout}>
          {getFieldDecorator('is_new', {
            initialValue: Boolean(item.is_new),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(<Switch defaultChecked={Boolean(item.is_new)}/>)}
        </FormItem>
        <FormItem label="是否展示到首页横幅"  {...formItemLayout}>
          {getFieldDecorator('is_hengfu', {
            initialValue: Boolean(item.is_hengfu),
            rules: [
              {
                // required: true,
                // type:'string'
                type:'boolean'
              },
            ],
          })(<Switch defaultChecked={Boolean(item.is_hengfu)}/>)}
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
