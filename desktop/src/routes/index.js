import React from 'react'
import { useParams } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Loading, SecuredRoute, Layout } from '../components'
import {
  Login,
  NotFound,
  Pannel,
  LeaveIndex,
  LeaveDetail,
  PersonnelLeaveIndex,
  PersonnelDetail,
  Profile,
  Personnels,
  CreatePersonnel,
  CreateTrain,
  TrainsIndex,
  AttendTrain,
} from '../views'

const Routes = () => {
  return (
    <Router>
      <React.Suspense fallback={Loading}>
        <Switch>
          <Route path='/login' exact name='Giriş Yapın'>
            <Login>
              <h5>Hi</h5>
            </Login>
          </Route>
          <SecuredRoute path='/'>
            <Layout>
              <Switch>
                <Route path='/pannel' exact>
                  <Pannel />
                </Route>
                <Route path='/profile' exact>
                  <Profile />
                </Route>
                <Route path='/leave' exact>
                  <LeaveIndex />
                </Route>
                <Route path='/leave-detail' exact>
                  <LeaveDetail />
                </Route>
                <Route path='/personnel-leaves' exact>
                  <PersonnelLeaveIndex />
                </Route>
                <Route path='/personnels' exact>
                  <Personnels />
                </Route>
                <Route path='/personneldetail/:id' exact>
                  <PersonnelDetail />
                </Route>
                <Route path='/addpersonnel' exact>
                  <CreatePersonnel />
                </Route>
                <Route path='/trains' exact>
                  <TrainsIndex />
                </Route>
                <Route path='/addtrain' exact>
                  <CreateTrain />
                </Route>
                <Route path='/attendtrain' exact>
                  <AttendTrain />
                </Route>
                <Route path='*'>
                  <NotFound />
                </Route>
              </Switch>
            </Layout>
          </SecuredRoute>
        </Switch>
      </React.Suspense>
    </Router>
  )
}

export default Routes
