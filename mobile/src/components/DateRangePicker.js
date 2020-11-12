import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Text from './CustomText'
import { fonts, colors } from '../custom/Theme'

const DateRangePicker = ({ startValue, endValue, onStartChange, onEndChange, startLabel, endLabel }) => {
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)

  const onStartPickerValueChange = (e, selectedDate) => {
    setShowStartPicker(false)
    onStartChange(selectedDate)
  }

  const onEndPickerValueChange = (e, selectedDate) => {
    setShowEndPicker(false)
    onEndChange(selectedDate)
  }

  return (
    <>
      {showStartPicker && <DateTimePicker mode={'date'} value={startValue} onChange={onStartPickerValueChange} />}
      {showEndPicker && <DateTimePicker mode={'date'} value={endValue} onChange={onEndPickerValueChange} />}
      <Text
        style={{
          marginTop: 5,
          marginBottom: 5,
          fontFamily: fonts.oxygenLight
        }}>
        {startLabel ? startLabel : 'İzin Başlangıç Tarihi'}
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: colors.primaryLight, paddingVertical: 7, marginBottom: 10 }}
        onPress={() => {
          setShowStartPicker(true)
        }}>
        <Text style={{ textAlign: 'center' }}>{startValue.toLocaleDateString()}</Text>
      </TouchableOpacity>

      <Text
        style={{
          marginTop: 5,
          marginBottom: 5,
          fontFamily: fonts.oxygenLight
        }}>
        {endLabel ? endLabel : 'İşe Dönüş Tarihi'}
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: colors.primaryLight, paddingVertical: 7, marginBottom: 10 }}
        onPress={() => {
          setShowEndPicker(true)
        }}>
        <Text style={{ textAlign: 'center' }}>{endValue.toLocaleDateString()}</Text>
      </TouchableOpacity>
    </>
  )
}

export default DateRangePicker
