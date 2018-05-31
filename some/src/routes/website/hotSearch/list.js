import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {DropOtion} from 'components'
import style from './list.css'
import queryString from 'query-string'
import {config } from 'utils'
import {Popconfirm,Modal,Alert, message,Tabs,Radio,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd'
const FormItem=Form.Item
const TabPane =Tabs.TabPane
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
  }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 4,
      },
    },
  };

const List=({
    idMotion,
    ...listProps,
    location,
    list,
    onOk,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
    onEditItem,
    onChangeList
})=>{
    location.query =queryString.parse(location.search)



    //   const { getFieldDecorator } = form;


    const onChange=()=>{

    }

    const onEdit=(targetKey,action)=>{

        if(action=="remove"){
            Modal.confirm({
                title: '删除',
                content: '你确认要删除本条导航！！！',
                okText: '确认',
                cancelText: '取消',
                onOk(){onChangeList(targetKey)},
              });
            
            // onChangeList()
        }else if(action=="add"){
            if(list.length<8){
                onEditItem()
            }else{
                Modal.confirm({
                    title: '添加过多',
                    content: '您最多可拥有8个搜索热词，不能过多！如需添加，请删除一个再进行添加',
                    okText: '确认',
                    cancelText: '取消',
                  });
            }
        }
        // this[action](targetKey);
    }
const normFile = (e) => {

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  const handleSubmit=(e)=>{

    const data=e.target.value
    onOk(data)
}

    const data=[]
    if(list!=undefined){
        for(let i=0;i<list.length;i++){
            let openstyle
            if(list[i].openstyle==0){
                openstyle="当前窗口"
            }else{
                openstyle="新窗口"
            }
            let hotstatus
            if(list[i].hotstatus==0){
                hotstatus="显示"
            }else{
                hotstatus="隐藏"
            }
            data.push(<TabPane tab={list[i].hotname} key={list[i].id}>
                <Row className={style.top}>
                    <Col className={style.title} xxl={2} xl={4} lg={4} sm={{span:4}} xs={24}><span >栏目名称:</span></Col>
                    <Col offset={1} sm={10} xs={24}><span>{list[i].hotname}</span></Col>
                </Row>
                <Row className={style.top}>
                    <Col className={style.title} xxl={2} xl={4} lg={4} sm={{span:4}} xs={24} xs={24}><span >链       接:</span></Col>
                    <Col offset={1} sm={10} xs={24}><span>{list[i].hoturl}</span></Col>
                </Row>
                <Row className={style.top}>
                    <Col className={style.title} xxl={2} xl={4} lg={4} sm={{span:4}} xs={24} xs={24}><span >打开方式:</span></Col>
                    <Col offset={1} sm={19} xs={24}><span>{openstyle}</span></Col>
                </Row>
                <Row className={style.top}>
                    <Col className={style.title} xxl={2} xl={4} lg={4} sm={{span:4}} xs={24} xs={24}><span >栏目设置:</span></Col>
                    <Col offset={1} sm={19} xs={24}><span>{hotstatus}</span></Col>
                </Row>
                <Row className={style.top}>
                    <Col className={style.title} xxl={2} xl={4} lg={4} sm={{span:4}} xs={24} xs={24}><span >栏目排序:</span></Col>
                    <Col offset={1} sm={19} xs={24}><span>{list[i].hotsort}</span></Col>
                </Row>
                <Row className={style.top}>
                    <Col offset={2} sm={19} xs={24}>
                    <Radio.Group value={0} onChange={handleSubmit}>
                        <Radio.Button style={{background:"#1890ff",color:"white"}} value={list[i].id}>修改</Radio.Button>
                    </Radio.Group>
                    </Col>
                </Row>
            </TabPane>)
        }
    }




    return(
        <Tabs 
        onChange={onChange} 
        type="editable-card" 
        onEdit={onEdit} 
        tabBarExtraContent={"新建搜索"}
        >
        {data}
        </Tabs>
    )

}

List.propTypes={
    form: PropTypes.object.isRequired,
    isMotion: PropTypes.bool,
    type: PropTypes.string,
    location: PropTypes.object,
    onEditItem:PropTypes.func,
    onChangeList:PropTypes.func
}

export default Form.create()(List)


