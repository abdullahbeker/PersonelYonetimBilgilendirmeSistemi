import React, { createContext, useReducer } from 'react'

const SidebarContext = createContext()
const SidebarContextDispatch = createContext()

export default ({ children }) => {
  const initialState = {
    sidebarShow: 'responsive',
  }

  const sidebarReducer = (state, { type, ...rest }) => {
    switch (type) {
      case 'set':
        return { ...state, ...rest }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(sidebarReducer, initialState)

  return (
    <SidebarContext.Provider value={state}>
      <SidebarContextDispatch.Provider value={dispatch}>
        {children}
      </SidebarContextDispatch.Provider>
    </SidebarContext.Provider>
  )
}

export { SidebarContext, SidebarContextDispatch }
