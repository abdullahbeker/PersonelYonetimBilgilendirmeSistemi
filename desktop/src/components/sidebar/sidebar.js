import React, { useContext } from 'react'
import { SidebarContext, SidebarContextDispatch } from '../../contexts/SidebarContext'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import logo from '../../assets/logo_250x100.png'
import logoMinimized from '../../assets/icon.png'

// sidebar nav config
import config from './sidebarConfig'

const Sidebar = () => {
  const dispatch = useContext(SidebarContextDispatch)
  const { sidebarShow } = useContext(SidebarContext)

  return (
    <CSidebar colorScheme='light' show={sidebarShow} onShowChange={val => dispatch({ type: 'set', sidebarShow: val })}>
      <CSidebarBrand className='d-md-down-none' to='/'>
        <img className='c-sidebar-brand-full' src={logo} width='150' height='59' style={{ marginTop: '.5em', marginBottom: '.5em' }} />
        <img className='c-sidebar-brand-minimized' src={logoMinimized} width='35' height='35' style={{ marginTop: '.5em', marginBottom: '.5em' }} />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={config}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className='c-d-md-down-none' />
    </CSidebar>
  )
}

export default Sidebar
