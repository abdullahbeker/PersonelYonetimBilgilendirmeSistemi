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
        <img alt='logo' src={logo} width='150' height='59' style={{ marginTop: '.5em', marginBottom: '.5em' }} />
      </CHeaderBrand>

      {/* <CHeaderNav className='d-md-down-none mr-auto'>
        <CHeaderNavItem className='px-3'>
          <CHeaderNavLink to='/dashboard'>Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className='px-3'>
          <CHeaderNavLink to='/users'>Users</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className='px-3'>
          <CHeaderNavLink>Settings</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav> */}

      <CHeaderNav className='ml-auto px-3'>
        {'ABDULLAH BEKER'}
        <HeaderDropdown />
      </CHeaderNav>

    </CHeader>
  )
}

export default Header
