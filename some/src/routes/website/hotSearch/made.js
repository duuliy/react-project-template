import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,Switch ,Upload,Button,Icon,Tabs } from 'antd'
const {TabPane} =Tabs

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

const List = ({
    idMotion,
    ...listProps,
    location,
    listData,
//   item = {},
//   onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,//获取控件的值
  },
//   ...modalProps
}) => {

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        tag_id: item.tag_id,
      }

      // data.address = data.address.join(' ')
      onOk(data)
    })
  }
 
  const modalOpts = {
    // ...modalProps,
    // onOk: handleOk,
  }

  const normFile = (e) => {

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }


      const data=[]
    const data1=[
        {nav_name:"111",link:"111",seach:"111"},
        {nav_name:"222",link:"222",seach:"222"},
        {nav_name:"333",link:"333",seach:"333"},
    ]
    if(data1!=undefined){
        for(let i=0;i<data1.length;i++){
            data.push(<TabPane tab={data1[i].nav_name} key={i}>
                <Form layout="horizontal">
                    <FormItem {...formItemLayout} hasFeedback label="栏目名称">
                        {getFieldDecorator('nav_name', {
                            initialValue:data1[i].nav_name,
                            rules: [
                            {
                                required: true,
                                message: '',
                            }],
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="链       接">
                        {getFieldDecorator('link', {
                            initialValue:data1[i].link,
                            rules: [

                            {
                                required: true,
                                message: '',
                            }],
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="栏目搜索关键词">
                        {getFieldDecorator('seach', {
                            initialValue:data1[i].seach,
                            rules: [
                                {
                                    type: 'email', message: 'The input is not valid E-mail!',
                                  },
                            {
                                required: true,
                                message: '',
                            }],
                        })(<Input />)}
                    </FormItem>
                </Form>
            </TabPane>)
        }
    }

  return (
    <Tabs 
    //  onChange={onChange}
      type="editable-card"
    //    onEdit={onEdit} 
       tabBarExtraContent={"新建导航"}>
      {data}
    </Tabs>
  )
}

List.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(List)