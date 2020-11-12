import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Overlay, Button } from 'react-native-elements'
import Text from './CustomText'
import { colors, fonts } from '../custom/Theme'

export default ({ isVisible, onBackdropPress, title, onYesPress, onNoPress, isYesLoading }) => {
  return (
    <Overlay isVisible={isVisible} onBackdropPress={onBackdropPress} overlayStyle={{ paddingHorizontal: 20, paddingVertical: 40 }}>
      <>
        <Text style={{ marginBottom: 20 }}>{title}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button
            containerStyle={{ borderRadius: 0 }}
            buttonStyle={{ borderRadius: 0, paddingHorizontal: 20, backgroundColor: colors.success }}
            titleStyle={{ fontFamily: fonts.oxygen, fontSize: 13 }}
            title='Evet'
            onPress={onYesPress}
            loading={isYesLoading}
          />
          <Button
            containerStyle={{ borderRadius: 0 }}
            buttonStyle={{ borderRadius: 0, paddingHorizontal: 20, backgroundColor: colors.danger }}
            titleStyle={{ fontFamily: fonts.oxygen, fontSize: 13 }}
            title='Hayır'
            onPress={onNoPress}
          />
        </View>
      </>
    </Overlay>
  )
}

const styles = StyleSheet.create({})
