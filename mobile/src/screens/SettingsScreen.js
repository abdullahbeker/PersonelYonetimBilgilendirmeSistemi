import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { colors } from '../custom/Theme'
import { AuthDispatchContext } from '../contexes/AuthContext'

const SettingsScreen = ({ navigation }) => {
  const authSetState = useContext(AuthDispatchContext)
  return (
    <View style={styles.container}>
      <ListItem
        title='Güvenli Çıkış'
        leftIcon={{ name: 'log-out', type: 'feather' }}
        onPress={async () => {
          authSetState({ token: null, id: null })
          navigation.navigate('Modules')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light
  }
})

export default SettingsScreen
