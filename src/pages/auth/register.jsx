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
  requestOtpStudent,
  requestOtpTeacher,
  registerStudent,
  registerTeacher
} from '../../redux/action/auth'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAlert: false,
      alertMsg: '',
      isStudent: false,
      showPassword: true,
      form: {
        id: null,
        otp: null,
        phoneNumber: null,
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

  handleRegister = (event) => {
    event.preventDefault()
    if (this.state.isStudent) {
      const data = {
        nisn: this.state.form.id,
        password: this.state.form.password
      }
      this.props
      .registerStudent(data)
      .then((res) => {
        console.log(res)
        this.setState({
          showAlert: true,
          alertMsg: 'Berhasil Login',
        })
        setTimeout(() => {
          this.setState({
            showAlert: false,
            alertMsg: ''
          })
          this.props.history.push('/auth')
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
      .registerTeacher(data)
      .then((res) => {
        this.setState({
          showAlert: true,
          alertMsg: 'Berhasil login'
        })
        setTimeout(() => {
          this.setState({
            showAlert: false,
            alertMsg: ''
          })
          this.props.history.push('/auth')
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

  handleBack = () => {
    this.props.history.push('/auth')
  }

  moveToRegister = () => {
    this.props.history.push('/register')
  }


  requestOtp = (event) => {
    event.preventDefault()
    if(this.state.isStudent) {
      const data = {
        nisn: this.state.form.id,
        phoneNumber: `${62}${this.state.form.phoneNumber}`
      }
      this.props
      .requestOtpStudent(data)
      .then((res) => {
        this.setState({
          showAlert: true,
          alertMsg: 'OTP dikirimkan ke nomor whatsapp'
        })
        setTimeout(() => {
          this.setState({
            showAlert: false,
            alertMsg: ''
          })
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
        phoneNumber: `${62}${this.state.form.phoneNumber}`
      }
      this.props
      .requestOtpTeacher(data)
      .then((res) => {
        this.setState({
          showAlert: true,
          alertMsg: 'OTP dikirimkan ke nomor whatsapp'
        })
        setTimeout(() => {
          this.setState({
            showAlert: false,
            alertMsg: ''
          })
        }, 3000)
      })
      .catch((err) => {
        this.setState({
          showAlert: true,
          alertMsg: err.response.data.msg
        })
      })
      setTimeout(() => {
        this.setState({
          showAlert: false,
          alertMsg: ''
        })
      }, 3000)
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
      showPassword
    } = this.state

    const isLoginPage = false

    const {
      id,
      otp,
      phoneNumber,
      password
    } = this.state.form

    console.log(showPassword)
    return(
      <Container fluid className={Styles.container}>
        <Row>
        <Col></Col>
          <Col sm={5} className={Styles.left}>
            <div className={Styles.title}>
              <Row onClick={this.handleBack}>
                <Col sm={1} className={Styles.navigation}>
                  <ArrowLeft size={20} />
                </Col>
                <Col onClick={() => window.location.href='/'}>
                  <p>Kembali</p>
                </Col>
                <Col className={Styles.register}>
                  <Button className={Styles.registerButton}
                    onClick={this.moveToRegister}
                  >
                    Masuk
                  </Button>
                </Col>
              </Row>
              <h4>Daftar</h4>
                {/* <p>Masuk dengan password yang sudah di buat sebelumnya ya!</p> */}
              </div>

              {showAlert
                ? (<Alert variant="warning">{alertMsg}</Alert>)
                : ("")
              }

              <Form onSubmit={this.handleRegister}>
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

                    <p className={Styles.label}>Nomor telepon</p>

                    <InputGroup>
                      <InputGroup.Text className={Styles.customInput}>
                        +62
                      </InputGroup.Text>
                      <FormControl
                        className={Styles.customInput}
                        name="phoneNumber"
                        type="number"
                        value={ phoneNumber }
                        onChange={(event) => this.changeText(event)}
                        required
                      />
                    </InputGroup>

                    <p className={Styles.label}>OTP</p>

                    <InputGroup>
                      <FormControl
                        className={Styles.customInput}
                        name="otp"
                        type="number"
                        value={ otp }
                        onChange={(event) => this.changeText(event)}
                        required
                      />
                      <Button className={Styles.otpButton}
                        onClick={this.requestOtp}
                      >Kirim OTP</Button>
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
                  Daftar
                </Button>

                <p className={Styles.loginAs}
                  onClick={this.switchRole}>
                  {isStudent
                    ? "Daftar sebagai guru ?"
                    : "Daftar sebagai siswa"
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

const mapDispatchToProps = { 
  requestOtpStudent,
  requestOtpTeacher,
  registerStudent,
  registerTeacher
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)