import React from 'react'
import auth from '../../base/auth'
import { Route, Redirect } from 'react-router-dom'

const SecuredRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          return children
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      }}
    />
  )
}

export default SecuredRoute
