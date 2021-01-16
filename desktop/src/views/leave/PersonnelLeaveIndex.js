import React from 'react'
import { personnels } from './usersData'
import { CButton } from '@coreui/react'
export default function PersonnelLeaveIndex() {
  return (
    <div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Departman</th>
            <th>Kullandığı Ücretli İzin Günü</th>
            <th>Kullandığı Ücretsiz İzin Günü</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {personnels.map((personnel, i) => {
            return (
              <tr>
                <td>{personnel.name}</td>
                <td>{personnel.department}</td>
                <td>{personnel.paidLeaveDay}</td>
                <td>{personnel.unpaidLeaveDay}</td>
                <td>
                  <CButton color='primary' variant='outline' shape='square' size='m'>
                    Tüm İzinlerini Gör
                  </CButton>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
