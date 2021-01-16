import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import Text from '../components/CustomText'
import PersonelInfo from '../components/PersonelInfo'
import Constants from 'expo-constants'
import BorderedBox from '../components/BorderedBox'
import { colors, fonts } from '../custom/Theme'
import api from '../api'
import { AuthContext } from '../contexes/AuthContext'
import Loading from '../components/Loading'

const ProfileScreen = () => {
  const { id } = useContext(AuthContext)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get(`/api/admin/personnel/personneldetails?personnelId=${id}`)
      .then(res => {
        setUser(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])
  if (loading) return <Loading />
  else
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.user}>
          <Image style={styles.userImage} source={{ uri: `data:${user.imageContentType};base64, ${user.imageData}` }} />
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{user.name + ' ' + user.surname}</Text>
            <Text style={styles.userInfo}>{user.department}</Text>
            <Text style={styles.userInfo}>{user.duty} </Text>
            <Text style={styles.userInfo}>#{user.personnelNumber}</Text>
          </View>
        </View>
        <View showsVerticalScrollIndicator={false} style={styles.flow}>
          <BorderedBox label='Kişisel Bilgiler'>
            <PersonelInfo title='Kullanıcı Adı' value={user.username} />
            <PersonelInfo title='E-Posta Adresi' value={user.email} />
            <PersonelInfo title='Telefon Numarası' value={user.phoneNumber} />
            <PersonelInfo title='Adres' value={user.description + ' ' + user.district + '/' + user.province} />
          </BorderedBox>
          <BorderedBox label='Firma Bilgileri'>
            <PersonelInfo title='İşveren Firma' value={user.employerCompany} />
            <PersonelInfo
              title='İşe Başlama Tarihi'
              value={new Date(user.startingDateOfEmployment).toLocaleDateString()}
            />
          </BorderedBox>
          <BorderedBox label='Eğitim Bilgileri'>
            <PersonelInfo title='Mezuniyet' value={user.graduation ? user.graduation : 'Bilgi Yok'} />
            <PersonelInfo
              title='Mezuniyet Bölümü'
              value={user.graduationDepartment ? user.graduationDepartment : 'Bilgi Yok'}
            />
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
