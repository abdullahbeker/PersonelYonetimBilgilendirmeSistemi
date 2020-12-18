import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CDataTable, CBadge, CButton, CCollapse, CCardBody, CContainer } from '@coreui/react'
import { usersData } from './usersData'
const LeaveIndex = props => {
  const history = useHistory()
  const [details, setDetails] = useState([])
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
  const leaveDetailHandler = e => {
    history.push('/leave-detail')
  }
  const fields = [
    { key: 'name', label: 'Ad Soyad', _style: { width: '25%' } },
    { key: 'LeaveTypeName', label: 'İzin Adı' },
    { key: 'LeaveStartDate', label: 'Başlangıç', _style: { width: '15%' } },
    { key: 'LeaveFinishDate', label: 'Bitiş', _style: { width: '15%' } },
    { key: 'status', label: 'Durum', _style: { width: '10%' } },
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

  return (
    <CContainer>
      <CDataTable
        items={usersData}
        fields={fields}
        columnFilter
        tableFilter
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
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
                  }}>
                  {details.includes(index) ? 'Hide' : 'Show'}
                </CButton>
              </td>
            )
          },
          details: (item, index) => {
            if (item.status === 'Onay Bekliyor') {
              return (
                <CCollapse show={details.includes(index)}>
                  <CCardBody>
                    <h4>{item.name}</h4>
                    <h4>Oluşturulma Tarihi :{item.createdAt}</h4>
                    {item.isPaid ? <h4>Ücretli</h4> : <h4>Ücretsiz</h4>}
                    <CButton size='sm' color='primary' onClick={leaveDetailHandler}>
                      İzin İstek Detaylarını Görüntüle
                    </CButton>
                    <CButton size='sm' color='info' className='ml-1'>
                      Personel Sayfasına Git
                    </CButton>
                    <CButton size='sm' color='success' className='ml-1'>
                      Onayla
                    </CButton>
                    <CButton size='sm' color='danger' className='ml-1'>
                      Reddet
                    </CButton>
                  </CCardBody>
                </CCollapse>
              )
            }
            return (
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  <h4>{item.name}</h4>
                  Oluşturulma Tarihi : <h4>{item.createdAt}</h4>
                  <CButton size='sm' color='info'>
                    Personel Sayfasına Git
                  </CButton>
                </CCardBody>
              </CCollapse>
            )
          },
        }}
      />
    </CContainer>
  )
}

export default LeaveIndex
