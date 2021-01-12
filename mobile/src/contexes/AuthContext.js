import React, { createContext, useState } from 'react'

const AuthContext = createContext()
const AuthDispatchContext = createContext()

export default ({ children }) => {
  const authInitialState = {
    token: '',
    id: null
  }
  const [state, setState] = useState(authInitialState)
  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={setState}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthDispatchContext }
