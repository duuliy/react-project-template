import React, { PureComponent } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
// import { Search, TableBtns, CommonModal, Import } from '@c/index' //引入方式
import { cloneDeep, throttle } from 'lodash'
import moment from 'moment'
import { withRouter } from 'umi'

@withRouter
class DetailTest extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      PrefixCls: 'DetailTest',
    }
  }

  render() {
    return <div>555</div>
  }
}

export default DetailTest
