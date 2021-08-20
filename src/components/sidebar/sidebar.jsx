import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  Container,
  Col,
  Row
} from 'react-bootstrap'
import {
  Book,
  Calendar,
  ChartLine,
  CirclesFour,
  GameController,
  PersonSimpleRun,
  User
} from 'phosphor-react'
import Styles from './sidebar.module.css'
import { logout } from '../../redux/action/auth'
import { connect } from 'react-redux'

class Sidebar extends Component {

  moveToViolances = () => {
    this.props.history.push('/violances')
  }

  render() {
    const { activePage } = this.props
    console.log(activePage)
    const role = localStorage.getItem('role')
    console.log(role)

    return(
        <>
          {role === 'teacher'
            ? (
                <Container>
                  <Link
                  to="/dashboard-teacher"
                  className={activePage === 'dashboard' ? Styles.active : Styles.menu }  >
                  <div>
                    <CirclesFour size={30} />
                    <p>Dashboard</p>
                  </div>
                </Link>
      
                <Link
                  to="/counselling"
                  className={activePage === 'counselling' ? Styles.active : Styles.menu }  >
                  <div>
                    <Calendar size={30} />
                    <p>Jadwal Konseling</p>
                  </div>
                </Link>
      
                <Link 
                  to="/violances"
                  className={activePage === 'violances' ? Styles.active : Styles.menu }  >
                  <div>
                    <Book size={30} />
                    <p>Pelanggaran</p>
                  </div>
                </Link>
      
                <Link
                  to="/report"
                  className={activePage === 'report' ? Styles.active : Styles.menu }  >                  
                  <div>
                    <ChartLine size={30} />
                    <p>Laporan</p>
                  </div>
                </Link>
      
                <Link 
                  to="/profile-teacher"
                  className={activePage === 'profile' ? Styles.active : Styles.menu }  >
                  <div>
                    <User size={30} />
                    <p>Profil</p>
                  </div>
                </Link>
      
                <Link className={Styles.menu}>
                  <div>
                    <PersonSimpleRun size={30} />
                    <p>Keluar</p>
                  </div>
                </Link>
              </Container>
            ) : (
              <Container>
              <Link
                to="/student/dashboard"
                className={activePage === 'dashboard' ? Styles.active : Styles.menu }  >
                <div>
                  <CirclesFour size={30} />
                  <p>Dashboard</p>
                </div>
              </Link>
  
              <Link
                to="/student/game"
                className={activePage === 'games' ? Styles.active : Styles.menu }  >
                <div>
                  <GameController size={30} />
                  <p>Quiz</p>
                </div>
              </Link>
  
              <Link 
                to="/student/notes"
                className={activePage === 'diciplineNotes' ? Styles.active : Styles.menu }  >
                <div>
                  <Book size={30} />
                  <p>Catatan Pelanggaran</p>
                </div>
              </Link>
  
              <Link 
                to="/student/counselling"
                className={Styles.menu}>
                <div>
                  <Calendar size={30} />
                  <p>Jadwal Konsultasi</p>
                </div>
              </Link>
  
              <Link 
                to="/student/profile"
                className={Styles.menu}>
                <div>
                  <User size={30} />
                  <p>Profil</p>
                </div>
              </Link>
  
              <Link className={Styles.menu}>
                <div>
                  <PersonSimpleRun size={30} />
                  <p>Keluar</p>
                </div>
              </Link>
            </Container>
            )
          }
        </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
