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
import Styles from './diciplineNotes.module.css'

class DiciplineNotes extends Component {

  constructor(props) {
    super(props)
    this.state = {
      violanceNotes: [],
    }
  }

  componentDidMount() {
    this.checkRole()
    this.getData()
  }

  getData() {
    const nisn = localStorage.getItem('nisn')
    axiosApiIntances
    .get(`/penalty/by-nisn/${nisn}`)
    .then((res) => {
      this.setState({
        violanceNotes: res.data.data
      })
    })
    .catch((err) => {
      console.log(err.response)
    })
  }

  checkRole() {
    if (!localStorage.getItem('role')) {
      window.location.href('/')
    } else if (localStorage.getItem('role') !== 'student') {
      window.location.href='/dashboard-teacher'
    }
  }

  render() {

    const data = this.state.violanceNotes

    return(
      <Container fluid className={Styles.container}>

        <AppNavbar />

        <Row className={Styles.row1}>
          <Col sm={2}>
            <Sidebar activePage={"diciplineNotes"} />
          </Col>

          <Col className={Styles.contentContainer}>
            <Row>
              <Col className={Styles.title}>Catatan Pelanggaran</Col>
              <Col className={Styles.navigation}>
                <Button
                  className={Styles.button}
                  variant="primary">
                  + Buat jadwal konseling
                </Button>
              </Col>
            </Row>

            <Row>
              <div className={Styles.subtitle}>NISN : {localStorage.getItem('nisn')}</div>
            </Row>

            <Row style={{ marginTop: "1rem" }}>
              {data.map((el) => (
                <Row className={Styles.content}>
                  <Col>
                    <div><strong>Tanggal</strong></div>
                    <div>{el.tanggal_pelanggaran.substring(0, 10)}</div>
                  </Col>

                  <Col>
                    <div>{el.jenis_pelanggaran}</div>
                  </Col>

                  <Col>
                    <div><strong>Point Dibebankan</strong></div>
                    <div>{el.point_pelanggaran} Point</div>
                  </Col>
                </Row>
              ))}
            </Row>
          </Col>
        </Row>

      </Container>
    )
  }

}

export default DiciplineNotes
