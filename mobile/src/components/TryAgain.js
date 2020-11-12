import React from 'react'
import { StyleSheet, View } from 'react-native'
import { fonts } from '../custom/Theme'
import { Button } from 'react-native-elements'

const Loading = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Button
        //title='Yeniden Dene'
        onPress={onPress}
        icon={{
          name: 'refresh',
          size: 25,
          color: 'white',
          type: 'evilicons'
        }}
        buttonStyle={{ borderRadius: 0, padding: 13 }}
        containerStyle={{ borderRadius: 0, padding: 20 }}
        titleStyle={{ fontFamily: fonts.oxygen, fontSize: 14 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' } })

export default Loading
