import React from 'react'
import Routes from './routes'
import SidebarContextProvider from './contexts/SidebarContext'
import UserContextProvider from './contexts/UserContext'
import ToastContextProvider from './contexts/ToastContext'
import { icons } from './assets/icons'
import { ToastMessager } from './components'

React.icons = icons

const App = () => {
  return (
    <SidebarContextProvider>
      <UserContextProvider>
        <ToastContextProvider>
          <ToastMessager />
          <Routes />
        </ToastContextProvider>
      </UserContextProvider>
    </SidebarContextProvider>
  )
}

export default App
