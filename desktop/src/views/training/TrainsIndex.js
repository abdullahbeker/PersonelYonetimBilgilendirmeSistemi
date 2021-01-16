import React, { useState, useContext, useEffect } from 'react'
import api, { handleGetAsync } from '../../base/api'
import { Link } from 'react-router-dom'
import { ToastDispatchContext } from '../../contexts/ToastContext'
import { useHistory } from 'react-router-dom'
import { CDataTable, CBadge, CButton, CCollapse, CCardBody, CContainer, CSpinner, CRow, CCol, CCard } from '@coreui/react'
import { render } from '@testing-library/react'
import { trainsData } from './trainsdata'
const CreateTrain = props => {
  const history = useHistory()
  const [details, setDetails] = useState([])
  const [trains, setTrains] = useState([])
  const toastDispatch = useContext(ToastDispatchContext)
  const [isLoading, setIsLoading] = useState(true)
  const [trainPersonnels, setTrainPersonnels] = useState([])
  let data = []
  const toggleDetails = index => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }
  const getPersonnels = id => {
    handleGetAsync(
      api,
      `/api/training/GetAllPerssonelByTrainingId?trainingId=${id}`,
      res => {
        setTrainPersonnels(res.data.personnelList)
      },
      toastDispatch,
      null
    )
  }
  useEffect(() => {
    handleGetAsync(
      api,
      `/api/training/GetAllTrainingsAndPersonnel`,
      res => {
        let data = []
        res.data.map(val => {
          val.training.appUsers = val.appUsers
          data.push(val.training)
        })
        setTrains(data)
        setIsLoading(false)
      },
      toastDispatch,
      res => {}
    )
  }, [])
  const fields = [
    { key: 'trainingName', label: 'Ad', _style: { width: '25%' } },
    { key: 'startDate', label: 'Başlangıç', _style: { width: '15%' } },
    { key: 'finishDate', label: 'Bitiş', _style: { width: '15%' } },
    { key: 'location', label: 'Yer', _style: { width: '15%' } },
    { key: 'educatingFirm', label: 'Eğitim Veren Firma', _style: { width: '15%' } },
    { key: 'instructor', label: 'Eğitmen', _style: { width: '15%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: true,
      filter: false,
    },
  ]

  const getBadge = status => {
    switch (status) {
      case 'Onaylandı':
        return 'success'
      case 'Onay Bekliyor':
        return 'warning'
      case 'Reddedildi':
        return 'danger'
      default:
        return 'primary'
    }
  }
  const customFilter = { placeholder: 'bir şeyler yazın...', label: 'Ara: ' }

  // if (isLoading) {
  //   return (
  //     <div className='d-flex justify-content-center'>
  //       <CSpinner></CSpinner>
  //     </div>
  //   )
  // }
  return (
    <CCard style={{ backgroundColor: '#f9f9f9' }} fluid className='p-3'>
      <CDataTable
        items={trains}
        fields={fields}
        tableFilter={customFilter}
        itemsPerPageSelect
        itemsPerPage={10}
        hover
        pagination
        scopedSlots={{
          status: item => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),
          show_details: (item, index) => {
            return (
              <td className='py-2'>
                <CButton
                  color='primary'
                  variant='outline'
                  shape='square'
                  size='sm'
                  onClick={() => {
                    toggleDetails(index)
                    getPersonnels(item.id)
                  }}>
                  {details.includes(index) ? 'Hide' : 'Show'}
                </CButton>
              </td>
            )
          },
          details: (item, index) => {
            return (
              <CCollapse className='ml-3' show={details.includes(index)}>
                <h4 className='mt-1'>Eğitim Katılımcıları</h4>
                <hr />
                {item.appUsers.map((val, i) => (
                  <h6>{val.name + ' ' + val.surname}</h6>
                ))}
              </CCollapse>
            )
          },
        }}
      />
    </CCard>
  )
}
export default CreateTrain
