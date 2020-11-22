import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Loading, SecuredRoute, Layout } from '../components'
import { Login, NotFound, Pannel } from '../views'

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
