import React, { useContext, useEffect, useState } from 'react'
import { Sidebar, Footer, Header } from '../'
import { CContainer } from '@coreui/react'
import api, { handleGetAsync } from '../../base/api'
import { Loading } from '../'
import { ToastDispatchContext } from '../../contexts/ToastContext'
import { UserDispatchContext } from '../../contexts/UserContext'

const Layout = ({ children }) => {
  const [isFetchingUser, setIsFetchingUser] = useState(true)
  const toastDispatch = useContext(ToastDispatchContext)
  const userDispatch = useContext(UserDispatchContext)

  useEffect(() => {
    handleGetAsync(api, '/api/auth/activeuser', res => {
      console.log(res.data)
      userDispatch(res.data)
      setIsFetchingUser(false)
    }, toastDispatch, res => {
      
    })
  }, [])

  return isFetchingUser ? (
    <Loading fullscreen />
  ) : (
    <div className='c-app c-default-layout'>
      <Sidebar />
      <div className='c-wrapper'>
        <Header />
        <div className='c-body'>
          <main className='c-main'>
            <CContainer fluid>{children}</CContainer>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
