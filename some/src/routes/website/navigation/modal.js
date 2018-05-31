import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,Switch ,Upload,Button,Icon } from 'antd'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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
  type,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,//获取控件的值
  },
  ...modalProps
}) => { 

  // const items=item[0]

  const handleOk = () => {
    
    validateFields((errors) => {
      if (errors) {
        return
      }
        const data = {
          ...getFieldsValue(),
          type:Number(type),
          id:item.id
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

  return (
    <Modal {...modalOpts} >
      <Form layout="horizontal">
        <FormItem label="栏目名称" {...formItemLayout}>
          {getFieldDecorator('nav_name', {
            initialValue: item.nav_name,
            rules: [
              {
                required: true,
                message: '请输入栏目名称',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="链       接" {...formItemLayout}>
          {getFieldDecorator('nav_url', {
            initialValue: item.nav_url,
            rules: [
              {
                required: true,
                message: '请输入链接',
              },
            ],
          })(<Input  />)}
        </FormItem>
        <FormItem label="导航栏样式" {...formItemLayout}>
          {getFieldDecorator('nav_style', {
            initialValue: item.nav_style,
            rules: [
              {
                required: true,
                message: '请选择打开方式',
            }
            ],
          })(<RadioGroup >
              <RadioButton value="0">纯文字</RadioButton>
              <RadioButton value="1">纯图片</RadioButton>
              <RadioButton value="2">图文结合</RadioButton>
              </RadioGroup>)}
        </FormItem>
        <FormItem label="栏目搜索关键词" {...formItemLayout}>
          {getFieldDecorator('nav_keyword', {
            initialValue: item.nav_keyword,
            rules: [
                {
                  required: true,
                  message: '请填写栏目搜索关键词',
                }
              ],
            })(<Input />)}
           </FormItem>
        <FormItem label="栏目摘要"  {...formItemLayout}>
          {getFieldDecorator('nav_description', {
            initialValue: item.nav_description,
            rules: [
                  {
                    required: true,
                    message: '请填写栏目摘要',
                  }
                ],
              })(<Input />)}
        </FormItem>
        <FormItem label="栏目属性"  {...formItemLayout}>
          {getFieldDecorator('nav_attr', {
            initialValue: item.nav_attr,
            rules: [
              {
                required: true,
                message: '请选择打开方式',
            }
            ],
          })(<RadioGroup >
              <RadioButton value="0">系统内联</RadioButton>
              <RadioButton value="1">系统外链</RadioButton>
              </RadioGroup>)}
        </FormItem>
        <FormItem label="打开方式"  {...formItemLayout}>
          {getFieldDecorator('open_style', {
            initialValue: item.open_style,
            rules: [
              {
                required: true,
                message: '请选择打开方式',
            }
            ],
          })(<RadioGroup >
              <RadioButton value="0">当前窗口</RadioButton>
              <RadioButton value="1">新窗口</RadioButton>
              </RadioGroup>)}
        </FormItem>
        <FormItem label="栏目设置"  {...formItemLayout}>
          {getFieldDecorator('nav_status', {
            initialValue: item.nav_status,
            rules: [
              {
                required: true,
                message: '请选择栏目设置',
            }
            ],
          })(<RadioGroup >
              <RadioButton value="0">显示</RadioButton>
              <RadioButton value="1">隐藏</RadioButton>
            </RadioGroup>)}
        </FormItem>
        <FormItem label="栏目排序"  {...formItemLayout}>
          {getFieldDecorator('nav_sort', {
            initialValue: item.nav_sort,
            rules: [
              {
                required: true,
                message: '请填写栏目排序',
            }
            ],
          })(<Input/>)}
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
  type:PropTypes.number
}

export default Form.create()(modal)