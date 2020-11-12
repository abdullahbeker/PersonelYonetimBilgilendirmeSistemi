import React from 'react'
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
import Text from './CustomText'
import { colors, fonts } from '../custom/Theme'
import BorderedBox from './BorderedBox'

const ListElement = ({ label, to }) => {
  return (
    <TouchableHighlight onPress={to}>
      <BorderedBox containerStyles={styles.containerStyles}>
        <Text style={styles.label}>{label}</Text>
      </BorderedBox>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.oxygen,
    paddingVertical: 30,
    color: colors.light,
    fontSize: 15
  },
  containerStyles: {
    marginVertical: 0,
    minWidth: 130,
    alignItems: 'center',
    backgroundColor: colors.primary,
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

export default ListElement
