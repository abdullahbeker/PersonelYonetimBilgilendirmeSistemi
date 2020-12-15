import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import {
  CButton,
  CSpinner,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import auth from '../../base/auth'
import { ToastDispatchContext } from '../../contexts/ToastContext'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isInputDisable, setIsInputDisable] = useState(false)
  const toastDispatch = useContext(ToastDispatchContext)

  const onSubmit = e => {
    e.preventDefault()
    if (!username || !password) {
      toastDispatch({ type: 'error', message: 'Lütfen tüm alanları doldurunuz' })
      return
    }
    setIsInputDisable(true)
    auth.login(
      username,
      password,
      toastDispatch,
      () => {
        props.history.push('/pannel')
      },
      () => {
        setIsInputDisable(false)
      }
    )
  }

  return (
    <div className='c-app c-default-layout flex-row align-items-center'>
      <CContainer>
        <CRow className='justify-content-center'>
          <CCol md='4'>
            <CCard className='p-4'>
              <CCardBody>
                <CForm>
                  <h1>PYBS</h1>
                  <p className='text-muted'>Hesabınıza giriş yapın</p>
                  <CInputGroup className='mb-3'>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name='cil-user' />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      disabled={isInputDisable}
                      type='text'
                      placeholder='Kimlik Numarası'
                      autoComplete='none'
                      value={username}
                      maxLength={11}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className='mb-4'>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name='cil-lock-locked' />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      disabled={isInputDisable}
                      type='password'
                      placeholder='Şifre'
                      autoComplete='none'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs='12'>
                      <CButton color='primary' className='px-4' onClick={onSubmit} disabled={isInputDisable}>
                        {isInputDisable ? <CSpinner color='#fff' size='sm' /> : 'Giriş Yap'}
                      </CButton>
                    </CCol>
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
