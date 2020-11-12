import React from 'react'
import { StyleSheet, View } from 'react-native'
import Text from './CustomText'
import { colors, fonts } from '../custom/Theme'

export default ({ children, label, containerStyles, labelStyles }) => {
  return (
    <View style={{ ...styles.outer, ...containerStyles }}>
      {label && <Text style={{ ...styles.label, ...labelStyles }}>{label}</Text>}
      <View style={styles.inner}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    borderWidth: 2,
    borderColor: colors.primary,
    marginVertical: 10
  },
  inner: {
    padding: 10
  },
  label: {
    textTransform: 'uppercase',
    fontFamily: fonts.oxygenBold,
    fontSize: 11,
    marginTop: -7.8,
    backgroundColor: colors.light,
    alignSelf: 'flex-end',
    marginRight: 15,
    paddingHorizontal: 7,
    color: colors.secondary
  }
})
