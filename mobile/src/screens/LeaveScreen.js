import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { colors, fonts } from '../custom/Theme'
import Container from '../components/Container'
import ListElement from './../components/ListElement'

export default ({ navigation }) => {
  return (
    <Container containerStyles={{ justifyContent: 'center' }}>
      <View style={styles.row}>
        <ListElement
          label='Ücretli Yıllık İzin'
          to={() => {
            navigation.navigate('PaidAnnualLeaveRequests')
          }}
        />
        <ListElement
          label='Ücretsiz İzin'
          to={() => {
            navigation.navigate('UnpaidLeave')
          }}
        />
      </View>
      <View style={styles.row}>
        <ListElement
          label='Geçmiş İzinler'
          to={() => {
            navigation.navigate('PastLeaves')
          }}
        />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    borderBottomColor: colors.primary,
    borderBottomWidth: 1.3,
    paddingBottom: 5,
    marginTop: 15,
    paddingHorizontal: 15,
    fontFamily: fonts.oxygenBold,
    marginBottom: 30
  },
  inner: {},
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15
  },

  actions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  button: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginHorizontal: 10,
    marginVertical: 10
  },
  buttonText: { color: colors.light, fontFamily: fonts.oxygen }
})
