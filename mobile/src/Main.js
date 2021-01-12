import React, { useContext, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './navigators/TabNavigator'
import SignInScreen from './screens/SignInScreen'
import { AuthContext } from './contexes/AuthContext'
import Loading from './components/Loading'
import useCustomFonts from './custom/useCustomFonts'

const Main = () => {
  const authState = useContext(AuthContext)
  const [fontsLoaded] = useCustomFonts()

  return !fontsLoaded ? (
    <Loading />
  ) : (
    <React.Fragment>
      <StatusBar hidden />
      {authState.token ? (
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      ) : (
        <SignInScreen />
      )}
    </React.Fragment>
  )
}

export default Main
