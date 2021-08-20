import React, { Component } from 'react'
import {
  Alert,
  Button,
  Container,
  Col,
  Row
} from 'react-bootstrap'
import {
  X
} from 'phosphor-react'
import { Link } from 'react-router-dom'
import AppNavbar from '../../../components/navbar/navbar'
import { connect } from 'react-redux'
import Sidebar from '../../../components/sidebar/sidebar'
import axiosApiIntances from '../../../utils/axios'
import Styles from './violances.module.css'
import { postPenalty } from '../../../redux/action/penalty'

class Violances extends Component {

  constructor(props) {
    super(props)
    this.state = {
      violances: [],
      alert: false,
      message: '',
      isError: false
    }
  }

  componentDidMount() {
    this.checkRole()
    this.getViolation()
  }

  checkRole() {
    if (!localStorage.getItem('role')) {
      window.location.href('/')
    } else if (localStorage.getItem('role') !== 'teacher') {
      window.location.href='/student/dashboard'
    }
  }

  getViolation = () => {
    axiosApiIntances
    .get('/penalty/record/')
    .then((res) => {
      this.setState({
        violances: res.data.data
      })
    })
    .catch((err) => {
      console.log(err.response)
    })
  }

  handleDelete = (event) => {
    event.preventDefault()
    axiosApiIntances
    .delete(`/penalty/record/${event.target.value}`)
    .then((res) => {
      this.setState({
        alert: true,
        message: 'Berhasil dihapus'
      })
      this.getViolation()
      setTimeout(() => {
        this.setState({
          alert: false,
          message: ''
        })
      }, 3000)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render() {

    const {
      alert, message, isError, violances
    } = this.state

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
                <div className={Styles.title}>Daftar Pelanggaran</div>                
              </Col>
              <Col className={Styles.navigation}>
                <Link
                  to="/dashboard-teacher"
                  className={Styles.button}
                  variant="primary">
                  + Input Baru
                </Link>
              </Col>
            </Row>

            {alert 
              ? (
                <Row className={Styles.row1}>
                  <Alert 
                    variant={isError ? 'danger' : 'success'}>
                    {message}
                  </Alert>
                </Row>
              ) 
              : ("")
            }

            {violances.map((el) => (
              <Row className={Styles.content}>
                <Col sm={4}><p>{el.nisn_siswa}</p></Col>
                <Col sm={6}>{el.jenis_pelanggaran}</Col>
                <Col sm={2}className={Styles.delete}>
                  <Button
                    className={Styles.deleteButton}
                    value={el.id_pelanggaran}
                    onClick={(event) => this.handleDelete(event)}
                  >
                    <X size={15} style={{ marginRight:"10px" }} />Hapus
                  </Button>
                </Col>
              </Row>
            ))}


          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = { postPenalty }

export default connect(mapStateToProps, mapDispatchToProps)(Violances)
