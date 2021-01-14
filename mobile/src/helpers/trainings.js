import React from 'react'
import Text from '../components/CustomText'
import { Entypo } from 'react-native-vector-icons'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { fonts } from '../custom/Theme'
import { Badge } from 'react-native-elements'

export const getHeaders = () => {
  return [
    <Text style={styles.thText}>Eğitim</Text>,
    <Text style={styles.thText}>Başlangıç</Text>,
    <Text style={styles.thText}>Bitiş</Text>,
    <Text style={styles.thText}>Durum</Text>,
    <Text style={styles.thText}>Detay</Text>
  ]
}

const trainingStatus = {
  0: {
    value: 'Başlamadı',
    color: 'green'
  },
  1: {
    value: 'Başladı',
    color: 'tomato'
  },
  2: {
    value: 'Bitti',
    color: 'gray'
  }
}

export const createRows = (trainings, onDetailPress) => {
  return trainings.map(t => {
    t = t.training
    const { value, color } = trainingStatus[t.status]
    return [
      <Text style={styles.tdText}>
        {t.trainingName.length > 11 ? t.trainingName.slice(0, 11) + '..' : t.trainingName}
      </Text>,
      <Text style={styles.tdText}>{new Date(t.startDate).toLocaleDateString()}</Text>,
      <Text style={styles.tdText}>{new Date(t.finishDate).toLocaleDateString()}</Text>,
      <Badge
        value={value}
        badgeStyle={StyleSheet.flatten([{ alignSelf: 'stretch', marginHorizontal: 5 }, { backgroundColor: color }])}
      />,
      <TouchableOpacity
        onPress={() => {
          onDetailPress(t.id)
        }}>
        <Entypo name='info' size={16} color='dodgerblue' style={{ textAlign: 'center' }} />
      </TouchableOpacity>
    ]
  })
}

const styles = StyleSheet.create({
  thText: { fontFamily: fonts.oxygenBold, textAlign: 'center' },
  tdText: { textAlign: 'center' }
})
