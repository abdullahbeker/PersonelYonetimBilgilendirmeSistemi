import React, { useContext, useRef } from 'react'
import { StyleSheet, Animated, TouchableOpacity } from 'react-native'
import Text from './CustomText'
import { MessageContext, MessageDispatchContext } from '../contexes/MessageContext'
import { colors } from '../custom/Theme'
import { useEffect } from 'react'

export default ({}) => {
  const { message, messageType } = useContext(MessageContext)
  const messageDispatch = useContext(MessageDispatchContext)
  /* 
    messageType: 'success' | 'warning' | 'error'
  */

  const slideAnimation = useRef(new Animated.Value(70)).current

  const slideIn = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start()
  }

  const slideOut = () => {
    Animated.timing(slideAnimation, {
      toValue: 70,
      duration: 400,
      useNativeDriver: true
    }).start(() => messageDispatch({ message: '' }))
  }

  useEffect(() => {
    if (!message) return
    slideIn()
    setTimeout(slideOut, 4000)
  }, [message])

  return message ? (
    <Animated.View style={[styles.alertContainer(messageType), { translateY: slideAnimation }]}>
      <Text style={styles.alertText(messageType)}>{message}</Text>
    </Animated.View>
  ) : (
    <></>
  )
}

const styles = StyleSheet.create({
  alertContainer: messageType => {
    return {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: messageType == 'success' ? colors.successLight : messageType == 'warning' ? colors.warningLight : colors.dangerLight,
      borderBottomWidth: 1,
      borderBottomColor: messageType == 'success' ? '#c3e6cb' : messageType == 'warning' ? '#ffeeba' : '#f8d7da',
      zIndex: 100,
      height: 70,
      paddingHorizontal: 10,
      justifyContent: 'center',
      opacity: 1
    }
  },
  alertText: messageType => {
    return {
      color: messageType == 'success' ? colors.success : messageType == 'warning' ? colors.warning : colors.danger
    }
  }
})
