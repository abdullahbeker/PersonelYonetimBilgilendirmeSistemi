import React from 'react'
import { Text } from 'react-native'
import { fonts } from '../custom/Theme'

const CustomText = ({ children, style }) => {
  return <Text style={{ fontFamily: fonts.oxygenLight, ...style }}>{children}</Text>
}

export default CustomText
