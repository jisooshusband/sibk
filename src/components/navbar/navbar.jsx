import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Styles from './navbar.module.css'
import Logo from '../../assets/1.png'
import {
  Navbar,
} from 'react-bootstrap'
import {
  Door,
  PersonSimpleWalk
} from 'phosphor-react'

class AppNavbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLogin: true,
      signoutButton: false,
    }
  }

  toAuth = () => {
    window.location.href="/auth"
  }

  logout = () => {
    localStorage.clear()
    window.location.href="/auth"
  }

  render() {

    const { isLogin } = this.state

    return (
      <Navbar expand="lg">

          <Navbar.Brand href="#home">
            <img src={ Logo } alt="logo" style={{ width: "60px" }} />
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>

            <Link 
              className={Styles.link}
              to="/">Home</Link>

            <Link
              className={Styles.link}
              to="/">Profile Sekolah</Link>

            <Link
              className={Styles.link}
              to="/">Kontak</Link>  

            <Navbar.Collapse className="justify-content-end">
              {isLogin
                ? 
                (<>
                    <div
                      onClick={this.logout}
                      className={Styles.outButton}>
                      <PersonSimpleWalk size={30} />
                    </div>
                    <p className={Styles.logoutText}>Logout</p>
                </>)
                : 
                (<>
                    <div 
                      onClick={this.toAuth}
                      className={Styles.inButton}>
                      <Door size={30} />
                    </div>
                    <p className={Styles.loginText}>Login</p>
                </>)
              }
            </Navbar.Collapse>

          </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default AppNavbar

