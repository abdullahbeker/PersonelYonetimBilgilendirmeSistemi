import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Text from './CustomText'
import { colors, fonts } from '../custom/Theme'

export default ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={disabled ? disabled : false}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: colors.primary,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: colors.light,
    fontFamily: fonts.oxygen
  }
})
