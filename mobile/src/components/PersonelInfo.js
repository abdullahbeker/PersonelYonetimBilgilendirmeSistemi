import React from 'react'
import { StyleSheet, View } from 'react-native'
import Text from '../components/CustomText'
import { colors, fonts } from '../custom/Theme'

const PersonelInfo = ({ title, value, horizontal, separator, containerStyles }) => {
  if (separator) if (typeof separator != 'string') separator = '-'
  let valueStyles = { ...styles.value }
  if (horizontal) valueStyles = { ...valueStyles, ...styles.valueHorizontal }
  if (separator) valueStyles = { ...valueStyles, ...styles.valueSeparator }
  if (containerStyles) styles.scroll = { ...styles.scroll, ...containerStyles }

  return (
    <View style={horizontal ? { ...styles.scroll, ...styles.scrollHorizontal } : styles.scroll}>
      <Text style={styles.title}>{title}</Text>
      {separator && <Text style={styles.separator}>{separator}</Text>}
      <Text style={valueStyles}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  scroll: {
    marginBottom: 13
  },
  scrollHorizontal: {
    flexDirection: 'row'
  },
  separator: {
    alignSelf: 'flex-end',
    marginLeft: 8
  },
  title: {
    fontFamily: fonts.oxygenBold,
    color: colors.secondary,
    alignSelf: 'flex-start',
    paddingLeft: 7,
    paddingTop: 5,
    textTransform: 'uppercase',
    fontSize: 13
  },
  value: {
    color: colors.muted,
    alignSelf: 'flex-start',
    paddingLeft: 7,
    paddingTop: 2,
    fontSize: 12.5,
    fontFamily: fonts.oxygenLight
  },
  valueHorizontal: {
    paddingTop: 0,
    alignSelf: 'flex-end',
    marginLeft: 15
  },
  valueSeparator: {
    marginLeft: 0
  }
})

export default PersonelInfo
