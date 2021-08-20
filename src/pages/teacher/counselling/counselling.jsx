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
import Styles from './counselling.module.css'

class Counselling extends Component {

  constructor(props) {
    super(props)
    this.state = {
      jadwal: []
    }
  }

  componentDidMount() {
    this.checkRole()
    this.getData()
  }

  getData = () => {
    axiosApiIntances.get('/counselling/')
    .then((res) => {
      this.setState({
        jadwal: res.data.data
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

  render() {

    const { jadwal } = this.state

    return(
      <Container fluid className={Styles.container}>

        <AppNavbar />

        <Row className={Styles.row1}>
          <Col sm={2}>
            <Sidebar />
          </Col>

          <Col className={Styles.contentContainer}>
            <Row>
              <Col className={Styles.title}>Jadwal Konselling</Col>
              <Col className={Styles.navigation}>
                <Button
                  className={Styles.button}
                  variant="primary">
                  + Daftarkan Siswa
                </Button>
              </Col>
            </Row>

            <Row className={Styles.scheduleContainer}>
              {jadwal.map((el) => 
              (<Row className={Styles.card}>
                <div>{el.tanggal_konsultasi.substring(0, 10)}</div>
                <div>{el.nisn_siswa}</div>
                <div>{el.jenis_permasalahan}</div>
              </Row>)
              )}
            </Row>



          </Col>
        </Row>

      </Container>
    )
  }

}

export default Counselling
