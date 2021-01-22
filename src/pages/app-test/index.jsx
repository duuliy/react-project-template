import { useEffect } from 'react'
import './style.less'
import api from '@services/api'
import { cloneDeep } from 'lodash'
import { DatePicker } from 'antd'
import { Icon } from '@components'
import cls from 'classnames'
import { add, reduce } from '@stores/actions/count'
import { useSelector, useDispatch } from 'react-redux'

const AppTest = () => {
  const className='duuliy'
  const { number, number2 } = useSelector(state => state.count)
  const dispatch = useDispatch();

  const getCake=async ()=>{
    const res= await api.getCake()
    console.log(cloneDeep(res))
  }

  const onChange=(val)=>{
    console.log(val)
  }

  useEffect(()=>{

    getCake()
  },[])

  return (
    <div className={cls("dsd", className)}>
      <span>
        666
      </span>
      <Icon name="file" fill='black' style={{ marginLeft: 100 }} />
      <DatePicker onChange={onChange} />
      <p>{number}</p>
      <p>{number2}</p>
      <button onClick={() => dispatch(reduce(number))}>-</button>
      <button onClick={() => dispatch(add(number))}>+</button>
      <button onClick={() => dispatch({
        type: 'reduceCount2',
        count2:number2
      })}>+2</button>
      <p>{moment().format()}</p>
    </div>
  )
}

export default AppTest