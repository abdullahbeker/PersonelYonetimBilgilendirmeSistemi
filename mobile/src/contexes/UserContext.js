import React, { createContext, useReducer } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../api'

const UserContext = createContext()
const UserDispatchContext = createContext()

export default ({ children }) => {
  const userInitialState = {
    user: {},
    loggedIn: false
  }
  const userReducer = (state, action) => {
    switch (action.type) {
      case 'set_user':
        return { ...state, user: action.value }
      case 'login':
        return { ...state, loggedIn: true }
      case 'logout':
        AsyncStorage.getItem('@keepMeLoggedIn')
          .then(val => {
            const keepMeLoggedIn = Boolean(val)
            if (keepMeLoggedIn) {
              AsyncStorage.getItem('@user-refreshToken')
                .then(refreshToken => {
                  api
                    .post('/account/signOut', {
                      refreshToken
                    })
                    .then(res => {
                      AsyncStorage.removeItem('@user-refreshToken').catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
              AsyncStorage.setItem('@keepMeLoggedIn', 'false')
            }
          })
          .catch(err => console.log(err))
        return { ...state, loggedIn: false }
      default:
        throw new Error()
    }
  }
  const [state, dispatch] = useReducer(userReducer, userInitialState)
  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserContext.Provider>
  )
}

export { UserContext, UserDispatchContext }
