import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Container from '../components/Container'
import Table from '../components/Table'
import Text from '../components/CustomText'
import { colors, fonts } from '../custom/Theme'
import { componentifyLeaveRequests, rows } from '../helpers/leaveRequests'
import api from '../api'
import FetchAndRefreshIfFails from '../components/FetchAndRefreshIfFails'
import { MessageDispatchContext } from '../contexes/MessageContext'
import Notification from '../components/Notification'
import { AuthContext } from '../contexes/AuthContext'
import { Button } from 'react-native-elements'

export default ({ navigation }) => {
  const messageDispatch = useContext(MessageDispatchContext)
  const [leaves, setLeaves] = useState([])
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useContext(AuthContext)

  const fetchLeaves = async () => {
    try {
      setFetching(true)
      if (error) setError(null)
      const res = await api.get(`/api/leave/getAllLeavesByPersonnelId?personnelId=${id}`)
      setLeaves(res.data)
    } catch (err) {
      console.log(err)
      messageDispatch({ message: 'Bir hata oluştu lütfen daha sonra tekrar deneyin' })
      setError(err)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchLeaves()
    })

    return unsubscribe
  }, [navigation])

  const rws = rows()
  const cls = componentifyLeaveRequests(leaves)

  return (
    <>
      <Notification />
      <Container>
        <FetchAndRefreshIfFails error={error} onRefreshPress={fetchLeaves} fetching={fetching}>
          <Text style={styles.title}>İZİNLER</Text>
          <Button
            title='YENİ İZİN TALEBİ'
            onPress={() => {
              navigation.navigate('LeaveRequest')
            }}
            buttonStyle={{ borderRadius: 0, height: 40 }}
            containerStyle={{ borderRadius: 0, marginBottom: 20 }}
            titleStyle={{ fontFamily: fonts.oxygen, fontSize: 14 }}
          />
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Table rows={rws} cols={cls} />
            </ScrollView>
          </ScrollView>
        </FetchAndRefreshIfFails>
      </Container>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 10,
    borderBottomWidth: 1.3,
    borderBottomColor: colors.primary,
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingBottom: 5,
    fontFamily: fonts.oxygenBold
  },
  scroll: {
    paddingBottom: 15,
    overflow: 'hidden',
    flex: 1
  }
})
