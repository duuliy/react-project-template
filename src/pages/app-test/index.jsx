import { useEffect } from 'react'
import './style.less'
import api from '@services/api'
import { cloneDeep } from 'lodash'
import { DatePicker } from 'antd'
import { Icon } from '@components'
import cls from 'classnames'
import { add, reduce, getData } from '@stores/count/actions'
import { useSelector, useDispatch } from 'react-redux'
import { COUNT_REDUCE2 } from '@stores/count/actionTypes'

const AppTest = () => {
  const className='duuliy'
  const { number, number2, data } = useSelector(state => state.count)
  const dispatch = useDispatch();

  const getCake=async ()=>{
    await dispatch(getData())
    // const res= await api.getCake()
  }

  const onChange=(val)=>{
    console.log(val)
  }

  useEffect(()=>{

    getCake()
  },[])

  useEffect(() => {

    console.log(data)
  }, [data])

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
        type: COUNT_REDUCE2,
        count2:number2
      })}>+2</button>
      <p>{moment().format()}</p>
    </div>
  )
}

export default AppTest