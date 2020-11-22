import React, { useContext } from 'react'
import { CToast, CToaster, CToastHeader, CToastBody } from '@coreui/react'
import { ToastContext } from '../../contexts/ToastContext'

const ToastMessager = () => {
  const { messages } = useContext(ToastContext)
  return (
    <CToaster position='top-right'>
      {messages.map((message, key) => {
        return (
          <CToast key={'toast-message-' + key} show={true} autohide={3000} fade={true}>
            <CToastHeader closeButton={false}>{message.type}</CToastHeader>
            <CToastBody>{message.message}</CToastBody>
          </CToast>
        )
      })}
    </CToaster>
  )
}

export default ToastMessager
