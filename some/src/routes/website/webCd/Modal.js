import React from 'react'
import PropTypes from 'prop-types'
import { config,request } from 'utils'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,Switch ,Upload,Button,Icon } from 'antd'
import style from './modal.css'
import AddPic from './addPic'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const FormItem = Form.Item
const Option = Select.Option;
const { api } = config
const { imgSrc,uploadfile } = api

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
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,//获取控件的值
  },
  ...modalProps,
  previewVisible,
  previewImage,
  openSmallModal,
  fileListOne,
  closeSmallModal,
  fileListChange,
  fileLoading,
  shishi,
  handleChange,
  fileRemove
}) => {

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
        adimg:fileListOne[0].name
      }
      // data.address = data.address.join(' ')
      onOk(data)
    })
  }
 
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  const handChange=(fileList)=>{
    return

  }
  const beforeUpload=(file)=>{

  }



  const handleCancel = () =>{
    closeSmallModal()
  }

  const handlePreview = (file) => {
    openSmallModal(file)
  }

  // const uploadShi=()=>{
    if(shishi.file!=undefined){
      request({
        url:uploadfile,
        method:"post",
        data:shishi
      }).then((e)=>{
        if(e.status==1){
          handleChange(e)
        }else{
          throw e
        }
      }).catch((err)=>{+
        console.log("报错打印")
        console.log(err)
      })
    }
  // }

  const picData=(file)=>{
    let reader = new FileReader();  
    reader.readAsDataURL(file.file);
    
    reader.onloadend=function(){
      fileLoading(reader.result,file.file.uid)
      // uploadShi()
      return
    }


    
  
    // return fileListOne.file.thumbUrl
  }
  const handleRemove=()=>{
    fileRemove()
  }




  return (
    <Modal {...modalOpts} >
      <Form layout="horizontal">
        <FormItem label="广告名称" {...formItemLayout}>
          {getFieldDecorator('adname', {
            initialValue: item.adname,
            rules: [
              {
                required: true,
                message: '请填写广告名称',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="广告链接" {...formItemLayout}>
          {getFieldDecorator('adurl', {
            initialValue: item.adurl,
            rules: [
              {
                required: true,
                message: '请填写链接',
              },
            ],
          })(<Input  />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="广告图片"
          extra=""
        >
          {getFieldDecorator('url', {
            valuePropName: 'filelist',
          })( 
          <div className="clearfix">
          <Upload
            name="logo"
            listType="picture-card"
            fileList={fileListOne}
            customRequest={picData}
            onPreview={handlePreview}
            onRemove={handleRemove}
            // onChange={handleChange}
          >
            {fileListOne.length >= 1 ? null : <AddPic/>}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
          )}
        </FormItem>
        <FormItem label="展示端口" {...formItemLayout}>
          {getFieldDecorator('adport', {
            initialValue: item.adport,
            rules: [
              {
                required: true,
                message: '请选择展示端口',
            }
            ],
          })(<RadioGroup>
              <RadioButton value="0">pc</RadioButton>
              <RadioButton value="1">mc</RadioButton>
              </RadioGroup>)}
        </FormItem>
        {/* <FormItem label="显示页面" {...formItemLayout}>
          {getFieldDecorator('adpage', {
            initialValue: item.adpage,
            rules: [
              {
                required: true,
                message: '请选择显示页面',
            }
            ],
          })(<RadioGroup>
              <RadioButton value="0">pc首页</RadioButton>
              <RadioButton value="1">pc帮助中心</RadioButton>
              </RadioGroup>)}
        </FormItem> */}
        <FormItem label="广告展示位置" {...formItemLayout}>
          {getFieldDecorator('adwz', {
            initialValue: item.adwz,
            rules: [
              {
                required: true,
                message: '请选择广告展示位置',
            }
            ],
          })(<Select placeholder="请选择广告位置" style={{ width: 120 }}>
          <Option value="1">顶部</Option>
          <Option value="2">轮播图</Option>
          <Option value="3">左1广告</Option>
          <Option value="4">左2广告</Option>
          <Option value="5">页中广告</Option>
          <Option value="6">页内广告</Option>
          <Option value="7">帮助中心</Option>
        </Select>)}
        </FormItem>
        <FormItem label="是否启用" {...formItemLayout}>
          {getFieldDecorator('adstatus', {
            initialValue: Boolean(item.adstatus),
            rules: [
              {
                // required: true,
                type:'boolean'
              },
            ],
          })(<Switch defaultChecked={Boolean(item.adstatus)} />)}
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
  // previewImage:PropTypes.string,
  openSmallModal:PropTypes.func,
  fileListOne:PropTypes.array,
  closeSmallModal:PropTypes.func,
  fileListChange:PropTypes.func,
  fileLoading:PropTypes.func,
  shishi:PropTypes.object,
  handleChange:PropTypes.func,
  fileRemove:PropTypes.func,
}

export default Form.create()(modal)
