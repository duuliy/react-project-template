import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {DropOtion} from 'components'
import queryString from 'query-string'
import style from './list.css'
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


    // const IDnum=list[0].id
    //   const { getFieldDecorator } = form;



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
            onEditItem()
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
            let open_style
            if(list[i].open_style==0){
                open_style="当前窗口"
            }else{
                open_style="新窗口"
            }
            let nav_status
            if(list[i].nav_status==0){
                nav_status="显示"
            }else{
                nav_status="隐藏"
            }
            data.push(<TabPane  tab={list[i].nav_name} key={list[i].id}>
                <Row className={style.top}>
                    <Col className={style.title} xxl={2} xl={4} lg={4} sm={{span:4}} xs={24}><span >栏目名称:</span></Col>
                    <Col offset={1} sm={10} xs={24}><span>{list[i].nav_name}</span></Col>
                </Row>
                <Row className={style.top}>
                    <Col className={style.title} xxl={2} xl={4} lg={4} sm={{span:4}} xs={24} xs={24}><span >链       接:</span></Col>
                    <Col offset={1} sm={10} xs={24}><span>{list[i].nav_url}</span></Col>
                </Row>
                <Row className={style.top}>
                    <Col className={style.title} xxl={2} xl={4} lg={4} sm={{span:4}} xs={24} xs={24}><span >栏目搜索关键词:</span></Col>
                    <Col offset={1} sm={19} xs={24}><span>{list[i].nav_keyword}</span></Col>
                </Row>
                <Row className={style.top}>
                    <Col className={style.title} xxl={2} xl={4} lg={4} sm={{span:4}} xs={24} xs={24}><span >栏目摘要:</span></Col>
                    <Col offset={1} sm={19} xs={24}><span>{list[i].nav_description}</span></Col>
                </Row>
                <Row className={style.top}>
                    <Col className={style.title} xxl={2} xl={4} lg={4} sm={{span:4}} xs={24} xs={24}><span >打开方式:</span></Col>
                    <Col offset={1} sm={19} xs={24}><span>{open_style}</span></Col>
                </Row>
                <Row className={style.top}>
                    <Col className={style.title} xxl={2} xl={4} lg={4} sm={{span:4}} xs={24} xs={24}><span >栏目设置:</span></Col>
                    <Col offset={1} sm={19} xs={24}><span>{nav_status}</span></Col>
                </Row>
                <Row className={style.top}>
                    <Col className={style.title} xxl={2} xl={4} lg={4} sm={{span:4}} xs={24} xs={24}><span >栏目排序:</span></Col>
                    <Col offset={1} sm={19} xs={24}><span>{list[i].nav_sort}</span></Col>
                </Row>
                <Row className={style.top}>
                    <Col offset={2} sm={19} xs={24}>
                    {/* <Button key={list[i].id} type="primary" onClick={handleSubmit(list[i].id)}>修改</Button> */}
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
        type="editable-card" 
        onEdit={onEdit} 
        tabBarExtraContent={"新建导航"}
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
