import React, { createContext, useState } from 'react'

const UserContext = createContext()
const UserDispatchContext = createContext()

export default ({ children }) => {
  const initialState = {
    username: '',
    roles: []
  }

  const [state, setState] = useState(initialState)
  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={setState}>{children}</UserDispatchContext.Provider>
    </UserContext.Provider>
  )
}

export { UserContext, UserDispatchContext }
