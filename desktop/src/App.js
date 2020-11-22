import React from 'react'
import Routes from './routes'
import SidebarContextProvider from './contexts/SidebarContext'
import { icons } from './assets/icons'

React.icons = icons

const App = () => {
  return (
    <SidebarContextProvider>
      <Routes />
    </SidebarContextProvider>
  )
}

export default App
