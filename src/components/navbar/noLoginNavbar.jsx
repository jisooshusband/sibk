import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Styles from './navbar.module.css'
import { connect } from 'react-redux'
import { signout } from '../../redux/action/auth'
import logo from '../../assets/tixscape-logo.png'
import {
  Button,
  Container,
  Navbar,
  Nav,
} from 'react-bootstrap'

class NoLoginNavigationBar extends Component {

  toSignin = () => {
    this.props.history.push("/auth/signin")
  }

  render() {

    return (
      <Container fluid className={Styles.navbarContainer}>
        <Navbar bg="white" expand="lg">
          <Navbar.Brand href="#home">
            <img src={logo} alt="tixscape-logo" className={Styles.logo} /> 
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Button
                variant="primary" 
                className={Styles.signout}
                onClick={this.toSignin}
                >Sign In</Button>
            </Nav>

          </Navbar.Collapse>
        </Navbar>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  movie: state.movie
})

const mapDispatchToProps = { signout }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NoLoginNavigationBar))