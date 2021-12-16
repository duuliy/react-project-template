import { useEffect } from 'react'
import './style.less'
import api from '@services/api'
import { cloneDeep } from 'lodash'
import { DatePicker } from 'antd'
import { Icon } from '@components'
import cls from 'classnames'
import { getData } from '@stores/count/effects'
import { useSelector, useDispatch } from 'react-redux'

const AppTest = () => {
  const className='duuliy'
  const { number, number2, data } = useSelector(state => state.count)
  const dispatch = useDispatch();

  const getCake=async ()=>{
    await dispatch(getData())
  }

  const onChange=(val)=>{
    console.log(val)
  }

  useEffect(()=>{
    const obj={
      gg:{
        kk:666
      }
    }
    console.log(obj?.gg?.kk)
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
      <button onClick={() => dispatch({ type: 'count/add'})}>+</button>
      <button onClick={() => dispatch({ type: 'count/reduce' })}>-</button>
      <button onClick={() => dispatch({
        type: 'count/reduce2',
        number2:666
      })}>赋值</button>
      <p>{moment().format()}</p>
    </div>
  )
}

export default AppTest