import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import { config } from 'utils'
import styles from './index.less'

const FormItem = Form.Item

const Login = ({
  loading,
  dispatch,
  login,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  // console.log(login)
  const {captcha} = login
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }
  function handbtn(){
    dispatch({ type: 'login/getCaptcha' })
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt="logo" src={config.logo} />
        <span>{config.name}</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('user_account', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input onPressEnter={handleOk} placeholder="user_account" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="password" onPressEnter={handleOk} placeholder="Password" />)}
        </FormItem>
        <Button type="primary" onClick={handbtn} loading={loading.effects.login}>
            获取
        </Button>

        <img src={captcha}/>

          <FormItem hasFeedback>
          {getFieldDecorator('captcha', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input  onPressEnter={handleOk} placeholder="验证码" />)}
        </FormItem>

        <Row>
          <Button type="primary" onClick={handleOk} loading={loading.effects.login}>
            登录
          </Button>
 
        </Row>

      </form>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  login: PropTypes.object,
}

export default connect(({ loading,login }) => ({ login,loading }))(Form.create()(Login))
