import React from 'react'
import './loading.css'
import { CSpinner } from '@coreui/react'

const Loading = ({ fullscreen }) => {
  return fullscreen ? (
    <div className='loading-layout'>
      <CSpinner color='black' size='md' />
    </div>
  ) : (
    <div className='pt-3 text-center'>
      <div className='sk-spinner sk-spinner-pulse'></div>
    </div>
  )
}

export default Loading
