import React, { Component } from 'react'
import {
  Alert,
  Button,
  Container,
  Col,
  FloatingLabel,
  Form,
  Row,
  FormControl,
  FormLabel
} from 'react-bootstrap'
import AppNavbar from '../../../components/navbar/navbar'
import { connect } from 'react-redux'
import Sidebar from '../../../components/sidebar/sidebar'
import axiosApiIntances from '../../../utils/axios'
import Styles from './counselling.module.css'

class StudentCounselling extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      alert: false,
      message: '',
      selectedId: '',
      form: {
        jenisMasalah: '',
        deskripsiMasalah: '',
        tanggal: ''
      }
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    axiosApiIntances.get(`/counselling/by-nisn/${localStorage.getItem('nisn')}`)
    .then((res) => {
      this.setState({
        data: res.data.data
      })
    })
    .catch((err) => {
      console.log(err)
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

  handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      nisn: localStorage.getItem('nisn'),
      jenisMasalah: this.state.form.jenisMasalah,
      deskripsiMasalah: this.state.form.deskripsiMasalah,
      tanggal: this.state.form.tanggal
    }

    axiosApiIntances.post('/counselling/', data)
    .then((res) => {
      this.setState({
        alert: true,
        message: 'Berhasil Membuat Jadwal'
      })
      this.getData()
      setTimeout(() => {
        this.setState({
          alert: false,
          message: '',
        })
      }, 3000)
    })
  }

  render() {

    const { jenisMasalah, deskripsiMasalah, tanggal } = this.state.form
    const { alert, message, data } = this.state

    return(
      <Container fluid className={Styles.container}>

        <AppNavbar />

        <Row className={Styles.row1}>
          <Col sm={2}>
            <Sidebar />
          </Col>

          <Col className={Styles.contentContainer}>
            <Row>
              <Col className={Styles.title}>Jadwal Konsultasi</Col>
              <Col className={Styles.navigation}>
                <Button
                  className={Styles.button}
                  variant="primary">
                  + Buat jadwal konseling
                </Button>
              </Col>
            </Row>

            <Row>
              <Col>
                {data.map((el) => (
                  <Row className={Styles.card}>
                    <h6>{el.tanggal_konsultasi.substring(0, 10)}</h6>
                    <p>{el.jenis_permasalahan}</p>
                  </Row>
                ))}
              </Col>

              <Col>
                
                {alert 
                ? (<Alert variant="warning">{message}</Alert>) 
                : ('')
                }

                <Form 
                  onSubmit={this.handleSubmit}
                  className={Styles.customForm}>
                  <FormLabel>Jenis Permasalahan</FormLabel>
                  <FormControl 
                    className={Styles.customInput}
                    name="jenisMasalah"
                    value={jenisMasalah}
                    required
                    onChange={(event) => this.changeText(event)}
                  />

                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl 
                    className={Styles.customInput}
                    name="deskripsiMasalah"
                    value={deskripsiMasalah}
                    required
                    onChange={(event) => this.changeText(event)}
                  />

                  <FormLabel>Tanggal Konsultasi</FormLabel>
                  <FormControl 
                    type="date"
                    className={Styles.customInput}
                    name="tanggal"
                    value={tanggal}
                    required
                    onChange={(event) => this.changeText(event)}
                  />

                  <Button
                    type="submit" 
                    className={Styles.customButton}>
                    Buat Jadwal
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

export default StudentCounselling
