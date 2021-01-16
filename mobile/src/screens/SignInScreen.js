import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements'
import api from '../api'
import Text from '../components/CustomText'
import { colors, fonts } from '../custom/Theme'
import { AuthDispatchContext } from '../contexes/AuthContext'
import { setAuthToken, removeAuthToken } from '../api/auth'
import JwtDecode from 'jwt-decode'

export default () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const setAuthState = useContext(AuthDispatchContext)

  const handleSubmit = async () => {
    if (message) setMessage('')
    if (!username || !password) {
      setMessage('Lütfen tüm alanları doldurunuz')
      return
    }
    setLoading(true)
    try {
      let res = await api.post('/api/auth/signin', {
        username,
        password
      })
      if (!res.data || !res.data.token) {
        setMessage('Yanlış kullanıcı adı veya şifre')
        setLoading(false)
        return
      }
      const { id } = JwtDecode(res.data.token)
      setAuthToken(res.data.token, api)
      setAuthState({ token: res.data.token, id })
    } catch (err) {
      console.log(err.toJSON())
      removeAuthToken(api)
      setMessage('Bir hata oluştu, lütfen daha sonra tekrar deneyin')
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>PYBS</Text>
        <Input
          placeholder='Kullanıcı Adı'
          containerStyle={styles.inputWrapper}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChangeText={setUsername}
          value={username}
          autoCapitalize='none'
          autoCorrect={false}
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
          errorStyle={styles.message}
          disabled={loading}
          selectionColor={colors.primary}
        />
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
  message: {
    color: colors.danger,
    marginLeft: 0,
    marginTop: 10,
    fontFamily: fonts.oxygenLight,
    fontSize: 13
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
