import React, { useContext, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import LoggedIn from './navigators/LoggedIn'
import SignInScreen from './screens/SignInScreen'
import { UserContext, UserDispatchContext } from './contexes/UserContext'

import api from './api'
import { setAuthToken } from './api/auth'
import Loading from './components/Loading'

import useCustomFonts from './custom/useCustomFonts'

const Main = ({}) => {
  const userDispatch = useContext(UserDispatchContext)
  const userState = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [fontsLoaded] = useCustomFonts()

  useEffect(() => {
    ;(async () => {
      try {
        const keepMeLoggedIn = Boolean(await AsyncStorage.getItem('@keepMeLoggedIn'))
        if (keepMeLoggedIn) {
          const refreshToken = await AsyncStorage.getItem('@user-refreshToken')
          const res = await api.post(
            '/account/refreshToken',
            {},
            {
              headers: {
                refreshtoken: refreshToken
              }
            }
          )
          if (res.data) {
            setAuthToken(res.data, api)
            const userJson = await AsyncStorage.getItem('@user-info')
            const user = JSON.parse(userJson)
            userDispatch({ type: 'set_user', value: user })
            userDispatch({ type: 'login' })
          }
        }
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    })()
  }, [])

  return !fontsLoaded || loading ? (
    <Loading />
  ) : (
    <>
      <StatusBar hidden />
      {userState.loggedIn ? (
        <NavigationContainer>
          <StatusBar hidden />
          <LoggedIn />
        </NavigationContainer>
      ) : (
        <SignInScreen />
      )}
    </>
  )
}

export default Main
