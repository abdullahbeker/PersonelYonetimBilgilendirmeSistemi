import React, { Suspense } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { SecuredRoute, Layout, Loading } from '../../components'
import { Pannel } from '../../views/pannel'
import { CFade } from '@coreui/react'

export const SecuredRoutes = () => {
  return (
    <Layout>
      <Suspense fallback={Loading}>
        <Switch>
          {/* {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )}
                />
              )
            );
          })} */}
          <SecuredRoute path='/pannel' component={Pannel} exact />
          <Redirect from='*' to='/pannel' />
        </Switch>
      </Suspense>
    </Layout>
  )
}
