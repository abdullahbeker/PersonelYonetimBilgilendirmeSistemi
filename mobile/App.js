import React from 'react'
import Main from './src/Main'

import UserProvider from './src/contexes/UserContext'
import MessageProvider from './src/contexes/MessageContext'
import CustomThemeProvider from './src/custom/Theme'

export default () => {
  return (
    <UserProvider>
      <CustomThemeProvider>
        <MessageProvider>
          <Main />
        </MessageProvider>
      </CustomThemeProvider>
    </UserProvider>
  )
}
