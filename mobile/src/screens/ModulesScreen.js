import React from 'react'
import { StyleSheet, View } from 'react-native'

import ListElement from '../components/ListElement'

const ModulesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ListElement
          label='Yıllık İzin'
          to={() => {
            navigation.navigate('Leave')
          }}
        />
        <ListElement
          label='Duyurular'
          to={() => {
            navigation.navigate('Announcement')
          }}
        />
      </View>
      <View style={styles.row}>
        <ListElement
          label='Puantaj'
          to={() => {
            navigation.navigate('Settings')
          }}
        />
        <ListElement
          label='Zimmetler'
          to={() => {
            navigation.navigate('Settings')
          }}
        />
      </View>

      <View style={styles.row}>
        <ListElement
          label='Vardiya'
          to={() => {
            navigation.navigate('Settings')
          }}
        />
        <ListElement
          label='Avans & Borç'
          to={() => {
            navigation.navigate('Settings')
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inner: {
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#24a19c'
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    marginVertical: 20
  }
})

export default ModulesScreen
