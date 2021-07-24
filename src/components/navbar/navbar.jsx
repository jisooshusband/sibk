import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Styles from './navbar.module.css'
import { connect } from 'react-redux'
import { signout } from '../../redux/action/auth'
import { getUser } from '../../redux/action/profile'
import logo from '../../assets/tixscape-logo.png'
import dummy from '../../assets/dummy3.jpeg'
import {
  Button,
  Container,
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap'

class NavigationBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      isAdmin: true,
      isLogin: false,
      signoutButton: false,
    }
  }


  getUserImage = () => {

    this.props.getUser()
    .then((res) => {
      console.log(res)
      const { user_profile_image } = res.action.payload.data.data[0]
      if (user_profile_image !== null && user_profile_image.length > 3) {
        this.setState({
          image: user_profile_image
        })
        console.log(this.state)
      }
    })
  }

  componentDidUpdate = () => {
    const { isUpdate } = this.props
    if (isUpdate) {
      this.getUserImage()
    }
  }

  componentDidMount= () => {
    if (!this.props.auth.data.token) {
      this.setState({
        isLogin: false,
        isAdmin: false,
        signOutButton: true,
      })
    } else {
      this.getUserImage()
      if (this.props.auth.data.user_role === "admin") {
        this.setState({
          isAdmin: true,
        })
      } else {
        this.setState({
          isAdmin: false,
        })
      }  
    }
  }

  handlesignout = (event) => {
    this.props.signout()
    this.props.history.push("/auth/signin")
  }

  showSignout = () => {
    setTimeout(() => {
      this.setState({
        signoutButton: true
      })
    }, 1000)
    setTimeout(() => {
      this.setState({
        signoutButton: false
      })
    }, 5000)
  }
 
  render() {
    const { isAdmin, image } = this.state
  
    return (
      <Container fluid className={Styles.navbarContainer}>
        <Navbar bg="white" expand="lg">
          <Navbar.Brand href="#home">
            <img src={logo} alt="tixscape-logo" className={Styles.logo} /> 
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isAdmin
              ? (
                <Nav>
                  <Link to="/admin/dashboard" className={Styles.link}>Dasboard</Link>
                  <Link to="/admin/manage-movie" className={Styles.link}>Manage Movie</Link>
                  <Link to="/admin/manage-schedule" className={Styles.link}>Manage Schedule</Link>
                </Nav>
              )
              : (
                <Nav>
                  <Link to="/" className={Styles.link}>Home</Link>
                  <Link to="/app/payment" className={Styles.link}>Payment</Link>
                  <Link to="/app/profile" className={Styles.link}>Profile</Link>
                </Nav>
              )
            }
           </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavDropdown title="Location" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Jakarta</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Birmingham</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Amsterdam</NavDropdown.Item>
              </NavDropdown>

              {image !== null && image.length > 3
                ? (<img
                    src={`http://localhost:3001/backend1/api/${image}`} 
                    alt="navbar-pict"
                    className={Styles.profilePicture}
                  />)
                : (<img src={dummy}
                    alt="profile-pict"
                    className={Styles.profilePicture}
                  />
                )
              }
              <Button 
                variant="primary"
                className={Styles.signout}
                onClick={this.handlesignout}>Sign out</Button>
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

const mapDispatchToProps = { getUser, signout }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavigationBar))