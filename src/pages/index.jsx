import React, { PureComponent } from 'react'
import './styles.less'
import axios from 'axios'
import api from '@s/api'
import { connect } from 'umi'

class IndexPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      testObj: {
        a: 1,
        b: 2,
      },
    }
  }
  render() {
    return (
      <div className="hhh">
        <div className="yyy">首页</div>
        {/* 这个警告是哪个插件报的 */}
        {[1, 2, 3].map(item => (
          <div>{item}</div>
        ))}
      </div>
    )
  }
  async componentDidMount() {
    //mock使用
    axios({
      method: 'get',
      url: '/apc/users',
    }).then(res => {
      // console.log(res.data)
    })
    api.testMockAndRequest().then(res => {
      console.log(res)
    })

    // var arr2 = [1, 2, [3, 4, [5, 6]]];
    // console.log(arr2.flat(Infinity));
    // console.log(this.props.count);
    await this.props.dispatch({ type: 'common/save', payload: { count: 1 } })
    // console.log(this.props.count);
  }
}

IndexPage.title = 'duuliy2 Page'

export default connect(({ common }) => ({
  count: common.count,
}))(IndexPage)
