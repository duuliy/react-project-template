import React, { createContext, useState } from 'react'

// 1. 使用 createContext 创建上下文
export const UserContext = new createContext()

// 2. 创建 Provider
export const UserProvider = props => {
  // let [ username, handleChangeUsername ] = useState( '666' )

  return <UserContext.Provider value={props.value}>{props.children}</UserContext.Provider>
}

// 3. 创建 Consumer
export const UserConsumer = UserContext.Consumer
