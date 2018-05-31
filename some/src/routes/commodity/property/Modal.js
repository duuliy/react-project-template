import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,Switch ,Upload,Button,Icon,Dropdown,Menu } from 'antd'
import CropperUp from './cropperUP'

import {config } from 'utils'
const { api } = config
const {imgSrc}=api

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
const   childImg = {
  a :''
}
const modal = ({
  item = {},
  onOk,
  list,
  ldsjList,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,//获取控件的值
  },
  ...modalProps
}) => {
// const childImg={
//   b:''
// }
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        property_id: item.property_id,
        property_img:childImg.a
      }
      // data.address = data.address.join(' ')
      onOk(data)
    })
  }
 
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  const children = [<Option key={0}>{'商品信息'}</Option>,
  <Option key={1}>{'基本信息'}</Option>];


    const options=[{value:'0',label:"顶级"}]
    const dataList=(options,listData)=>{
      for(let i=0;i<listData.length;i++){
        if(listData[i].parentdata!=undefined){
          if(listData[i].childarray!=undefined){
            options.push({
              value:listData[i].parentdata.property_id,
              label:listData[i].parentdata.property_name,
              children:[]
          })
            dataList(options[i+1].children,listData[i].childarray)
          }else{
            options.push({
              value:listData[i].parentdata.property_id,
              label:listData[i].parentdata.property_name,
          })
          }
        }else{
          if(listData[i].childarray!=undefined){
            options.push({
              value:listData[i].property_id,
              label:listData[i].property_name,
              children:[]
          })
            dataList(options[i+1].children,listData[i].childarray)
          }else{
            options.push({
              value:listData[i].property_id,
              label:listData[i].property_name,
          })
          }
        }
  
      }
    }
    if(list.length!=0){
      dataList(options,list)
    }

    const onChange=()=>{

    }
    const SelectOption=[<Option value={'0'} key={'0'}>{'顶级'}</Option >]
    for(let i=0;i<ldsjList.length;i++){
      SelectOption.push(
        <Option value={ldsjList[i].property_id} key={ldsjList[i].property_id}>{ldsjList[i].property_name}</Option >
      )
    }

    const handleChange=()=>{

    }

    function displayRender(label) {
      return label[label.length - 1];
    }
  return (
    <Modal {...modalOpts} >
      <Form layout="horizontal">
        <FormItem label="属性名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('property_name', {
            initialValue: item.property_name,
            rules: [
              {
                required: true,
                message: '请填写属性名称',
              },
            ],
          })(<Input />)}
        </FormItem>
        {/* <FormItem
          {...formItemLayout}
          label="属性logo"
          extra=""
        >
          {getFieldDecorator('property_img', {
            valuePropName: 'fileList',
            initialValue:  item.property_img,
          })(
      
              <Upload name="logo"  listType="picture">
                <Button>
                  <Icon type="upload" /> 点击更换logo
                </Button>
              </Upload>
       
          )}
        </FormItem> */}
        <FormItem
          {...formItemLayout}
          label="属性logo"
          // extra=""
        >
          {getFieldDecorator('property_img', {
            valuePropName: 'fileList',
            initialValue:  item.property_img,
          })(
              <CropperUp imgSrc = {item.property_img} fatherImg={(e)=>{childImg.a = e;}}/>
          )}
        </FormItem>
        <FormItem label="属性排序" {...formItemLayout}>
          {getFieldDecorator('property_sort', {
            initialValue: item.property_sort,
            rules: [
              {
                required: true,
                message: '请填写属性排序',
              },
            ],
          })(<Input  />)}
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator('property_status', {
            initialValue: Boolean(item.property_status),
            rules: [
              {
                required: true,
                type:'boolean'
              },
            ],
          })(<Switch  defaultChecked={Boolean(item.property_status)}/>)}
           </FormItem>
        <FormItem label="分类属性上级id" {...formItemLayout}>
          {getFieldDecorator('property_pid', {
            // initialValue: item.property_pid,
            rules: [
              {
                required: true,
                message: '请选择分类属性上级ID',
              },
            ],
          })(<Cascader changeOnSelect  expandTrigger="hover" options={options} onChange={onChange} placeholder="请选择" />)}
        </FormItem>
        <FormItem label="联动上级" {...formItemLayout}>
          {getFieldDecorator('ldsj_id', {
            initialValue:item.ldsj_id,
            rules: [
              {
                required: true,
                message: '请选择联动上级',
              },
            ],
          })(<Select onChange={handleChange}>
            {SelectOption}
          </Select>)}
        </FormItem>
        <FormItem label="是否有下级联动" {...formItemLayout}>
          {getFieldDecorator('is_xjld', {
            initialValue: Boolean(item.is_xjld),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(<Switch defaultChecked={Boolean(item.is_xjld)} />)}
        </FormItem>
        <FormItem label="是否展示到首页" {...formItemLayout}>
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
        <FormItem label="是否展示在搜索栏" {...formItemLayout}>
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
        <FormItem label="蹲号发布是否必选" {...formItemLayout}>
          {getFieldDecorator('is_dhmust', {
            initialValue: Boolean(item.is_dhmust),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(<Switch defaultChecked={Boolean(item.is_dhmust)}/>)}
        </FormItem>
        <FormItem label="商品发布是否必选" {...formItemLayout}>
          {getFieldDecorator('is_fbmust', {
            initialValue: Boolean(item.is_fbmust),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(<Switch defaultChecked={Boolean(item.is_fbmust)} />)}
        </FormItem>
        <FormItem label="是否拼接为商品标题" {...formItemLayout}>
          {getFieldDecorator('is_title', {
            initialValue: Boolean(item.is_title),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(<Switch defaultChecked={Boolean(item.is_title)} />)}
        </FormItem>
        <FormItem label="是否展示在横幅" {...formItemLayout}>
          {getFieldDecorator('is_hengfu', {
            initialValue: Boolean(item.is_hengfu),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(<Switch defaultChecked={Boolean(item.is_hengfu)} />)}
        </FormItem>
        <FormItem label="是否展示在列表页" {...formItemLayout}>
          {getFieldDecorator('is_list', {
            initialValue: Boolean(item.is_list),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(<Switch defaultChecked={Boolean(item.is_list)} />)}
        </FormItem>
        <FormItem label="商品发布时展示位置" {...formItemLayout}>
          {getFieldDecorator('property_zswz', {
            initialValue:item.property_zswz,
            rules: [
              {
                // required: true,
                message:"请选择展示位置"
              },
            ],
          })(<Select placeholder="请选择展示位置" style={{ width: 120 }}>
          {children}
        </Select>)}
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
