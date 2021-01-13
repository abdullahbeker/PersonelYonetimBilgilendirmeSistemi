import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../custom/Theme'

const Container = ({ children, containerStyles }) => {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.inner, ...containerStyles }}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryLight
  },
  inner: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.light,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }
})

export default Container
