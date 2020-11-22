import React, { useContext } from 'react'
import { SidebarContext, SidebarContextDispatch } from '../../contexts/SidebarContext'
import { CHeader, CToggler, CHeaderBrand, CHeaderNav, CHeaderNavItem, CHeaderNavLink, CSubheader, CBreadcrumbRouter, CLink } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import logo from '../../assets/logo_250x100.png'

// routes config
// import routes from "../routes";

import { HeaderDropdown } from '../'

const Header = () => {
  const dispatch = useContext(SidebarContextDispatch)
  const { sidebarShow } = useContext(SidebarContext)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  return (
    <CHeader withSubheader>
      <CToggler inHeader className='ml-md-3 d-lg-none' onClick={toggleSidebarMobile} />
      <CToggler inHeader className='ml-3 d-md-down-none' onClick={toggleSidebar} />
      <CHeaderBrand className='mx-auto d-lg-none' to='/'>
        {/* Buraya logo eklenecek */}
        {/* <CIcon name="logo" height="48" alt="Logo" /> */}
        <img src={logo} width='150' height='59' style={{ marginTop: '.5em', marginBottom: '.5em' }} />
      </CHeaderBrand>

      <CHeaderNav className='d-md-down-none mr-auto'>
        {/* <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to="/users">Users</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink>Settings</CHeaderNavLink>
        </CHeaderNavItem> */}
      </CHeaderNav>

      <CHeaderNav className='px-3'>
        {/* <TheHeaderDropdownNotif />
        <TheHeaderDropdownTasks />
        <TheHeaderDropdownMssg /> */}
        <HeaderDropdown />
      </CHeaderNav>

      {/* <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
         <div className="d-md-down-none mfe-2 c-subheader-nav">
            <CLink className="c-subheader-nav-link"href="#">
              <CIcon name="cil-speech" alt="Settings" />
            </CLink>
            <CLink 
              className="c-subheader-nav-link" 
              aria-current="page" 
              to="/dashboard"
            >
              <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
            </CLink>
            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
            </CLink>
          </div> 
      </CSubheader> */}
    </CHeader>
  )
}

export default Header
