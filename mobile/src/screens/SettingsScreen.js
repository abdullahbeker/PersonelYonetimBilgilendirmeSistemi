import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { colors } from '../custom/Theme'
import { UserDispatchContext } from '../contexes/UserContext'

const SettingsScreen = ({ navigation }) => {
  const userDispatch = useContext(UserDispatchContext)
  return (
    <View style={styles.container}>
      <ListItem
        title='Güvenli Çıkış'
        leftIcon={{ name: 'log-out', type: 'feather' }}
        onPress={async () => {
          userDispatch({ type: 'logout' })
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
