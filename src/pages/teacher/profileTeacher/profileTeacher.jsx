import React, { Component } from 'react'
import {
  Alert,
  Button,
  Container,
  Col,
  FormControl,
  FloatingLabel,
  Form,
  InputGroup,
  Row
} from 'react-bootstrap'
import AppNavbar from '../../../components/navbar/navbar'
import { connect } from 'react-redux'
import Sidebar from '../../../components/sidebar/sidebar'
import axiosApiIntances from '../../../utils/axios'
import Styles from './profileTeacher.module.css'

class ProfileTeacher extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      form: {
        phoneNumber: '',
        confirm: '',
        profileImage: null,
        image: null,
      },
      alert: false,
      message: '',
      imgUpdate: false,
    }
  }

  componentDidMount() {
    this.checkRole()
    this.getTeacherData()
  }

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    })
  }

  getTeacherData () {
    const nip = localStorage.getItem('nip')

    axiosApiIntances.get(`/teacher/${nip}`)
    .then((res) => {
      console.log(res.data.data[0])
      this.setState({
        data: res.data.data[0]
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  checkRole() {
    if (!localStorage.getItem('role')) {
      window.location.href('/')
    } else if (localStorage.getItem('role') !== 'teacher') {
      window.location.href='/student/dashboard'
    }
  }

  handleImage = (event) => {
    if (event.target.files[0]) {
      this.setState({
        form: {
          ...this.state.form,
          profileImage: URL.createObjectURL(event.target.files[0]),
          image: event.target.files[0]
        },
        imgUpdate: true,
      })
    } else {
      this.setState({
        form: {
          ...this.state.form,
          profileImage: null,
          image: null
        }
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.form)
    if (this.state.form.phoneNumber === this.state.confirm) {
      console.log(this.state.form)
    } else {
      const { form } = this.state
      
      if (!form.image) {
        delete form.image
      }

      const formData = new FormData()
      for (const key in form) {
        formData.append(key, form[key])
      }

      axiosApiIntances
      .patch(`/teacher/${localStorage.getItem('nip')}`, this.state.form)
      .then((res) => {
        this.setState({
          alert: true,
          message: 'Berhasil update profil'
        })
        this.getTeacherData()
        setTimeout(() => {
          this.setState({
            alert: false,
            message: ''
          })  
        }, 3000)
      })
      .catch((err) => {
        this.setState({
          alert: true,
          message: 'Gagal update profil'
        })
        setTimeout(() => {
          this.setState({
            alert: false,
            message: ''
          })
        }, 3000)
      })
    }
  }

  render() {

    console.log(this.state)
    const { data, alert, message, imgUpdate } = this.state
    const { phoneNumber, confirm, profileImage, image } = this.state.form

    return(
      <Container fluid className={Styles.container}>

        <AppNavbar />

        <Row className={Styles.row1}>
          <Col sm={2}>
            <Sidebar />
          </Col>

          <Col className={Styles.contentContainer}>
            <Row>
              <Col className={Styles.title}>Profile Guru</Col>
              <Col className={Styles.navigation}>
                {/* <Button
                  className={Styles.button}
                  variant="primary">
                </Button> */}
              </Col>
            </Row>

            <Row className={Styles.row1}>
              <Col sm={6} className={Styles.left}>
                {imgUpdate 
                ? (
                  <img 
                    src={profileImage || profileImage.length > 5 
                      ? `http://localhost:3001/backend1/api/${this.state.data.foto_guru}` 
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdFwugTfhuZN7sqlI5CVWs_Mn692AaVE1IOG_8WKsjgcGbdnHH2NibSRyFSTDScd-oVXc&usqp=CAU'}                  
                    className={Styles.profilePicture} alt="profile"
                  />                  
                ) : (
                  <img 
                    src={`http:3001/backend1/api/${data.photo_guru}`}
                    className={Styles.profilePicture} alt="profile"
                  />
                )}
                {/* <img 
                  src={profileImage ? profileImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdFwugTfhuZN7sqlI5CVWs_Mn692AaVE1IOG_8WKsjgcGbdnHH2NibSRyFSTDScd-oVXc&usqp=CAU'}                  
                  className={Styles.profilePicture} alt="profile"
                /> */}
              <div className={Styles.card}>
                <div className={Styles.subtitle}>{this.state.data.nama_guru}</div>
                <p>NIP. {data.nip}</p>
                <p>+62 {data.no_telp_guru}</p>
              </div>
              </Col>

              <Col sm={6}>

                {alert ? (
                  <Alert variant="warning">
                    {message}
                  </Alert>
                ) : ('')}

                <div className={Styles.subtitle}>Edit Data</div>
                <Form className={Styles.form}>
                  
                  <Form.Label>Foto Profil</Form.Label>
                  <Form.Control 
                    className={Styles.formControl}
                    type="file"
                    onChange={(event) => this.handleImage(event)}
                  />
                  
                  <Form.Label className={Styles.label}>Nomor Telepon</Form.Label>
                  <InputGroup className="mb-3">
                  <InputGroup.Text>+62</InputGroup.Text>
                    <FormControl
                      name='phoneNumber'
                      value={phoneNumber}
                      className={Styles.formControl}
                      type="number"
                      placeholder=""
                      onChange={(event) => this.changeText(event)}
                    />
                  </InputGroup>

                  <Form.Label className={Styles.label}>Nomor Telepon</Form.Label>
                  <InputGroup className="mb-3">
                  <InputGroup.Text>+62</InputGroup.Text>
                    <FormControl
                      name='confirm'
                      value={confirm}
                      className={Styles.formControl}
                      type="number"
                      placeholder=""
                      onChange={(event) => this.changeText(event)}
                    />
                  </InputGroup>

                  <Button className={Styles.buttonSubmit}
                    onClick={this.handleSubmit}
                  >
                     Simpan Perubahan
                  </Button>
                </Form>
              </Col>

            </Row>
          </Col>
        </Row>

      </Container>
    )
  }

}

export default ProfileTeacher
