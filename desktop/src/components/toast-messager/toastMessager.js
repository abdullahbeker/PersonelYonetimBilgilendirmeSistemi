import React, { useContext } from 'react'
import './toastMessager.css'
import { CToast, CToaster, CToastHeader, CToastBody, CImg } from '@coreui/react'
import { ToastContext } from '../../contexts/ToastContext'

const messageTypes = {
  error: {
    color: '#d93737',
    text: 'Hata'
  },
  success: {
    color: '#1b9e3e',
    text: 'Başarılı'
  },
  warning: {
    color: '#f6960b',
    text: 'Uyarı'
  }
}

const ToastMessager = () => {
  const { messages } = useContext(ToastContext)
  return (
    <CToaster position='top-right'>
      {messages.map((message, key) => {
        const messageType = messageTypes[message.type]
        return (
          <CToast key={'toast-message-' + key} show={true} autohide={3000} fade={true}>
            <CToastHeader closeButton={false}>
              <svg className='toast-message-svg' width='16' height='16' xmlns='http://www.w3.org/2000/svg' style={{ borderRadius: '.25em' }}>
                <g>
                  <rect fill={messageType.color} width='16' height='16' />
                </g>
              </svg>
              {messageType.text}
            </CToastHeader>
            <CToastBody>{message.message}</CToastBody>
          </CToast>
        )
      })}
    </CToaster>
  )
}

export default ToastMessager
