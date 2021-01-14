import React from 'react'
import { StyleSheet, View } from 'react-native'

import ListElement from '../components/ListElement'

const ModulesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ListElement
          label='İzin'
          to={() => {
            navigation.navigate('Leaves')
          }}
        />
        <ListElement
          label='Eğitim'
          to={() => {
            navigation.navigate('Trainings')
          }}
        />
      </View>
      <View style={styles.row}>
        <ListElement
          label='Zimmet'
          to={() => {
            navigation.navigate('Assets')
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
