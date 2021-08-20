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
import Styles from './report.module.css'
import { postPenalty } from '../../../redux/action/penalty'

class ReportStudent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedDate: '',
      studentInfo: [],
      violationInfo: [],
      selectedItem: '',
      violationPoint: '',
      violationCode: '',
      isError: false,
      alert: false,
      message: '',
    }
  }

  componentDidMount() {
    this.checkRole()
    this.getStudentInfo()
    this.getViolationInfo()
  }

  checkRole() {
    if (!localStorage.getItem('role')) {
      window.location.href('/')
    } else if (localStorage.getItem('role') !== 'teacher') {
      window.location.href='/student/dashboard'
    }
  }

  getStudentInfo = () => {
    const studentNisn = window.location.pathname.split('/')[2]
    axiosApiIntances
    .get(`/student/by-nisn/${studentNisn}`)
    .then((res) => {
      this.setState({
        studentInfo: res.data.data[0]
      })
    })
    .catch((err) => {
      console.log(err)
      alert('Internal error')
      setTimeout(() => {
        window.location.href('/dashboard-teacher')
      })
    })
  }

  getViolationInfo = () => {
    axiosApiIntances
    .get(`/penalty/`)
    .then((res) => {
      this.setState({
        violationInfo: res.data.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  handleChoises = (event) => {
    console.log(event.target.value.split('|')[0])
    console.log(event.target.value.split('|')[1])
    console.log(event.target.value.split('|')[2])
    this.setState({
      violationCode: event.target.value.split('|')[0],
      selectedItem: event.target.value.split('|')[2],
      violationPoint: event.target.value.split('|')[1]
    })
  }

  handleSubmit =(event) => {
    event.preventDefault()
    const data = {
      tanggal: this.state.selectedDate,
      nisn: this.state.studentInfo.nisn,
      jenisPelanggaran: this.state.selectedItem,
      pointPelanggaran: this.state.violationPoint,
      totalPoint: +this.state.studentInfo.point_siswa + +this.state.violationPoint
    }
    this.props
    .postPenalty(data)
    .then((res) => {
      this.setState({
        alert: true,
        message: 'Pencatatan laporan berhasil'
      })
      this.getStudentInfo()
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
        message: err.response.data.msg ? err.response.data.msg : 'Tidak dapat menghubungi server saat ini, coba lagi nanti'
      })
      setTimeout(() => {
        this.setState({
          alert: false,
          message: ''
        })
      }, 3000)
    })
  }

  changeText = (event) => {
    console.log(event.target.value)
    this.setState({
      selectedDate: event.target.value
    })
  }
 
  render() {

    const {
      nama_siswa, no_telp_siswa, point_siswa, kelas_siswa, photo_siswa
    } = this.state.studentInfo

    const { 
      violationInfo, 
      violationPoint, 
      selectedItem, 
      selectedDate,
      alert,
      isError,
      message,
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
              <Col className={Styles.title}>Info siswa</Col>
              <Col className={Styles.navigation}>
                <Button
                  className={Styles.button}
                  variant="primary">
                  {"< Data Siswa"}
                </Button>
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

            <Row>
              <Col sm={4} className={Styles.infoContainer}>
                {/* <img
                  src="data:image/png;base64,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"
                  alt="student-img"
                  className={Styles.studentPhoto}
                /> */}
                <img
                  alt="student"
                  src={photo_siswa
                          ? `http://localhost:3001/backend1/api/${photo_siswa}`
                          : 'data:image/png;base64,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'
                        }
                  className={Styles.studentPhoto} />

                <Row className={Styles.info}>
                  <Col><h6>Nama Siswa</h6></Col>
                  <Col><h6>{nama_siswa}</h6></Col>
                </Row>

                <Row className={Styles.info}>
                  <Col><h6>Kelas</h6></Col>
                  <Col><h6>{kelas_siswa}</h6></Col>
                </Row>

                <Row className={Styles.info}>
                  <Col><h6>Total Point</h6></Col>
                  <Col><h6>{point_siswa} point</h6></Col>
                </Row>

                <Row className={Styles.info}>
                  <Col><h6>Nomor Telepon</h6></Col>
                  <Col><h6>{no_telp_siswa}</h6></Col>
                </Row>

              </Col>

              <Col sm={8}>
                <Row className={Styles.rightContainer}>
                  <h5>Form Pelanggaran</h5>
                </Row>

                <Row className={`${Styles.rightContainer} g-2`}>
                  <Col md>
                    <FloatingLabel controlId="floatingInputGrid" label="Tanggal Kejadian">
                      <Form.Control
                        onChange={(event) => this.changeText(event)}
                        required
                        type="date" />
                    </FloatingLabel>
                  </Col>
                  <Col md>
                    <FloatingLabel controlId="floatingSelectGrid" label="Jenis pelanggaran">
                      <Form.Select className={Styles.formSelect}>
                        {violationInfo.map((el) => (
                          <option
                            value={`${el.id_pelanggaran}|${el.point_pelanggaran}|${el.nama_pelanggaran}`}
                            onClick={(event) => this.handleChoises(event)}
                            className={Styles.option}
                          >{el.id_pelanggaran} - {el.nama_pelanggaran.substring(0, 30)}</option>                          
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                </Row>

                <Row className={Styles.rightContainer}>
                  <Col><h6>Tanggal Kejadian</h6></Col>
                  <Col>{selectedDate}</Col>
                  <hr className={Styles.divider} />

                  <Col><h6>Pelanggaran</h6></Col>
                  <Col>{selectedItem}</Col>
                  <hr className={Styles.divider} />

                  <Col><h6>Point dibebankan</h6></Col>
                  <Col>{violationPoint ? violationPoint : 0} Point</Col>
                  <hr className={Styles.divider} />

                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                    className={Styles.button}
                  >Kirim laporan
                  </Button>
                </Row>

              </Col>
            </Row>
          </Col>

        </Row>

      </Container>
    )
  }


}

// export default ReportStudent
const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {postPenalty}

export default connect(mapStateToProps, mapDispatchToProps)(ReportStudent)
