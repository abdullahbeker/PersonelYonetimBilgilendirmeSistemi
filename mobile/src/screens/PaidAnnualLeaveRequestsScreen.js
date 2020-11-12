import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import Container from '../components/Container'
import Text from '../components/CustomText'
import { fonts, colors } from '../custom/Theme'
import Table from '../components/Table'
import api from '../api'
import { UserContext } from '../contexes/UserContext'
import Notification from '../components/Notification'
import { MessageDispatchContext } from '../contexes/MessageContext'
import YesNoAlert from '../components/YesNoAlert'
import { componentifyLeaveRequests, rows, dates } from '../helpers/leaveRequests'
import FetchAndRefreshIfFails from '../components/FetchAndRefreshIfFails'
import OverlayWithActions from '../components/OverlayWithActions'
import DateRangePicker from './../components/DateRangePicker'

export default ({}) => {
  const userState = useContext(UserContext)
  const { user } = userState
  let { now, tomorrow } = dates()
  const messageDispatch = useContext(MessageDispatchContext)

  const [error, setError] = useState(null)
  const [paidAnnualLeaves, setPaidAnnualLeaves] = useState([])
  const [fetchingPaidAnnualLeaves, setFetchingPaidAnnualLeaves] = useState(true)
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [remainingLeaveDayCount, setRemainingLeaveDayCount] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [leaveRequestIdToDelete, setLeaveRequestIdToDelete] = useState(0)

  const [startDate, setStartDate] = useState(now)
  const [returnDate, setReturnDate] = useState(tomorrow)
  const [totalSelectedDay, setTotalSelectedDay] = useState(0)
  const [disabled, setDisabled] = useState(null)
  const [requesting, setRequesting] = useState(false)

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

  const handlePaidAnnualLeaveRequest = async () => {
    try {
      setRequesting(true)
      const res = await api.post('/api/annualleave/demandAnnualPaidLeaveRight', {
        startDate,
        finishDate: returnDate,
        personnelId: user.id
      })
      if (res.data) {
        setPaidAnnualLeaves(res.data.list)
        setRemainingLeaveDayCount(res.data.remainingDay)
        setIsOverlayVisible(false)
        messageDispatch({
          message: 'İzin isteği kaydedildi',
          messageType: 'success'
        })
      } else {
        messageDispatch({
          message: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin'
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchAnnualPaidLeaves = async () => {
    try {
      if (error) setError(null)
      const res = await api.get(`/api/annualleave/getRequestedAnnualPaidLeavesById/${user.id}`)
      setPaidAnnualLeaves(res.data.list)
      setRemainingLeaveDayCount(res.data.remainingDay)
    } catch (err) {
      console.log(err)
      messageDispatch({
        message: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin'
      })
      setError(err)
    } finally {
      setFetchingPaidAnnualLeaves(false)
    }
  }

  useEffect(() => {
    fetchAnnualPaidLeaves()
  }, [])

  const deleteLeaveRequest = async () => {
    setDeleting(true)
    try {
      const res = await api.post('/api/annualleave/withdrawAnnualPaidLeaveRequest', {
        demandId: leaveRequestIdToDelete
      })
      if (res) {
        setPaidAnnualLeaves(paidAnnualLeaves.filter(pal => pal.id != leaveRequestIdToDelete))
        setDeleting(false)
        setShowDelete(false)
      } else throw new Error('İzin isteği silinemedi')
    } catch (err) {
      console.log(err)
    }
  }

  const handleLeaveRequestDelete = async id => {
    setLeaveRequestIdToDelete(id)
    setShowDelete(true)
  }

  return (
    <>
      <Notification />
      <Container>
        <FetchAndRefreshIfFails error={error} fetching={fetchingPaidAnnualLeaves} onRefreshPress={fetchAnnualPaidLeaves}>
          <View style={styles.up}>
            <OverlayWithActions
              isVisible={isOverlayVisible}
              onBackdropPress={() => setIsOverlayVisible(false)}
              isSubmitDisabled={disabled}
              isSubmitLoading={requesting}
              onSubmitPress={handlePaidAnnualLeaveRequest}
              onCancelPress={() => setIsOverlayVisible(false)}>
              <Text>Kullanılabilir Gün Sayısı</Text>
              <Text style={{ marginBottom: 10, textAlign: 'center', fontFamily: fonts.oxygenBold, marginTop: 5 }}>{remainingLeaveDayCount}</Text>

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
              title='YENİ ÜCRETLİ İZİN TALEBİ'
              onPress={() => {
                setIsOverlayVisible(!isOverlayVisible)
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
              <Table rows={rows()} cols={componentifyLeaveRequests(paidAnnualLeaves, handleLeaveRequestDelete)} />
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
  thText: { fontFamily: fonts.oxygenBold, textAlign: 'center' },
  tdText: { textAlign: 'center' },
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
  },
  disableReason: {
    color: colors.danger,
    fontSize: 12
  }
})
