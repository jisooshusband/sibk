import React, { Component } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from './redux/store'

import PublicRoute from './helpers/publicRoute'
import PrivateRoute from './helpers/privateRoute'

import Signin from './pages/auth/signin'
// import Signup from './pages/auth/signup'

import Home from './pages/home/home'
import MovieDetails from './pages/app/movieDetails/movieDetails'
import Profile from './pages/app/profile/profile'

import manageMovie from './pages/admin/manageMovie/manageMovie'
import manageSchedule from './pages/admin/manageSchedule/manageSchedule'

class App extends Component {

  render() {
    return(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>

              <PublicRoute
                restricted={true}
                path="/auth/signin"
                exact component={Signin}
              />

              <PublicRoute
                path="/"
                exact component={ Home }
              />

              <PrivateRoute  
                path="/app/movie-details/:id"
                exact component={ MovieDetails }
              />

              <PrivateRoute
                path='/admin/manage-movie'
                exact component={ manageMovie }
              />

              <PrivateRoute
                path='/admin/manage-schedule'
                exact component={ manageSchedule }
              />

              <PrivateRoute
                path='/app/profile'
                exact component={ Profile }
              />

            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    )
  }

}

export default App
