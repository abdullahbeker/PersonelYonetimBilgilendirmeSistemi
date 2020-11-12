import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Container from '../components/Container'
import Table from '../components/Table'
import Text from '../components/CustomText'
import { colors, fonts } from '../custom/Theme'
import { componentifyLeaveRequests, rows } from '../helpers/leaveRequests'
import api from '../api'
import { UserContext } from '../contexes/UserContext'
import FetchAndRefreshIfFails from '../components/FetchAndRefreshIfFails'
import { MessageDispatchContext } from '../contexes/MessageContext'
import Notification from '../components/Notification'

export default ({}) => {
  const { user } = useContext(UserContext)
  const messageDispatch = useContext(MessageDispatchContext)
  const [leaves, setLeaves] = useState([])
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState(null)

  const fetchLeaves = async () => {
    try {
      setFetching(true)
      if (error) setError(null)
      const res = await api.get(`/api/annualleave/getAllLeaveRequestsByPersonnelId/${user.id}`)
      setLeaves(res.data)
    } catch (err) {
      messageDispatch({ message: 'Bir hata oluştu lütfen daha sonra tekrar deneyin' })
      setError(err)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchLeaves()
  }, [])

  return (
    <>
      <Notification />
      <Container>
        <FetchAndRefreshIfFails error={error} onRefreshPress={fetchLeaves} fetching={fetching}>
          <Text style={styles.title}>GEÇMİŞ İZİNLER</Text>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Table rows={rows(true)} cols={componentifyLeaveRequests(leaves, () => {}, true)} />
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
    marginBottom: 20,
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
