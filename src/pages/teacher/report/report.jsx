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
import Sidebar from '../../../components/sidebar/sidebar'
import axiosApiIntances from '../../../utils/axios'
import Styles from './report.module.css'

class Report extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    this.checkRole()
  }

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
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

    return(
      <Container fluid className={Styles.container}>

        <AppNavbar />

        <Row className={Styles.row1}>
          <Col sm={2}>
            <Sidebar />
          </Col>

          <Col className={Styles.contentContainer}>
            <Row>
              <Col className={Styles.title}>Buat Laporan</Col>
            </Row>

            <Row className={Styles.content1}>
              <Col className={Styles.div1}
                onClick={window.location.href='http://localhost:3001/backend1/api/v1/student/report/all'}
              >Laporan Siswa</Col>
              <Col className={Styles.div1}
                onClick={window.location.href='http://localhost:3001/backend1/api/v1/counselling/report/'}              
              >Laporan Konsultasi</Col>
            </Row>

          </Col>
        </Row>

      </Container>
    )
  }

}

export default Report
