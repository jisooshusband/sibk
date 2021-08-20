import React, { Component } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from './redux/store'

import PublicRoute from './helpers/publicRoute'

//regular page
import Home from './pages/home/home'
import Auth from './pages/auth/auth'
import Register from './pages/auth/register'

//teacher's pages
import AddStudent from './pages/teacher/addStudent/addStudent'
import DashboardTeacher from './pages/teacher/dashboard/dashboard'
import Violances from './pages/teacher/violances/violances'
import ReportStudent from './pages/teacher/reportStudent/reportStudent'
import ProfileTeacher from './pages/teacher/profileTeacher/profileTeacher'
import Counselling from './pages/teacher/counselling/counselling'
import Report from './pages/teacher/report/report'

//student's pages
import DashboardStudent from './pages/student/dashboard/dashboard'
import Game from './pages/student/games/game'
import DiciplineNotes from './pages/student/diciplineNotes/diciplineNotes'
import StudentProfile from './pages/student/profile/profile'
import StudentCounselling from './pages/student/counselling/counselling'

class App extends Component {

  render() {
    return(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>

              <PublicRoute
                path="/"
                exact component={ Home }
              />

              <PublicRoute
                path="/auth"
                exact component={ Auth }
              />

              <PublicRoute
                path="/register"
                exact component={ Register }
              />

{/* ---------------------------------------------------------------- */}

              <PublicRoute
                path="/dashboard-teacher"
                exact component={ DashboardTeacher }
              />

              <PublicRoute
                path="/profile-teacher"
                exact component={ ProfileTeacher }
              />

              <PublicRoute
                path="/counselling"
                exact component={ Counselling }
              />

              <PublicRoute
                path="/add-student"
                exact component={ AddStudent }
              />

              <PublicRoute
                path="/violances"
                exact component={ Violances }
              />

              <PublicRoute
                path="/report"
                exact component={ Report }
              />

              <PublicRoute
                path="/report-student/:nisn"
                exact component={ ReportStudent }
              />

{/* ---------------------------------------------------------------- */}

              <PublicRoute
                path="/student/dashboard"
                exact component={ DashboardStudent }
              />


              <PublicRoute
                path="/student/profile"
                exact component={ StudentProfile }
              />

              <PublicRoute
                path="/student/game"
                exact component={ Game }
              />

              <PublicRoute
                path="/student/notes"
                exact component={ DiciplineNotes }
              />

              <PublicRoute
                path="/student/counselling"
                exact component={ StudentCounselling }
              />

            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    )
  }

}

export default App
