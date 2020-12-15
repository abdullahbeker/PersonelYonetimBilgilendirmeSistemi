import React, { createContext, useReducer } from 'react'

const ToastContext = createContext()
const ToastDispatchContext = createContext()

export default ({ children }) => {
  const initialState = {
    messages: []
  }

  const userReducer = (state, message) => {
    return {
      messages: [...state.messages, message]
    }
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <ToastContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>{children}</ToastDispatchContext.Provider>
    </ToastContext.Provider>
  )
}

export { ToastContext, ToastDispatchContext }
