import React, { useState, useContext } from 'react'
import api, { handlePostWithImageAsync } from '../../base/api'
import { ToastDispatchContext } from '../../contexts/ToastContext'
import { useHistory } from 'react-router-dom'
import { CRow, CForm, CCol, CInput, CFormGroup, CContainer, CLabel, CInputFile, CImg, CButton, CCard } from '@coreui/react'
import $ from 'jquery'

const CreatePersonnel = props => {
  const [formData, setFormData] = useState({})
  const toastDispatch = useContext(ToastDispatchContext)
  const history = useHistory()

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  const handleImage = e => {
    if (typeof e !== 'string') {
      const image = e.target.files[0]
      setFormData({ ...formData, image: image })
      var reader = new FileReader()
      reader.onload = function (e) {
        $('#imagePlaceholder').attr('src', e.target.result)
        handleImage(e.target.result)
      }
      reader.readAsDataURL(image)
    }
  }
  const handleSubmit = e => {
    e.preventDefault()
    const file = formData.image
    let fd = new FormData()
    fd.append('image', file)
    for (var key in formData) {
      fd.append(key, formData[key])
    }
    handlePostWithImageAsync(
      api,
      '/api/admin/personnel/personneladd',
      fd,
      () => {
        toastDispatch({ type: 'success', message: 'Kişi başarıyla eklendi.' })
        history.push('/personnels')
      },
      toastDispatch,
      () => {}
    )
    // api
    //   .post('/api/admin/personnel/personneladd', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    //   .then(res => console.log())
    //   .catch(err => console.log({ err }))
  }

  return (
    <CCard fluid className='p-3'>
      <CRow>
        <CCol sm='2'>
          <CImg
            width='80%'
            id='imagePlaceholder'
            src='https://urbaned.tcnj.edu/wp-content/uploads/sites/85/2019/10/placeholder-profile-1.png'
            alt=''
          />
          <CFormGroup className='mt-3'>
            <CInputFile id='image' name='image' onChange={handleImage} />
          </CFormGroup>
        </CCol>
        <CCol sm='5'>
          <h4>Çalışan Bilgileri</h4>
          <hr />
          <CForm onSubmit={handleSubmit}>
            <CFormGroup>
              <CLabel htmlFor=''>Personel Numarası</CLabel>
              <CInput type='text' id='personnelNumber' name='personnelNumber' onChange={handleChange} placeholder='Personel Numarası' />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor=''>İşveren Firma</CLabel>
              <CInput type='text' id='employerCompany' name='employerCompany' onChange={handleChange} placeholder='İşveren Firma' />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor=''>Departman</CLabel>
              <CInput type='text' id='department' name='department' onChange={handleChange} placeholder='Departman' />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor=''>Görevi</CLabel>
              <CInput type='text' id='duty' name='duty' onChange={handleChange} placeholder='Görevi' />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor=''>Cep Telefonu</CLabel>
              <CInput type='text' id='phoneNumber' name='phoneNumber' onChange={handleChange} placeholder='(5XX) XXX XX XX' />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor=''>Adres</CLabel>
              <textarea class='form-control' id='description' name='description' onChange={handleChange} placeholder='Açık Adres' rows='3'></textarea>
            </CFormGroup>
          </CForm>
        </CCol>
        <CCol sm='5'>
          <h4>Kişisel Bilgiler</h4>
          <hr />
          <CForm action='' method='post'>
            <CFormGroup>
              <CLabel htmlFor=''>Ad</CLabel>
              <CInput type='text' id='name' name='name' onChange={handleChange} placeholder='Ad' />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor=''>Soyad</CLabel>
              <CInput type='text' id='surname' name='surname' onChange={handleChange} placeholder='Soyad' />
            </CFormGroup>
            <div className='form-group'>
              <label>Cinsiyet</label>
              <select className='form-control' id='genderId' name='genderId' onChange={handleChange}>
                <option disabled selected>
                  Cinsiyet Seçiniz
                </option>
                <option value='1'>Erkek</option>
                <option value='2'>Kadın</option>
              </select>
            </div>
            <CFormGroup>
              <CLabel htmlFor=''>E-posta</CLabel>
              <CInput type='email' id='email' name='email' placeholder='Email' onChange={handleChange} />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor=''>Kullanıcı Adı</CLabel>
              <CInput type='text' id='username' name='username' placeholder='Kullanıcı Adı' autoComplete='new-password' onChange={handleChange} />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor=''>Şifre</CLabel>
              <CInput type='password' id='password' name='password' placeholder='Şifre' autoComplete='new-password' onChange={handleChange} />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor=''>İşe başlama tarihi</CLabel>
              <input name='startingDateOfEmployment' id='startingDateOfEmployment' type='date' className='form-control' onChange={handleChange} />
            </CFormGroup>
          </CForm>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CButton color='primary' onClick={handleSubmit} className='float-right '>
            Kaydet
          </CButton>
        </CCol>
      </CRow>
    </CCard>
  )
}

export default CreatePersonnel
