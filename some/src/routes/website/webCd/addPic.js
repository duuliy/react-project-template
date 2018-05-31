import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,Switch ,Upload,Button,Icon } from 'antd'
import style from './modal.css'

const AddPic=({})=>{
    return(
    <div>
        <Icon type="plus" />
        <div className={style.antuploadtext}>添加图片</div>
      </div>
    )
}


export default AddPic