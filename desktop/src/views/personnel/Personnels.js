import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CDataTable, CButton, CCollapse, CSpinner, CContainer, CCard } from '@coreui/react'
import api, { handleGetAsync } from '../../base/api'
import { ToastDispatchContext } from '../../contexts/ToastContext'
import { useHistory } from 'react-router-dom'
const Personnels = props => {
  const history = useHistory()
  const [personnels, setPersonnels] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const toastDispatch = useContext(ToastDispatchContext)

  useEffect(() => {
    handleGetAsync(
      api,
      `/api/admin/personnel/personnels`,
      res => {
        console.log(res)
        setPersonnels(res.data)
        setIsLoading(false)
      },
      toastDispatch,
      res => {}
    )
  }, [])

  const fields = [
    { key: 'personnelNumber', label: 'Personel Numarası', _style: { width: '10%' } },
    { key: 'name', label: 'Ad', _style: { width: '15%' } },
    { key: 'surname', label: 'Soyad', _style: { width: '15%' } },
    { key: 'department', label: 'Departman', _style: { width: '20%' } },
    { key: 'employerCompany', label: 'Şirket', _style: { width: '15%' } },
    { key: 'duty', label: 'Görevi', _style: { width: '15%' } },
    // { key: 'status', label: 'Durum', _style: { width: '10%' } },
  ]
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
      <h4>Personneller</h4>
      <hr />
      <div>
        <table class='table table-striped text-center'>
          <thead>
            <tr>
              <th>Pers. No</th>
              <th>Name</th>
              <th>Soyad</th>
              <th>Departman</th>
              <th>Şirket</th>
              <th>Görev</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {personnels.map((personnel, i) => {
              return (
                <tr key={personnel.id}>
                  <td>{personnel.personnelNumber ? personnel.personnelNumber : '---'}</td>
                  <td>{personnel.name ? personnel.name : '---'}</td>
                  <td>{personnel.surname ? personnel.surname : '---'}</td>
                  <td>{personnel.department ? personnel.department : '---'}</td>
                  <td>{personnel.employerCompany ? personnel.employerCompany : '---'}</td>
                  <td>{personnel.duty ? personnel.duty : '---'}</td>
                  <td>
                    <CButton color='secondary' variant='outline' shape='square' size='m'>
                      <Link to={`/personneldetail/${personnel.id}`}>Personel Detaylar</Link>
                    </CButton>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {/* <CContainer className='float-left' fluid>
        <CDataTable striped items={personnels} fields={fields} tableFilter={customFilter} itemsPerPage={10} pagination />
      </CContainer> */}
    </CCard>
  )
}

export default Personnels
