import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import auth from '../../base/auth'
import api, { handleGetAsync } from '../../base/api'
import { UserDispatchContext } from '../../contexts/UserContext'
import { ToastDispatchContext } from '../../contexts/ToastContext'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const userDispatch = useContext(UserDispatchContext)
  const toastDispatch = useContext(ToastDispatchContext)

  const fetchUserInfo = () => {
    handleGetAsync(
      api,
      '/api/auth/activeuser',
      res => {
        userDispatch(res.data)
      },
      toastDispatch
    )
  }

  const onSubmit = e => {
    e.preventDefault()
    if (!username || !password) {
      toastDispatch({ type: 'error', message: 'Lütfen tüm alanları doldurunuz' })
      return
    }
    auth.login(username, password, toastDispatch, () => {
      fetchUserInfo()
      props.history.push('/pannel')
    })
  }

  return (
    <div className='c-app c-default-layout flex-row align-items-center'>
      <CContainer>
        <CRow className='justify-content-center'>
          <CCol md='4'>
            <CCard className='p-4'>
              <CCardBody>
                <CForm>
                  <h1>Boneo</h1>
                  <p className='text-muted'>Hesabınıza giriş yapın</p>
                  <CInputGroup className='mb-3'>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name='cil-user' />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type='text'
                      placeholder='Kullanıcı Adı'
                      autoComplete='none'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className='mb-4'>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name='cil-lock-locked' />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type='password' placeholder='Şifre' autoComplete='none' value={password} onChange={e => setPassword(e.target.value)} />
                  </CInputGroup>
                  <CRow>
                    <CCol xs='12'>
                      <CButton color='primary' className='px-4' onClick={onSubmit}>
                        Giriş Yap
                      </CButton>
                    </CCol>
                    {/* <CCol xs="6" className="text-right">
                      <CButton color="link" className="px-0">
                        Forgot password?
                      </CButton>
                    </CCol> */}
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default withRouter(Login)
