import { forwardRef, useImperativeHandle } from 'react'

const TestRef = (props, ref) => {
  useImperativeHandle(ref, () => ({
    // changeVal 就是暴露给父组件的方法
    changeVal: newVal => {
      console.log(newVal)
    },
  }))

  return <div>65667</div>
}

export default forwardRef(TestRef)
