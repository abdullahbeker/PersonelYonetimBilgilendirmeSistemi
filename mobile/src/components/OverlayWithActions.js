import React from 'react'
import { StyleSheet, View } from 'react-native'
import { fonts, colors } from '../custom/Theme'
import { Overlay, Button } from 'react-native-elements'

export default ({ children, onBackdropPress, isVisible, onSubmitPress, isSubmitLoading, isSubmitDisabled, onCancelPress }) => {
  return (
    <Overlay isVisible={isVisible} overlayStyle={styles.overlayStyle} onBackdropPress={onBackdropPress}>
      <>
        {children}
        <View style={styles.actionsContainer}>
          <Button
            title='Gönder'
            onPress={onSubmitPress}
            loading={isSubmitLoading}
            disabled={isSubmitDisabled}
            buttonStyle={StyleSheet.flatten([{ backgroundColor: colors.success }, styles.actionButton])}
            containerStyle={styles.actionButtonContainer}
            titleStyle={styles.actionButtonTitle}
          />
          <Button
            title='Vazgeç'
            onPress={onCancelPress}
            buttonStyle={StyleSheet.flatten([{ backgroundColor: colors.warning }, styles.actionButton])}
            containerStyle={styles.actionButtonContainer}
            titleStyle={styles.actionButtonTitle}
          />
        </View>
      </>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  overlayStyle: {
    paddingVertical: 25,
    paddingHorizontal: 45
  },
  actionsContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  actionButtonTitle: {
    fontFamily: fonts.oxygen,
    fontSize: 14,
    paddingHorizontal: 10
  },
  actionButtonContainer: {
    borderRadius: 0,
    marginLeft: 10
  },
  actionButton: {
    borderRadius: 0,
    height: 35
  }
})
