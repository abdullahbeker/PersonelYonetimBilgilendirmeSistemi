import React from 'react'
import Loading from './Loading'
import TryAgain from './TryAgain'

const FetchAndRefreshIfFails = ({ children, onRefreshPress, error, fetching }) => {
  return error ? <TryAgain onPress={onRefreshPress} /> : fetching ? <Loading /> : children
}

export default FetchAndRefreshIfFails
