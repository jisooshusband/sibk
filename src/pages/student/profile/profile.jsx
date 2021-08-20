import React, { Component } from 'react'
import {
  Alert,
  Button,
  Container,
  Col,
  FloatingLabel,
  Form,
  Row
} from 'react-bootstrap'
import AppNavbar from '../../../components/navbar/navbar'
import { connect } from 'react-redux'
import Sidebar from '../../../components/sidebar/sidebar'
import axiosApiIntances from '../../../utils/axios'
import Styles from './profile.module.css'

class StudentProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      form: {
        phone: '',
        confirm: '',
        password: '',
      },
      changeNumber: false,
      alert: false,
      message: ''
    }
  }

  componentDidMount() {
    this.getData()
  }

  handleChange = () => {
    const { phone, confirm, password } = this.state.form
    if (phone !== confirm) {
      this.setState({
        alert: true,
        message: 'Nomor telefon tidak sama'
      })
      setTimeout(() => {
        this.setState({
          alert: false,
          message: ''
        })
      })
    } else {
      const data = {
        phone: phone
      }
      axiosApiIntances.patch(`/student/update/${localStorage.getItem('nisn')}`, data)
      .then((res) => {
        console.log(res)
        this.setState({
          alert: true,
          message: 'Data berhasil diubah'
        })
        setTimeout(() => {
          this.setState({
            alert: false,
            message: ''
          })
        })
      })
      .catch((err) => {
        this.setState({
          alert: true,
          message: 'Internal error'
        })
        setTimeout(() => {
          this.setState({
            alert: false,
            message: ''
          })
        })
      })
    }
  }

  getData() {
    axiosApiIntances
    .get(`/student/by-nisn/${localStorage.getItem('nisn')}`)
    .then((res) => {
      this.setState({
        data: res.data.data[0]
      })
    })
    .catch((err) => {
      console.log(err.response)
    })
  }

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    })
  }

  showForm = () => {
    if (!this.state.changeNumber) {
      this.setState({
        changeNumber: true
      })
    } else {
      this.setState({
        changeNumber: false
      })
    }
  }

  render() {

    const { data, phone, confirm, password, changeNumber, alert, message } = this.state

    return(
      <Container fluid className={Styles.container}>

        <AppNavbar activePage={"profile"} />

        <Row className={Styles.row1}>
          <Col sm={2}>
            <Sidebar />
          </Col>

          <Col className={Styles.contentContainer}>
            <Row>
              <Col className={Styles.title}>Profile</Col>
              <Col className={Styles.navigation}>
                <Button
                  className={Styles.button}
                  variant="primary">
                  + Buat jadwal konseling
                </Button>
              </Col>
            </Row>

            <Row>
              <Col sm={6} className={Styles.contentContainer2}>
                <img 
                  src={data.photo_siswa ? data.photo_siswa : "https://dreamvilla.life/wp-content/uploads/2017/07/dummy-profile-pic.png"}
                  className={Styles.profilePhoto}
                  alt="siswa"/>

                <Row className={Styles.smallContent}>
                  <h6>Nama</h6>
                  <p>{data.nama_siswa}</p>
                </Row>

                <Row className={Styles.smallContent}>
                  <h6>Kelas</h6>
                  <p>{data.kelas_siswa}</p>
                </Row>

                <Row className={Styles.smallContent}>
                  <h6>Nomor Telepon</h6>
                  <p>{data.no_telp_siswa}</p>
                  <p style={{ color: "#5f2eea", cursor:"pointer" }}
                    onClick={this.showForm}
                  >Ubah nomor telepon</p>
                </Row>
                
              </Col>
              {alert ? (<Alert variant="primary">{message}</Alert>) : ("")}
              <Col 
                sm={6}
                style={changeNumber ? { display: "block"} : {display: "none"} } 
                className={Styles.contentContainer3}>
                <FloatingLabel label="Nomor Baru" className="mb-3">
                  <Form.Control 
                    type="text"
                    name="phone"
                    value={phone}
                    className={Styles.customInput}
                    onChange={(event) => this.changeText(event)}
                    placeholder="" />
                </FloatingLabel>

                <FloatingLabel label="Konfirmasi Nomor Baru" className="mb-3">
                  <Form.Control 
                    type="text"
                    name="confirm"
                    value={confirm}
                    className={Styles.customInput}
                    onChange={(event) => this.changeText(event)}
                    placeholder="" />
                </FloatingLabel>

                <FloatingLabel label="Password" className="mb-3">
                  <Form.Control 
                    type="password"
                    name="password"
                    value={password}
                    className={Styles.customInput}
                    onChange={(event) => this.changeText(event)}
                    placeholder="" />
                </FloatingLabel>

                <Button
                  onClick={this.handleChange} 
                  className={Styles.change}>
                  Ubah nomor
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

      </Container>
    )
  }

}

export default StudentProfile
