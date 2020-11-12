import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import { fonts, colors } from '../custom/Theme'
import api from '../api'
import { UserContext } from '../contexes/UserContext'
import { MessageDispatchContext } from '../contexes/MessageContext'
import { rows, componentifyLeaveRequests, dates } from '../helpers/leaveRequests'

// components
import Notification from '../components/Notification'
import Container from '../components/Container'
import YesNoAlert from '../components/YesNoAlert'
import Text from '../components/CustomText'
import OverlayWithActions from '../components/OverlayWithActions'
import DateRangePicker from '../components/DateRangePicker'
import Table from '../components/Table'
import FetchAndRefreshIfFails from './../components/FetchAndRefreshIfFails'

const UnpaidLeaveScreen = ({}) => {
  let { now, tomorrow } = dates()

  const [error, setError] = useState(null)
  const [unpaidLeaves, setUnpaidLeaves] = useState([])
  const [fetchingUnpaidLeaves, setFetchingUnpaidLeaves] = useState(false)
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [requesting, setRequesting] = useState(false)
  const [startDate, setStartDate] = useState(now)
  const [returnDate, setReturnDate] = useState(tomorrow)
  const [totalSelectedDay, setTotalSelectedDay] = useState(0)
  const [disabled, setDisabled] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [leaveRequestIdToDelete, setLeaveRequestIdToDelete] = useState(0)

  const messageDispatch = useContext(MessageDispatchContext)
  const { user } = useContext(UserContext)

  const fetchUnpaidLeaves = async () => {
    try {
      if (error) setError(null)
      setFetchingUnpaidLeaves(true)
      const res = await api.get(`/api/annualleave/getRequestedAnnualLeavesByPersonnelId/${user.id}`)
      setUnpaidLeaves(res.data)
    } catch (err) {
      messageDispatch({
        message: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin'
      })
      setError(err)
    } finally {
      setFetchingUnpaidLeaves(false)
    }
  }

  const handleUnpaidLeaveRequest = async () => {
    try {
      setRequesting(true)
      const res = await api.post('/api/annualleave/requestAnnualLeave', {
        startDate,
        finishDate: returnDate,
        personnelId: user.id,
        leaveReason: ''
      })
      setUnpaidLeaves(res.data)
      messageDispatch({
        message: 'İzin isteği kaydedildi',
        messageType: 'success'
      })
    } catch (err) {
      console.log(err)
      messageDispatch({
        message: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin'
      })
    } finally {
      setIsOverlayVisible(false)
      setRequesting(false)
      setStartDate(now)
      setReturnDate(tomorrow)
    }
  }

  const deleteLeaveRequest = async () => {
    setDeleting(true)
    try {
      const res = await api.post('/api/annualleave/withdrawAnnualLeaveRequest', {
        requestId: leaveRequestIdToDelete
      })
      setUnpaidLeaves(res.data)
      messageDispatch({ message: 'Ücretsiz izin talebi başarıyla silindi', messageType: 'success' })
    } catch (err) {
      console.log(err)
      messageDispatch({ message: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin' })
    } finally {
      setDeleting(false)
      setShowDelete(false)
    }
  }

  const handleLeaveRequestDelete = id => {
    setLeaveRequestIdToDelete(id)
    setShowDelete(true)
  }

  useEffect(() => {
    if (disabled) setDisabled(null)
    if (startDate.toLocaleDateString() == returnDate.toLocaleDateString()) {
      setDisabled('İzin başlangıç ve işe dönüş tarihleri\naynı seçilemez')
      return
    }
    if (startDate.getDay() == 0 || returnDate.getDay() == 0) {
      setDisabled('İzin başlangıç ve işe dönüş tarihleri\npazar günü seçilemez')
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
    fetchUnpaidLeaves()
  }, [])

  return (
    <>
      <Notification />
      <Container>
        <FetchAndRefreshIfFails error={error} onRefreshPress={fetchUnpaidLeaves} fetching={fetchingUnpaidLeaves}>
          <View style={styles.up}>
            <OverlayWithActions
              isVisible={isOverlayVisible}
              onBackdropPress={() => setIsOverlayVisible(false)}
              isSubmitDisabled={disabled}
              isSubmitLoading={requesting}
              onSubmitPress={handleUnpaidLeaveRequest}
              onCancelPress={() => setIsOverlayVisible(false)}>
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
                {disabled ? (
                  <Text style={styles.disableReason}>{disabled}</Text>
                ) : (
                  <Text>
                    Toplam <Text style={{ fontFamily: fonts.oxygenBold }}>{totalSelectedDay}</Text> gün seçildi
                  </Text>
                )}
              </View>
            </OverlayWithActions>
            <Button
              title='YENİ ÜCRETSİZ İZİN TALEBİ'
              onPress={() => {
                setIsOverlayVisible(true)
              }}
              buttonStyle={{ borderRadius: 0, height: 40 }}
              containerStyle={{ borderRadius: 0 }}
              titleStyle={{ fontFamily: fonts.oxygen, fontSize: 14 }}
            />
          </View>

          <YesNoAlert
            isVisible={showDelete}
            title='Silmek istediğinize emin misiniz?'
            onBackdropPress={() => {
              setShowDelete(false)
            }}
            onYesPress={deleteLeaveRequest}
            onNoPress={() => {
              setShowDelete(false)
            }}
            isYesLoading={deleting}
          />

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Table rows={rows()} cols={componentifyLeaveRequests(unpaidLeaves, handleLeaveRequestDelete)} />
            </ScrollView>
          </ScrollView>
          <Text style={styles.info}>Toplam sütünundaki sarı ile gösterilen sayılar pazar gününe denk gelen gün sayısıdır</Text>
        </FetchAndRefreshIfFails>
      </Container>
    </>
  )
}

const styles = StyleSheet.create({
  up: {
    marginTop: 5,
    marginBottom: 20
  },
  info: {
    fontFamily: fonts.oxygen,
    fontSize: 11,
    marginTop: 10,
    color: colors.muted
  },
  scroll: {
    paddingBottom: 15,
    overflow: 'hidden',
    flex: 1
  }
})
export default UnpaidLeaveScreen
