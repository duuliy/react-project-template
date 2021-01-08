import { useState, useEffect, useReducer, createContext } from 'react'
import { Chart } from '@antv/g2'
import TestReducer from '@c/visualization/TestReducer'
import TestReducerBrother from '@c/visualization/TestReducerBrother'
import { visualization } from '@stores/reducer'
import { UserProvider, UserContext } from '@stores/context'
// export const Ctx = createContext()
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]

const Visualization = () => {
  useEffect(() => {
    const chart = new Chart({
      container: 'c1',
      width: 600,
      height: 300,
    })
    // Step 2: 载入数据源
    chart.data(data)

    // Step 3：创建图形语法，绘制柱状图
    chart.interval().position('genre*sold')

    // Step 4: 渲染图表
    chart.render()
  }, [])

  // const { initialState, reducer } = visualization
  const { state, dispatch } = visualization()

  // const [state, dispatch] = useReducer(
  //   reducer,
  //   initialState
  //   // {type: 'reset', payload: initialCount}, //第三个参数目前还是提案
  // )

  console.log(888)
  return (
    <div className="hhh">
      <div className="yyy">可视化</div>
      <div id="c1"></div>
      <UserProvider value={{ state, dispatch }}>
        <TestReducer />
        <TestReducerBrother />
      </UserProvider>
    </div>
  )
}

export default Visualization
