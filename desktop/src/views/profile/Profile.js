import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import api, { handleGetAsync } from '../../base/api'
import { ToastDispatchContext } from '../../contexts/ToastContext'
import { CContainer, CSpinner, CImg, CRow, CCol, CLabel, CCardText } from '@coreui/react'

const Profile = props => {
  const { id } = useContext(UserContext)
  const toastDispatch = useContext(ToastDispatchContext)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState('')
  useEffect(() => {
    handleGetAsync(
      api,
      `/api/admin/personnel/PersonnelDetails?personnelid=${id}`,
      res => {
        setUser(res.data)
        setIsLoading(false)
      },
      toastDispatch,
      res => {}
    )
  }, [user])
  if (isLoading) {
    return (
      <div className='d-flex justify-content-center'>
        <CSpinner></CSpinner>
      </div>
    )
  }
  return (
    <CContainer>
      <CRow>
        <CCol lg='4'>
          <CRow>
            <CCol lg='12'>
              <CImg className='mt-2' align='center' fluid src={`data:image/jpeg;base64,${user.imageData}`} width='200px' />
              <CContainer className='text-left mt-1 ml-2'>
                <h4>{user.name + ' ' + user.surname} </h4>
              </CContainer>
            </CCol>
            <CRow>
              {/* <CContainer className='mt-3 ml-2'>
                <CLabel>
                  <strong>#{user.personnelNumber}</strong>
                </CLabel>
                <br />
                <CLabel>
                  <strong>Departman: </strong> {user.department}
                </CLabel>
                <br />
                <CLabel>
                  <strong>Şirket Adı: </strong> {user.employerCompany}
                </CLabel>
                <br />
                <CLabel>
                  <strong>İşe Başlama Tarihi: </strong> {new Date(user.startingDateOfEmployment).toLocaleString('tr-TR', { timeZone: 'UTC' })}
                </CLabel>
                <br />
                <CLabel>
                  <strong>SGK İlk Girişi: </strong> {new Date(user.sgkFirstEntry).toLocaleString('tr-TR', { timeZone: 'UTC' })}
                </CLabel>
                <hr />
              </CContainer> */}
            </CRow>
          </CRow>
        </CCol>
        <CCol lg='8'>
          <h4>Genel Bilgiler</h4>
          <CContainer className='ml-1'>
            <CLabel>
              <strong>Ad: </strong> {user.name}
            </CLabel>
            <br />
            <CLabel>
              <strong>Soyad: </strong> {user.surname}
            </CLabel>
            <br />
            <CLabel>
              <strong>Gender: </strong> {user.gender}
            </CLabel>
            <br />
            <CLabel>
              <strong>Kan Grubu: </strong> {user.bloodType}
            </CLabel>
            <br />
            <CLabel>
              <strong>Mezun Olduğu Bölüm: </strong> {user.graduationDepartment}
            </CLabel>
            <br />
            <CLabel>
              <strong>Medeni Durumu: </strong> {user.maritalStatus}
            </CLabel>
          </CContainer>
          <hr />
          <h4>İletişim Bilgileri</h4>
          <CContainer className='ml-1'>
            <CLabel>
              <strong>İkamet İl: </strong> {user.province}
            </CLabel>
            <br />
            <CLabel>
              <strong>İkamet İlçe: </strong> {user.district}
            </CLabel>
            <br />
            <CLabel>
              <strong>Telefon Numarası: </strong> {user.phoneNumber}
            </CLabel>
            <br />
            <CLabel>
              <strong>E-posta: </strong> {user.email}
            </CLabel>
          </CContainer>
          <hr />
          <h4>Firma Bilgileri</h4>
          <CContainer className='ml-1'>
            <CLabel>
              <strong>Departman: </strong> {user.department}
            </CLabel>
            <br />
            <CLabel>
              <strong>Şirket Adı: </strong> {user.employerCompany}
            </CLabel>
            <br />
            <CLabel>
              <strong>İşe Başlama Tarihi: </strong> {new Date(user.startingDateOfEmployment).toLocaleString('tr-TR', { timeZone: 'UTC' })}
            </CLabel>
            <br />
            <CLabel>
              <strong>SGK İlk Girişi: </strong> {new Date(user.sgkFirstEntry).toLocaleString('tr-TR', { timeZone: 'UTC' })}
            </CLabel>
          </CContainer>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Profile
