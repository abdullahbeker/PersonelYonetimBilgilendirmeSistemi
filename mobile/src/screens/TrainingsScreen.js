import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Container from '../components/Container'
import Table from '../components/Table'
import Text from '../components/CustomText'
import { colors, fonts } from '../custom/Theme'
import { createRows, getHeaders } from '../helpers/trainings'
import api from '../api'
import FetchAndRefreshIfFails from '../components/FetchAndRefreshIfFails'
import { MessageDispatchContext } from '../contexes/MessageContext'
import Notification from '../components/Notification'
import { AuthContext } from '../contexes/AuthContext'
import { Overlay } from 'react-native-elements'
import { View } from 'react-native'

export default ({ navigation }) => {
  const messageDispatch = useContext(MessageDispatchContext)
  const [trainings, setTrainings] = useState([])
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useContext(AuthContext)
  const [showDetail, setShowDetail] = useState(false)
  const [selected, setSelected] = useState()

  const fetchTrainings = async () => {
    try {
      setFetching(true)
      if (error) setError(null)
      const res = await api.get(`/api/training/getAllTrainingsByPersonnelId?personnelId=${id}`)
      setTrainings(res.data)
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
      fetchTrainings()
    })
    return unsubscribe
  }, [navigation])

  const handleTrainingDetail = trainingId => {
    const training = trainings.find(v => v.trainingId == trainingId)
    setSelected(training.training)
    setShowDetail(true)
  }

  const headers = getHeaders()
  const rows = createRows(trainings, handleTrainingDetail)

  return (
    <>
      <Notification />
      <Container>
        <FetchAndRefreshIfFails error={error} onRefreshPress={fetchTrainings} fetching={fetching}>
          <Text style={styles.title}>EĞİTİMLER</Text>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Table rows={headers} cols={rows} />
            </ScrollView>
          </ScrollView>
        </FetchAndRefreshIfFails>
      </Container>
      {showDetail && (
        <Overlay
          onBackdropPress={() => setShowDetail(false)}
          isVisible={true}
          overlayStyle={{ minWidth: 275, paddingVertical: 20 }}>
          <React.Fragment>
            <View style={styles.detailContainer}>
              <Text style={styles.detailLabel}>Eğitim</Text>
              <Text>{selected.trainingName}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailLabel}>Açıklama</Text>
              <Text>{selected.detail}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailLabel}>Eğitmen</Text>
              <Text>{selected.instructor}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailLabel}>Tarih</Text>
              <Text>
                {new Date(selected.startDate).toLocaleDateString() +
                  ' - ' +
                  new Date(selected.finishDate).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailLabel}>Adres</Text>
              <Text>{selected.location}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailLabel}>Eğitim Veren Firma</Text>
              <Text>{selected.educatingFirm}</Text>
            </View>
          </React.Fragment>
        </Overlay>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  detailContainer: {
    marginVertical: 5,
    marginHorizontal: 10
  },
  detailLabel: {
    fontFamily: fonts.oxygenBold
  },
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
