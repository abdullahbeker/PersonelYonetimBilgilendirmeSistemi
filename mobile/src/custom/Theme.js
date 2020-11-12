import React from 'react'
import { ThemeProvider } from 'react-native-elements'

const primary = '#4d9de0' // 5979ff - 69779b
const secondary = '#2f2519'
const muted = '#52575d'
const light = '#f9f9f9'
const primaryLight = 'rgba(77,157,224,.3)' //

const danger = '#e15554'
const dangerLight = '#f8d7da'
const success = '#3bb273'
const successLight = '#d4edda'
const warning = '#e1bc29'
const warningLight = '#fff3cd'
const disabled = 'gray'

const colors = {
  primary,
  secondary,
  muted,
  light,
  primaryLight,
  danger,
  dangerLight,
  success,
  successLight,
  warning,
  warningLight,
  disabled
}

const inconsolata = 'Inconsolata_400Regular'
const inconsolataBold = 'Inconsolata_700Bold'
const oxygenLight = 'Oxygen_300Light'
const oxygen = 'Oxygen_400Regular'
const oxygenBold = 'Oxygen_700Bold'

const fonts = {
  oxygen,
  oxygenLight,
  oxygenBold,
  inconsolata,
  inconsolataBold
}

export default ({ children }) => {
  return <ThemeProvider theme={{ colors }}>{children}</ThemeProvider>
}

export { colors, fonts }
