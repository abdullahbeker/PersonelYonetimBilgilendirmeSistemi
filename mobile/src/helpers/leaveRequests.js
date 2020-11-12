import React from 'react'
import Text from '../components/CustomText'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { fonts, colors } from '../custom/Theme'
import { Badge } from 'react-native-elements'
import { EvilIcons } from 'react-native-vector-icons'

export const componentifyLeaveRequests = (reqs, onTrashPress, all) => {
  return reqs.map(req => {
    let badgeStatus
    let badgeLabel
    let disabled = true
    if (req.active == false) {
      badgeStatus = 'error'
      badgeLabel = 'İptal'
    } else if (req.status == null) {
      badgeStatus = 'warning'
      badgeLabel = 'Bekliyor'
      disabled = false
    } else if (req.status == true) {
      badgeStatus = 'success'
      badgeLabel = 'Onaylandı'
    } else if (req.status == false) {
      badgeStatus = 'error'
      badgeLabel = 'Reddedildi'
    }
    const arr = [
      <Badge status={badgeStatus} value={badgeLabel} badgeStyle={{ alignSelf: 'stretch', marginHorizontal: 5 }} />,
      <Text style={styles.tdText}>{new Date(req.createdAt).toLocaleDateString()}</Text>,
      <Text style={styles.tdText}>{new Date(req.startDate).toLocaleDateString()}</Text>,
      <Text style={styles.tdText}>{new Date(req.finishDate).toLocaleDateString()}</Text>,
      <Text style={styles.tdText}>
        {req.numberOfDaysWithoutSunday}
        <Text style={{ color: colors.warning }}>{` + ${req.dayDiff - req.numberOfDaysWithoutSunday}`}</Text>
      </Text>
    ]
    all
      ? arr.unshift(
          <Badge
            value={req.type === 'unpaid' ? 'Ücretsiz' : 'Ücretli'}
            badgeStyle={StyleSheet.flatten([
              { alignSelf: 'stretch', marginHorizontal: 5 },
              { backgroundColor: req.type === 'unpaid' ? 'dodgerblue' : 'purple' }
            ])}
          />
        )
      : arr.push(
          <TouchableOpacity
            disabled={disabled}
            onPress={() => {
              onTrashPress(req.id)
            }}>
            <EvilIcons name='trash' size={24} color={disabled ? colors.disabled : colors.danger} style={{ textAlign: 'center' }} />
          </TouchableOpacity>
        )
    return arr
  })
}

export const rows = all => {
  const arr = [
    <Text style={styles.thText}>Durum</Text>,
    <Text style={styles.thText}>Başvuru</Text>,
    <Text style={styles.thText}>Başlangıç</Text>,
    <Text style={styles.thText}>Dönüş</Text>,
    <Text style={styles.thText}>Toplam</Text>
  ]
  all ? arr.unshift(<Text style={styles.thText}>İzin</Text>) : arr.push(<Text style={styles.thText}>Sil</Text>)
  return arr
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
