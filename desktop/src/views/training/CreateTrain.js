import React, { useState, useContext } from 'react'
import api, { handlePostAsync } from '../../base/api'
import { ToastDispatchContext } from '../../contexts/ToastContext'
import { useHistory } from 'react-router-dom'
import { CRow, CForm, CCol, CInput, CFormGroup, CContainer, CLabel, CInputFile, CImg, CButton, CCard } from '@coreui/react'

const CreateTrain = props => {
  const [formData, setFormData] = useState({})
  const toastDispatch = useContext(ToastDispatchContext)
  const history = useHistory()

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    setFormData({ ...formData, status: 0 })
    let fd = new FormData()
    for (var key in formData) {
      fd.append(key, formData[key])
    }
    handlePostAsync(
      api,
      '/api/training/addtraining',
      formData,
      () => {
        toastDispatch({ type: 'success', message: 'Eğitim başarıyla oluşturuldu.' })
        history.push('/trains')
      },
      toastDispatch,
      () => {}
    )
  }

  return (
    <CCard style={{ backgroundColor: '#f9f9f9' }} fluid className='p-3'>
      <CRow>
        <CCol sm='6'>
          <h4>Eğitim Bilgileri</h4>
          <hr />
          <CForm onSubmit={handleSubmit}>
            <CFormGroup>
              <CLabel htmlFor=''>Eğitim Adı</CLabel>
              <CInput type='text' id='TrainingName' name='TrainingName' onChange={handleChange} placeholder='Eğitim Adı' />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor=''>Eğitim Başlangıç Tarihi</CLabel>
              <input name='StartDate' id='StartDate' type='date' className='form-control' onChange={handleChange} />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor=''>Eğitim Bitiş Tarihi</CLabel>
              <input name='FinishDate' id='FinishDate' type='date' className='form-control' onChange={handleChange} />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor=''>Detaylar</CLabel>
              <textarea class='form-control' id='Detail' name='Detail' onChange={handleChange} placeholder='Detaylar' rows='3'></textarea>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor=''>Konum</CLabel>
              <CInput type='text' id='Location' name='Location' onChange={handleChange} placeholder='Konum' />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor=''>Eğitimci Firma</CLabel>
              <CInput type='text' id='EducatingFirm' name='EducatingFirm' onChange={handleChange} placeholder='Eğitimci Firma Bilgileri' />
            </CFormGroup>
          </CForm>
        </CCol>
        <CCol sm='6'>
          <h4>Eğitmen Bilgileri</h4>
          <hr />
          <CForm action='' method='post'>
            <CFormGroup>
              <CLabel htmlFor=''>Ad Soyad</CLabel>
              <CInput type='text' id='instructor' name='instructor' onChange={handleChange} placeholder='Ad Soyad' />
            </CFormGroup>
          </CForm>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CButton color='primary' onClick={handleSubmit} className='float-right'>
            Kaydet
          </CButton>
        </CCol>
      </CRow>
    </CCard>
  )
}

export default CreateTrain
