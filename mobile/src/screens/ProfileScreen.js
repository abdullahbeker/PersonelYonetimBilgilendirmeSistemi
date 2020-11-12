import React, { useContext } from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import Text from '../components/CustomText'
import PersonelInfo from '../components/PersonelInfo'
import Constants from 'expo-constants'
import BorderedBox from '../components/BorderedBox'
import { colors, fonts } from '../custom/Theme'
import { UserContext } from '../contexes/UserContext'

const ProfileScreen = props => {
  const userState = useContext(UserContext)
  const { user } = userState
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.user}>
        <Image style={styles.userImage} source={{ uri: `data:image/${user.avatarExt};base64,${user.pp}` }} />
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{user.firstName + ' ' + user.lastName}</Text>
          <Text style={styles.userInfo}>{user.department}</Text>
          <Text style={styles.userInfo}>{user.division} </Text>
          <Text style={styles.userInfo}>#{user.personnelNumber} </Text>
        </View>
      </View>
      <View showsVerticalScrollIndicator={false} style={styles.flow}>
        <BorderedBox label='Kişisel Bilgiler'>
          <PersonelInfo title='Kimlik Numarası' value={user.identity} />
          <PersonelInfo title='Doğum Tarihi' value={user.birthday} />
          <PersonelInfo title='Medeni Durum' value={user.maritalStatus} />
          <PersonelInfo title='Kan Grubu' value={user.bloodGroup} />
          <PersonelInfo title='Cep Telefonu' value={user.phoneNumber} />
          <PersonelInfo title='Adres' value={user.fullAdress} />
        </BorderedBox>
        <BorderedBox label='Eğitim Bilgileri'>
          <PersonelInfo title='Mezuniyet' value={user.graduation} />
          <PersonelInfo title='Mezuniyet Bölümü' value={user.graduationDepartment} />
        </BorderedBox>
        <BorderedBox label='Diğer'>
          <PersonelInfo title='İşveren Firma' value={user.employerCompany} />
          <PersonelInfo title='SGK İlk Giriş' value={user.sgkFirstEnter} />
          <PersonelInfo title='İşe Başlama Tarihi' value={user.startingDateOfWork} />
        </BorderedBox>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.light
  },
  user: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingVertical: 10,
    borderRightWidth: 2,
    borderColor: colors.primary,
    marginHorizontal: 15
  },
  userImage: {
    width: 80,
    height: 80,
    resizeMode: 'stretch',
    borderRadius: 2
  },
  userInfoContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  userInfo: {
    fontSize: 12,
    color: colors.muted
  },
  userName: {
    textTransform: 'uppercase',
    color: colors.secondary,
    fontFamily: fonts.oxygenBold
  },
  flow: {
    alignSelf: 'stretch',
    marginHorizontal: 15,
    marginTop: 20,
    position: 'relative'
  }
})

export default ProfileScreen
