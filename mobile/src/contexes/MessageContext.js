import React, { createContext, useState } from 'react'

const MessageContext = createContext()
const MessageDispatchContext = createContext()

export default ({ children }) => {
  const [state, setState] = useState({})

  return (
    <MessageContext.Provider value={state}>
      <MessageDispatchContext.Provider value={setState}>{children}</MessageDispatchContext.Provider>
    </MessageContext.Provider>
  )
}

export { MessageContext, MessageDispatchContext }
