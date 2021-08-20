import React, { Component } from 'react'
import axiosApiIntances from '../../utils/axios'
import { connect } from 'react-redux'
import {
  Alert,
  Button,
  Container,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row
} from 'react-bootstrap'
import {
  ArrowLeft,
  Eye,
  EyeClosed
} from 'phosphor-react'
import Styles from './auth.module.css'
import {
  studentLogin,
  teacherLogin
} from '../../redux/action/auth'

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoginPage: true,
      showAlert: false,
      alertMsg: '',
      isStudent: false,
      showPassword: false,
      form: {
        id: null,
        password: null
      }
    }
  }

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    })
  }

  handleLogin = (event) => {
    event.preventDefault()
    if (this.state.isStudent) {
      const data = {
        nisn: this.state.form.id,
        password: this.state.form.password
      }
      this.props
      .studentLogin(data)
      .then((res) => {
        console.log(res)
        this.setState({
          showAlert: true,
          alertMsg: 'Berhasil Login',
        })
        localStorage.setItem('token', this.props.auth.data.token)
        localStorage.setItem('role', 'student')
        localStorage.setItem('nisn', this.state.form.id)
        console.log(this.props.auth.data.token)
        setTimeout(() => {
          this.setState({
            showAlert: false,
            alertMsg: ''
          })
          this.props.history.push('/student/dashboard')
        }, 3000)
      })
      .catch((err) => {
        this.setState({
          showAlert: true,
          alertMsg: err.response.data.msg
        })
        setTimeout(() => {
          this.setState({
            showAlert: false,
            alertMsg: ''
          })
        }, 3000)
      })
    } else {
      const data = {
        nip: this.state.form.id,
        password: this.state.form.password
      }
      this.props
      .teacherLogin(data)
      .then((res) => {
        this.setState({
          showAlert: true,
          alertMsg: 'Berhasil login'
        })
        localStorage.setItem('token', this.props.auth.data.token)
        localStorage.setItem('role', 'teacher')
        localStorage.setItem('nip', this.state.form.id)
        setTimeout(() => {
          this.setState({
            showAlert: false,
            alertMsg: ''
          })
          this.props.history.push('/dashboard-teacher')
        })
      })
      .catch((err) => {
        this.setState({
          showAlert: true,
          alertMsg: err.response.data.msg
        })
        setTimeout(() => {
          this.setState({
            showAlert: false,
            alertMsg: ''
          })
        }, 3000)
      })
    }
  }

  switchRole = () => {
    if(this.state.isStudent) {
      this.setState({
        isStudent: false
      })
    } else {
      this.setState({
        isStudent: true
      })
    }
  }

  showPassword = () => {
    if (this.state.showPassword) {
      this.setState({
        showPassword: false
      })
    } else {
      this.setState({
        showPassword: true
      })
    }
  }

  render() {
    const {
      showAlert,
      alertMsg,
      isStudent,
      isLoginPage,
      showPassword
    } = this.state

    const {
      id,
      password
    } = this.state.form

    console.log(showPassword)
    return(
      <Container fluid className={Styles.container}>
        <Row>
        <Col></Col>
          <Col sm={5} className={Styles.left}>
            <div className={Styles.title}>
              <Row>
                <Col sm={1} className={Styles.navigation}>
                  <ArrowLeft size={20} />
                </Col>
                <Col onClick={() => window.location.href='/'}>
                  <p>Kembali</p>
                </Col>
                <Col className={Styles.register}>
                  <Button className={Styles.registerButton} onClick={() => this.props.history.push('/register')}>
                    {isLoginPage ? "Daftar" : "Masuk"}
                  </Button>
                </Col>
              </Row>
              <h4>Masuk</h4>
                <p>Masuk dengan password yang sudah di buat sebelumnya ya!</p>
              </div>

              {showAlert
                ? (<Alert variant="warning">{alertMsg}</Alert>)
                : ("")
              }

              <Form onSubmit={this.handleLogin}>
                <div>

                    <Row>
                    <p className={Styles.label}>
                      {isStudent 
                        ? "NISN (Nomor Induk Siswa Nasional)"
                        : "NIP (Nomor Induk Pengajar)"
                      }
                    </p>

                    <InputGroup>
                      <FormControl
                        className={Styles.customInput}
                        name="id"
                        value={ id }
                        onChange={(event) => this.changeText(event)}
                        required
                      />
                    </InputGroup>

                    <p className={Styles.label}>Kata Sandi</p>
                    <InputGroup>
                      <FormControl
                        type = {showPassword ? "text" : "password" }
                        className={Styles.customInput}
                        name="password"
                        value={ password }
                        onChange={(event) => this.changeText(event)}
                        required
                      />
                      <InputGroup.Text className={Styles.customInputEye}>
                        {showPassword 
                          ? <Eye
                              size={20}
                              onClick={this.showPassword} /> 
                          : <EyeClosed
                            size={20}
                              onClick={this.showPassword} />
                        }
                      </InputGroup.Text>
                    </InputGroup>
                  </Row>
    
                <p className={Styles.label}>Lupa Password?
                  <span className={Styles.link}> Klik disini</span>
                </p>
    
                <Button
                  type="submit"
                  variant="primary" 
                  className={Styles.loginButton}>
                  Masuk
                </Button>

                <p className={Styles.loginAs}
                  onClick={this.switchRole}>
                  {isStudent
                    ? "Masuk sebagai guru ?"
                    : "Masuk sebagai siswa"
                  }
                </p>
              </div>
            </Form>

          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = { teacherLogin, studentLogin }

export default connect(mapStateToProps, mapDispatchToProps)(Auth)