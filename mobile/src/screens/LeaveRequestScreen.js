import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { colors, fonts } from '../custom/Theme'
import Container from '../components/Container'
import Loading from '../components/Loading'
import api from '../api'
import { AuthContext } from '../contexes/AuthContext'
import { Picker } from '@react-native-picker/picker'
import { nanoid } from 'nanoid/non-secure'
import Text from '../components/CustomText'
import Button from '../components/CustomButton'
import DateRangePicker from '../components/DateRangePicker'
import { dates } from '../helpers/leaveRequests'
import { MessageDispatchContext } from '../contexes/MessageContext'

export default ({ navigation }) => {
  let { now, tomorrow } = dates()
  const messageDispatch = useContext(MessageDispatchContext)

  const [startDate, setStartDate] = useState(now)
  const [returnDate, setReturnDate] = useState(tomorrow)
  const [totalSelectedDay, setTotalSelectedDay] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [disableReason, setDisableReason] = useState('')
  const [requesting, setRequesting] = useState(false)

  const [leaveTypes, setLeaveTypes] = useState()
  const [loading, setLoading] = useState(true)
  const [leaveType, setLeaveType] = useState(0)
  const { id } = useContext(AuthContext)

  useEffect(() => {
    setDisabled(false)
    if (startDate.toLocaleDateString() == returnDate.toLocaleDateString()) {
      setDisableReason('İzin başlangıç ve işe dönüş tarihleri aynı seçilemez')
      setDisabled(true)
      return
    }
    if (startDate.getDay() == 0 || returnDate.getDay() == 0) {
      setDisableReason('İzin başlangıç ve işe dönüş tarihleri pazar günü seçilemez')
      setDisabled(true)
      return
    }

    let countOfSelectedDayWithoutSundey = 0
    let d = new Date(startDate.getTime())
    for (d; d < returnDate; d.setDate(d.getDate() + 1)) {
      d.getDay() != 0 && countOfSelectedDayWithoutSundey++
    }
    setTotalSelectedDay(countOfSelectedDayWithoutSundey)
  }, [startDate, returnDate])

  useEffect(() => {
    api
      .get(`/api/leavetype/getallleavetypes`)
      .then(res => {
        setLeaveTypes(res.data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  const handleOnRequest = () => {
    setDisabled(false)
    if (leaveType === 0) {
      setDisableReason('Lütfen izin tipi seçiniz')
      setDisabled(true)
      return
    }

    api
      .post('/api/leave/addleave', {
        userId: id,
        leaveTypeId: leaveType,
        leaveStartDate: startDate,
        leaveFinishDate: returnDate
      })
      .then(() => {
        messageDispatch({
          message: 'İzin isteği kaydedildi',
          messageType: 'success'
        })
        navigation.navigate('Leaves')
      })
      .catch(err => console.log(err))
  }

  const handleOnPickerChange = (v, _i) => {
    setLeaveType(v)
    setDisabled(false)
  }

  if (loading) return <Loading />
  return (
    <React.Fragment>
      <Container>
        <Text style={styles.title}>YENİ İZİN TALEBİ</Text>

        <Text>İzin Tipi</Text>
        <Picker selectedValue={leaveType} onValueChange={handleOnPickerChange}>
          <Picker.Item label='Seçiniz' value='0' />
          {leaveTypes.map(lt => {
            return <Picker.Item label={lt.leaveName} value={lt.id} key={nanoid()} />
          })}
        </Picker>
        <DateRangePicker
          startValue={startDate}
          endValue={returnDate}
          onStartChange={selectedDate => {
            selectedDate && setStartDate(selectedDate)
          }}
          onEndChange={selectedDate => {
            selectedDate && setReturnDate(selectedDate)
          }}
        />
        <View style={{ marginBottom: 20, marginTop: 10 }}>
          {disabled && <Text style={styles.disableReason}>{disableReason}</Text>}
          <Text>
            Toplam <Text style={{ fontFamily: fonts.oxygenBold }}>{totalSelectedDay}</Text> gün seçildi
          </Text>
        </View>
        <Button disabled={disabled || requesting} title='Talep Et' onPress={handleOnRequest} />
      </Container>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  disableReason: {
    color: colors.danger,
    fontSize: 12,
    marginBottom: 5
  },
  title: {
    alignSelf: 'center',
    borderBottomColor: colors.primary,
    borderBottomWidth: 1.3,
    paddingBottom: 5,
    marginTop: 15,
    paddingHorizontal: 15,
    fontFamily: fonts.oxygenBold,
    marginBottom: 30
  }
})
