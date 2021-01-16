import React from 'react'
import Main from './src/Main'

import AuthContextProvider from './src/contexes/AuthContext'
import MessageProvider from './src/contexes/MessageContext'
import CustomThemeProvider from './src/custom/Theme'

export default () => {
  return (
    <AuthContextProvider>
      <CustomThemeProvider>
        <MessageProvider>
          <Main />
        </MessageProvider>
      </CustomThemeProvider>
    </AuthContextProvider>
  )
}
