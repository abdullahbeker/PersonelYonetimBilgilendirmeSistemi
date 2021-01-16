import React, { useState, useEffect, useContext, Component } from 'react'
import { useHistory, Link } from 'react-router-dom'
import api, { handleGetAsync, handlePostAsync } from '../../base/api'
import { ToastDispatchContext } from '../../contexts/ToastContext'
import { CDataTable, CBadge, CButton, CCollapse, CCardBody, CContainer, CSpinner, CCard } from '@coreui/react'

const LeaveIndex = props => {
  const history = useHistory()
  const [details, setDetails] = useState([])
  const [leaves, setLeaves] = useState([])
  const toastDispatch = useContext(ToastDispatchContext)
  const [isLoading, setIsLoading] = useState(true)

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
  const approveLeave = e => {
    handlePostAsync(
      api,
      `api/leave/LeaveApproval`,
      { LeaveRequestId: e.target.id, LeaveStatusId: 2 },
      () => {
        toastDispatch({ type: 'success', message: 'İzin talebi onaylandı.' })
        setLeaves()
      },
      toastDispatch,
      () => {}
    )
  }
  const rejectLeave = e => {
    handlePostAsync(
      api,
      `api/leave/LeaveApproval`,
      { LeaveRequestId: e.target.id, LeaveStatusId: 3 },
      () => {
        toastDispatch({ type: 'error', message: 'İzin talebi reddedildi.' })
        setLeaves()
      },
      toastDispatch,
      () => {}
    )
  }
  useEffect(() => {
    handleGetAsync(
      api,
      `/api/leave/getallleaves`,
      res => {
        setLeaves(res.data)
        setIsLoading(false)
      },
      toastDispatch,
      res => {}
    )
  }, [leaves])
  const fields = [
    { key: 'fullName', label: 'Ad', _style: { width: '25%' } },
    { key: 'leaveTypeName', label: 'İzin Adı' },
    { key: 'leaveStartDate', label: 'Başlangıç', _style: { width: '15%' } },
    { key: 'leaveFinishDate', label: 'Bitiş', _style: { width: '15%' } },
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
  const customFilter = { placeholder: 'bir şeyler yazın...', label: 'Ara: ' }

  if (isLoading) {
    return (
      <div className='d-flex justify-content-center'>
        <CSpinner></CSpinner>
      </div>
    )
  }
  return (
    <CCard className='p-3'>
      <CDataTable
        items={leaves}
        fields={fields}
        columnFilter
        tableFilter={customFilter}
        itemsPerPageSelect
        itemsPerPage={10}
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
                    <h4>Oluşturulma Tarihi :{new Date(item.createdAt).toLocaleString('tr-TR', { timeZone: 'UTC' })}</h4>
                    {item.isPaid ? <h4>Ücretli</h4> : <h4>Ücretsiz</h4>}
                    {/* <CButton size='sm' color='primary' onClick={leaveDetailHandler}>
                      İzin İstek Detaylarını Görüntüle
                    </CButton> */}
                    <CButton size='sm' color='info' className='ml-1'>
                      <Link style={{ color: 'white' }} to={`/personneldetail/${item.userId}`}>
                        Personel Sayfasına Git
                      </Link>
                    </CButton>
                    <CButton id={item.requestId} onClick={approveLeave} size='sm' color='success' className='ml-1'>
                      Onayla
                    </CButton>
                    <CButton id={item.requestId} onClick={rejectLeave} size='sm' color='danger' className='ml-1'>
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
                  Talep Tarihi :<h4>{new Date(item.createdAt).toLocaleString('tr-TR', { timeZone: 'UTC' })}</h4>
                  <CButton size='sm' color='info'>
                    <Link style={{ color: 'white' }} to={`/personneldetail/${item.userId}`}>
                      Personel Sayfasına Git
                    </Link>
                  </CButton>
                </CCardBody>
              </CCollapse>
            )
          },
        }}
      />
    </CCard>
  )
}

export default LeaveIndex
