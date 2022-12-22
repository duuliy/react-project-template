import { useEffect, useReducer } from 'react'
import './style.less'
import { cloneDeep } from 'lodash'
import { DatePicker, Button } from 'antd'
import { Icon } from '@components'
import cls from 'classnames'
import { getData } from '@stores/count/effects'
import { useSelector, useDispatch } from 'react-redux'
import { produce } from 'immer'

const reducerTest=(state, payload) => ({ ...state, ...payload })
const AppTest = () => {
  const className='duuliy'
  const { number, number2, data } = useSelector(state => state.count)
  const dispatch = useDispatch();
  const [tests, dispatchTests] = useReducer(reducerTest, {
    test1: 123,
    test2: 123
  });

  const getCake=async ()=>{
    await dispatch(getData())
  }

  const onChange=(val)=>{
    console.log(val)
  }

  const changeReducer=()=>{
    console.log('注意这里无法解决闭包问题,批处理')
    setTimeout(() => {
      dispatchTests({
        test1: tests.test1+1
      })
    }, 800);
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
        {tests.test1},
        {tests.test2}
      </span>
      <Button type="primary" onClick={changeReducer}>测试reducer</Button>
      <Icon name="file" fill='black' style={{ marginLeft: 20  }} />
      999
      {/* <img src={require('@assets/icons/file.svg')} alt="555" /> */}
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