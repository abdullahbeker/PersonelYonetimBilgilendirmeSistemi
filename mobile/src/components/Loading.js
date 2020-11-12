import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { colors } from '../custom/Theme'

const Loading = props => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' } })

export default Loading
