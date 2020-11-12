import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements'
import api from '../api'
import AsyncStorage from '@react-native-community/async-storage'
import CheckBox from '@react-native-community/checkbox'

import Text from '../components/CustomText'
import { colors, fonts } from '../custom/Theme'

import { UserDispatchContext } from '../contexes/UserContext'
import { setAuthToken, removeAuthToken } from '../api/auth'
import JwtDecode from 'jwt-decode'
import Loading from './../components/Loading'

export default ({}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [fetching, setFetching] = useState(false)
  const [initializing, setInitializing] = useState(true)

  const userDispatch = useContext(UserDispatchContext)

  const handleSubmit = async () => {
    if (message) setMessage('')
    if (!username || !password) {
      setMessage('Lütfen tüm alanları doldurunuz')
      return
    }
    if (username.length != 11) {
      setMessage('Kimlik numarası 11 haneli olmalıdır')
      return
    }
    setLoading(true)
    try {
      let res = await api.post('/account/signin', {
        username,
        password,
        keepLoggedIn: keepMeLoggedIn ? 'true' : 'false'
      })
      if (!res.data) {
        setMessage('Yanlış kimlik numarası veya şifre')
        setLoading(false)
        return
      }
      if (rememberMe) await AsyncStorage.setItem('@login-username', username)
      else await AsyncStorage.removeItem('@login-username')
      await AsyncStorage.setItem('@keepMeLoggedIn', keepMeLoggedIn ? 'true' : 'false')
      keepMeLoggedIn && (await AsyncStorage.setItem('@user-refreshToken', res.data.refreshToken))
      setAuthToken(res.data.token, api)
      const parsed = JwtDecode(res.data.token)
      let user = { id: parsed.id, role: parsed.role, identity: username }
      setFetching(true)
      setMessage('Giriş yapılıyor...')
      res = await api.get(`/api/personnel/getPersonnelById/${user.id}`)
      res.data[0].avatar = null
      user = { ...user, ...res.data[0] }
      keepMeLoggedIn && (await AsyncStorage.setItem('@user-info', JSON.stringify(user)))
      userDispatch({ type: 'set_user', value: user })
      userDispatch({ type: 'login' })
    } catch (err) {
      console.log(err)
      removeAuthToken(api)
      setFetching(false)
      setMessage('Bir hata oluştu, lütfen daha sonra tekrar deneyin')
      setLoading(false)
    }
  }

  const fetchValuesFromStorage = async () => {
    try {
      const json = await AsyncStorage.getItem('@login-username')
      if (!json) return
      setRememberMe(true)
      const username = JSON.parse(json)
      setUsername(username.toString())
    } catch (err) {
      console.log(err)
    } finally {
      setInitializing(false)
    }
  }

  useEffect(() => {
    fetchValuesFromStorage()
  }, [])

  return initializing ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>PBS</Text>
        <Input
          placeholder='Kimlik Numarası'
          containerStyle={styles.inputWrapper}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChangeText={setUsername}
          value={username}
          autoCapitalize='none'
          keyboardType='numeric'
          autoCorrect={false}
          maxLength={11}
          disabled={loading}
          selectionColor={colors.primary}
        />
        <Input
          placeholder='Şifre'
          containerStyle={styles.inputWrapper}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChangeText={setPassword}
          value={password}
          autoCapitalize='none'
          secureTextEntry={true}
          autoCorrect={false}
          errorMessage={message}
          errorStyle={styles.message(fetching)}
          disabled={loading}
          selectionColor={colors.primary}
        />
        <View style={styles.checkOuterContainer(message)}>
          <View style={styles.checkContainer}>
            <CheckBox
              value={rememberMe}
              onValueChange={newValue => setRememberMe(newValue)}
              tintColors={{ true: colors.primary, false: colors.muted }}
              boxType='square'
              onCheckColor={colors.primary}
              disabled={loading}
            />
            <Text style={styles.checkText}>Beni hatırla</Text>
          </View>
          <View style={styles.checkContainer}>
            <CheckBox
              value={keepMeLoggedIn}
              onValueChange={newValue => {
                setKeepMeLoggedIn(newValue)
              }}
              tintColors={{ true: colors.primary, false: colors.muted }}
              boxType='square'
              onCheckColor={colors.primary}
              disabled={loading}
            />
            <Text style={styles.checkText}>Oturumumu açık tut</Text>
          </View>
        </View>
        <Button
          loading={loading}
          title='Giriş'
          buttonStyle={{ paddingHorizontal: 25, marginTop: message ? 15 : 10, borderRadius: 0 }}
          containerStyle={{ borderRadius: 0, marginTop: 10 }}
          titleStyle={{ fontFamily: fonts.oxygen }}
          onPress={handleSubmit}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  message: fetching => {
    return {
      color: fetching ? colors.success : colors.danger,
      marginLeft: 0,
      marginTop: 10,
      fontFamily: fonts.oxygenLight,
      fontSize: 13
    }
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light
  },
  wrapper: {
    width: 250,
    alignItems: 'center'
  },
  checkOuterContainer: message => {
    return {
      alignSelf: 'stretch',
      marginTop: message ? 0 : -15
    }
  },
  checkContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5
  },
  checkText: {
    fontSize: 13.5,
    marginLeft: 4
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.oxygenBold,
    marginBottom: 25,
    color: colors.secondary
  },
  inputWrapper: {
    width: 250
  },
  inputContainer: {
    borderBottomColor: colors.secondary,
    height: 32
  },
  input: {
    color: colors.secondary,
    fontSize: 16,
    paddingLeft: 3,
    fontFamily: fonts.oxygen
  }
})
