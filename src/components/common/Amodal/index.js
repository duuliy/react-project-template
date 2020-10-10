import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Button, Spin } from 'antd'
import { CustomForm, DetailFiedls } from '@c/index'
import './style.less'

/**
 * @props  type form|normal|search|detail  类型
 *         normal：直接展示传入组建的节点内容
 *         form：内含表单
 *         detail: 详情展示
 *         search:  搜索table
 */

const FormItem = Form.Item
class Amodal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      PrefixCls: 'Amodal',
    }
    this.formRef = React.createRef()
  }
  static propTypes = {
    type: PropTypes.oneOf(['form', 'normal', 'search', 'detail']),
    visible: PropTypes.bool,
    title: PropTypes.string,
    width: PropTypes.number,
    isOk: PropTypes.bool,
    okText: PropTypes.string,
    isNoText: PropTypes.bool,
    noText: PropTypes.string,
    fieldList: PropTypes.array,
    detailData: PropTypes.object,
    column: PropTypes.number,
    onClose: PropTypes.func,
    btnOnClose: PropTypes.func,
    onSubmit: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
  }

  onSubmit = () => {
    const { type, onSubmit } = this.props
    if (type === 'form') {
      this.formRef.current
        .validateFields()
        .then(values => {
          onSubmit(values)
        })
        .catch(errorInfo => {
          console.log(errorInfo)
        })
    } else {
      onSubmit()
    }
  }

  render() {
    const { PrefixCls } = this.state
    const { type, visible = false, title, width, children, okText = '确认', isOk = true, noText = '取消', isNoText = true, fieldList = [], detailData = {}, column = 1, onClose, btnOnClose = null, className, disabled, loading = false, ...other } = this.props
    return (
      <Modal className={`${PrefixCls} ${className}`} title={title} width={width || 400} footer={null} maskClosable={false} destroyOnClose={true} visible={visible} onCancel={onClose} {...other}>
        <Spin spinning={loading}>
          <div className="modal-content-wrap">
            {type === 'form' && (
              <Form layout="inline" ref={this.formRef}>
                <CustomForm fieldList={fieldList} column={column} FormItem={FormItem} />
              </Form>
            )}
            {type === 'detail' && (
              <div className="detail-wrap">
                <DetailFiedls fieldList={fieldList} data={detailData} column={column} />
              </div>
            )}
            {type === 'normal' && <div className="children-wrap">{children}</div>}
          </div>

          <div className={`button-center confirm-button-center`}>
            <div>
              {isOk && (
                <Button type="primary" disabled={disabled} onClick={this.onSubmit}>
                  {okText}
                </Button>
              )}
              {isNoText && (
                <Button type="primary" ghost onClick={btnOnClose ? btnOnClose : onClose}>
                  {noText}
                </Button>
              )}
            </div>
          </div>
        </Spin>
      </Modal>
    )
  }
}

export default Amodal
