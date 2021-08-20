import React, { Component } from 'react'
import {
  Alert,
  Button,
  Container,
  Col,
  FloatingLabel,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap'
import AppNavbar from '../../../components/navbar/navbar'
import { connect } from 'react-redux'
import Sidebar from '../../../components/sidebar/sidebar'
import Styles from './addStudent.module.css'
import { postStudent } from '../../../redux/action/student'

class AddStudent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      form: {
        nisn: null,
        name: null,
        schoolClass: 'VII',
        birthDate: null,
        birthPlace: null,
        gender: 'Laki-Laki',
        phoneNumber: null,
        profileImage: null,
        image: null,
      },
      alert: false,
      message: '',
      isError: false
    }
  }

  componentDidMount() {
    this.checkRole()
  }

  checkRole() {
    if (!localStorage.getItem('role')) {
      window.location.href('/')
    } else if (localStorage.getItem('role') !== 'teacher') {
      window.location.href='/student/dashboard'
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

  handleClass = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        schoolClass: event.target.value
      }
    })
  }

  generateNisn = (event) => {
    if (!this.state.form.birthDate) {
      alert('Input tanggal lahir dulu ya')
    } else {
      const data = this.state.form.birthDate
      const unique = Math.floor(100000 + Math.random() * 900000)
      const nisn = `${unique}${data.split('-')[2]}${data.split('-')[1]}${data.split('-')[0]}`
      this.setState({
        form: {
          ...this.state.form,
          nisn: nisn
        }
      })
    }
  }

  handleGender = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        gender: event.target.value
      }
    })
    console.log(this.state.form)
  }

  handleImage = (event) => {
    if (event.target.files[0]) {
      this.setState({
        form: {
          ...this.state.form,
          profileImage: URL.createObjectURL(event.target.files[0]),
          image: event.target.files[0],
        },
      })
    } else {
      this.setState({
        form: {
          ...this.state.form,
          profileImage: null,
          image: null,
        },
      })
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const { form } = this.state
    let isValid = true

    for (const i in form) {
      if (!form[i] || form[i].length === 0) {
        isValid = false
      }
    }

    if (isValid) {
      const { form } = this.state
      delete form.profileImage

      if(!form.image) {
        delete form.image
      }

      const formData = new FormData()
      for (const key in form) {
        formData.append(key, form[key])
      }

      this.props
      .postStudent(formData)
      .then((res) => {
        console.log(res)
        this.setState({
          alert: true,
          message: "Data berhasil ditambahkan",
          isError: false
        })
        setTimeout(() => {
          this.setState({
            alert: false
          })
        }, 3000)
      })
      .catch((err) => {
        this.setState({
          alert: true,
          isError: true,
          message: err.response.data.msg
        })
      })
    } else {
      alert('Pastikan semua data terisi dengan benar')
    }
  }

  render() {

    const { isError, alert, message } = this.state

    const {
      nisn,
      name,
      birthDate,
      birthPlace,
      profileImage,
      phoneNumber
    } = this.state.form

    return(
      <Container fluid className={Styles.container}>
        <AppNavbar />

        <Row className={Styles.row1}>
          <Col sm={2}>
            <Sidebar />
          </Col>
          <Col className={Styles.contentContainer}>
            <Row>
              <Col className={Styles.title}>
                <div className={Styles.title}>Daftarkan Siswa Baru</div>
              </Col>
            </Row>

            {alert 
              ? (<Alert variant={isError ? "danger" : "success"}>
                  {message}</Alert>)
              : ('')
            }

            <Row>
              <Col className={Styles.left}>
                <img
                  src={profileImage ? profileImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdFwugTfhuZN7sqlI5CVWs_Mn692AaVE1IOG_8WKsjgcGbdnHH2NibSRyFSTDScd-oVXc&usqp=CAU'}
                  alt="profil-siswa"
                  className={Styles.profilePict}
                />

              </Col>

              <Col>
                <Row>
                  <Col>
                    <FloatingLabel label="Nama" className="mb-3">
                      <Form.Control 
                        type="text"
                        name="name"
                        value={name}
                        className={Styles.customInput}
                        onChange={(event) => this.changeText(event)}
                        placeholder="" />
                    </FloatingLabel>

                    <FloatingLabel label="Jenis Kelamin" className="mb-3">
                      <Form.Select className={Styles.customInput}>
                        <option
                          value={"Laki-Laki"}
                          onClick={(event) => this.handleGender(event)}>Laki-Laki</option>
                        <option
                          value={"Perempuan"}
                          onClick={(event) => this.handleGender(event)}>Perempuan</option>
                      </Form.Select>
                    </FloatingLabel>

                    <FloatingLabel label="Tempat Lahir" className="mb-3">
                      <Form.Control 
                        type="text" 
                        name="birthPlace"
                        value={birthPlace}
                        className={Styles.customInput}
                        onChange={(event) => this.changeText(event)} 
                        placeholder="" />
                    </FloatingLabel>                    

                    <FloatingLabel label="Nisn" className="mb-3">
                      <Form.Control 
                        value={nisn} 
                        placeholder="" 
                        className={Styles.customInput}
                        readOnly 
                        required />
                    </FloatingLabel>
                  </Col>

                  <Col>
                    <FloatingLabel label="Kelas" className="mb-3">
                      <Form.Select className={Styles.customInput}>
                        <option
                          name="schoolClass"
                          value={"VII"}
                          onClick={(event) => this.handleClass(event)}>VII - Tujuh</option>

                        <option
                          name="schoolClass"                    
                          value={"VIII"}
                          onClick={(event) => this.handleClass(event)}>VIII - Delapan</option>

                        <option
                          name="schoolClass"                    
                          value={"IX"}
                          onClick={(event) => this.handleClass(event)}>IX - Sembilan</option>
                      </Form.Select>
                    </FloatingLabel>

                    <FloatingLabel label="No Telp (+62)" className="mb-3">
                      <Form.Control 
                        name="phoneNumber"
                        value={phoneNumber}
                        className={Styles.customInput}
                        onChange={(event) => this.changeText(event)} 
                        placeholder="" />
                    </FloatingLabel>

                    <FloatingLabel label="Tanggal Lahir" className="mb-3">
                      <Form.Control
                        type="date" 
                        name="birthDate"
                        value={birthDate}
                        className={Styles.customInput}
                        onChange={(event) => this.changeText(event)}
                        placeholder="" />
                    </FloatingLabel>

                    <Button
                      onClick={this.generateNisn}
                      className={Styles.buttonNisn}>Buat NISN</Button>
                  </Col>
                </Row>

                <Form.Control
                  className={Styles.customUpload}
                  type="file"
                  onChange={(event) => this.handleImage(event)} />

                <Button
                  onClick={this.handleSubmit}
                  className={Styles.button}>Submit</Button>

              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = { postStudent }

export default connect(mapStateToProps, mapDispatchToProps)(AddStudent)
