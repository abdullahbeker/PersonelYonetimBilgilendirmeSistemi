import React, { useState, useEffect, useContext, Component } from 'react'
import { useHistory, Link } from 'react-router-dom'
import api, { handleGetAsync, handlePostAsync } from '../../base/api'
import { ToastDispatchContext } from '../../contexts/ToastContext'
import { Multiselect } from 'multiselect-react-dropdown'
import { CRow, CCol, CCollapse, CCardBody, CContainer, CSpinner, CCard, CLabel } from '@coreui/react'

const AttendTrain = props => {
  const history = useHistory()
  const toastDispatch = useContext(ToastDispatchContext)
  const [trains, setTrains] = useState()
  const [selectedTrain, setSelectedTrain] = useState()
  const [personnels, setPersonnels] = useState([])
  const [selectedPersonnels, setSelectedPersonnels] = useState([])
  const [isPersonnelsLoading, setIsPersonnelsLoading] = useState(true)

  const onPersonnelSelect = (list, item) => {
    setSelectedPersonnels(selectedPersonnels => [...selectedPersonnels, item.id])
  }
  const onPersonnelRemove = (list, item) => {
    setSelectedPersonnels(selectedPersonnels.filter(i => i !== item.id))
  }

  const onTrainSelect = (list, item) => {
    setSelectedTrain(item)
  }
  const onTrainRemove = (list, item) => {
    setTrains()
  }
  const handleSubmit = e => {
    e.preventDefault()
    console.log(selectedPersonnels)
    console.log(selectedTrain)
    const postData = { trainingId: selectedTrain.id, personnelList: selectedPersonnels }
    handlePostAsync(
      api,
      'api/training/trainingattends',
      postData,
      () => {
        toastDispatch({ type: 'success', message: 'Eğitim atamaları başarıyla yapıldı.' })
        history.push('/trains')
      },
      toastDispatch,
      null
    )
  }
  useEffect(() => {
    handleGetAsync(
      api,
      '/api/training/GetAllTrainings',
      res => {
        setTrains(res.data)
        console.log(res.data)
      },
      toastDispatch,
      null
    )
    handleGetAsync(
      api,
      'api/admin/personnel/PersonnelListShortDetail',
      res => {
        setPersonnels(res.data)
        setIsPersonnelsLoading(false)
        console.log(res.data)
      },
      toastDispatch,
      null
    )
  }, [])
  return (
    <CCard style={{ backgroundColor: '#f9f9f9' }} className='p-3'>
      <form action=''>
        <CRow>
          <CCol lg='6'>
            <CLabel>Eğitim</CLabel>
            <Multiselect
              options={trains}
              // loading={isPersonnelsLoading}
              // loadingMessage='lütfen bekleyiniz...'
              avoidHighlightFirstOption
              singleSelect={true}
              hidePlaceholder={true}
              displayValue='trainingName'
              // onRemove={onTrainRemove}
              onSelect={onTrainSelect}
              placeholder='Eğitim seçin'
            />
          </CCol>
          <CCol lg='6'>
            <CLabel>Katılacak Personeller</CLabel>
            <Multiselect
              options={personnels}
              loading={isPersonnelsLoading}
              loadingMessage='lütfen bekleyiniz...'
              showCheckbox={true}
              avoidHighlightFirstOption
              hidePlaceholder={true}
              displayValue='fullName'
              onRemove={onPersonnelRemove}
              onSelect={onPersonnelSelect}
              placeholder='Personelleri seçin'
            />
          </CCol>
        </CRow>
        <button className='btn btn-primary float-right mt-3' onClick={handleSubmit}>
          Ata
        </button>
      </form>
    </CCard>
  )
}
export default AttendTrain
