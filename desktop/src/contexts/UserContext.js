import React, { createContext, useReducer, useState } from 'react'

const UserContext = createContext()
const UserDispatchContext = createContext()

export default ({ children }) => {
  const userInitialState = {
    user: {},
    loggedIn: false,
  }

  const [state, dispatch] = useReducer(userReducer, userInitialState)
  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserContext.Provider>
  )
}

export { UserContext, UserDispatchContext }
