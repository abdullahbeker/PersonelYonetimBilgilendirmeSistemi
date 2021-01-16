import React from 'react'
import Text from '../components/CustomText'
import { StyleSheet } from 'react-native'
import { fonts } from '../custom/Theme'
import { Badge } from 'react-native-elements'

export const componentifyLeaveRequests = reqs => {
  return reqs.map(req => {
    return [
      <Text style={styles.tdText}>{req.leaveTypeName}</Text>,
      <Badge
        value={req.isPaid ? 'Ücretli' : 'Ücretsiz'}
        badgeStyle={StyleSheet.flatten([
          { alignSelf: 'stretch', marginHorizontal: 5 },
          { backgroundColor: req.isPaid ? 'dodgerblue' : 'purple' }
        ])}
      />,
      <Text style={styles.tdText}>{new Date(req.leaveStartDate).toLocaleDateString()}</Text>,
      <Text style={styles.tdText}>{new Date(req.leaveFinishDate).toLocaleDateString()}</Text>,
      <Text style={styles.tdText}>{req.status}</Text>
    ]
  })
}

export const rows = () => {
  return [
    <Text style={styles.thText}>İzin</Text>,
    <Text style={styles.thText}>İzin Tipi</Text>,
    <Text style={styles.thText}>Başlangıç</Text>,
    <Text style={styles.thText}>Dönüş</Text>,
    <Text style={styles.thText}>Durum</Text>
  ]
}

export const dates = () => {
  let now = new Date()
  let tomorrow = new Date()
  tomorrow.setDate(now.getDate() + 1)

  if (now.getDay() == 0) {
    now.setDate(now.getDate() + 1)
    tomorrow.setDate(now.getDate() + 1)
  } else if (tomorrow.getDay() == 0) {
    tomorrow.setDate(tomorrow.getDate() + 1)
  }
  return { now, tomorrow }
}

const styles = StyleSheet.create({
  thText: { fontFamily: fonts.oxygenBold, textAlign: 'center' },
  tdText: { textAlign: 'center' }
})
