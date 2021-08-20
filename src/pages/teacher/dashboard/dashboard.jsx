import React, { Component } from 'react'
import {
  Button,
  Container,
  Col,
  Row
} from 'react-bootstrap'
import AppNavbar from '../../../components/navbar/navbar'
import { Link } from 'react-router-dom'
import Sidebar from '../../../components/sidebar/sidebar'
import axiosApiIntances from '../../../utils/axios'
import Styles from './dashboard.module.css'

class DashboardTeacher extends Component {

  constructor(props) {
    super(props)
    this.state = {
      siswaKelasVII: [],
      siswaKelasVIII: [],
      siswaKelasIX: [],
    }
  }

  componentDidMount() {
    this.checkRole()
    const classes = ['VII', 'VIII', 'IX']
    for (let i in classes) {
      this.getStudents(classes[i])
    }
  }

  checkRole() {
    if (!localStorage.getItem('role')) {
      window.location.href('/')
    } else if (localStorage.getItem('role') !== 'teacher') {
      window.location.href='/student/dashboard'
    }
  }

  toAddStudent = () => {
    this.props.history.push('/booking')
  }

  getStudents = (param) => {
    axiosApiIntances
    .get(`/student/${param}`)
    .then((res) => {
      console.log(res.data.data)
      if (param === 'VII') {
        this.setState({
          siswaKelasVII: res.data.data
        })
      } else if (param === 'VIII') {
        this.setState({
          siswaKelasVIII: res.data.data
        })
      } else {
        this.setState({
          siswaKelasIX: res.data.data
        })
      }
    })
    .catch((err) => {
      console.log(err.response)
    })
  }

  render() {

    const { siswaKelasVII, siswaKelasVIII, siswaKelasIX } = this.state

    return(
      <Container fluid className={Styles.container}>

        <AppNavbar />

        <Row className={Styles.row1}>

          <Col sm={2}>
            <Sidebar />
          </Col>

          <Col sm={10} className={Styles.contentContainer}>
            <Row>
              <Col className={Styles.title}>Dashboard</Col>
              <Col className={Styles.navigation}>
              <Link
                  to="/add-student"
                  className={Styles.button}
                  variant="primary">
                  + Daftarkan Siswa
                </Link>
              </Col>
            </Row>

            <Row>
              <div className={Styles.subtitle}>Daftar Siswa Kelas VII</div>
              <Row className={Styles.students}>
                {siswaKelasVII.map((el) => (
                  <Col sm={2} className={Styles.studentCard}>
                    <img
                      alt="student"
                      src={el.photo_siswa 
                          ? `http://localhost:3001/backend1/api/${el.photo_siswa}`
                          : 'data:image/png;base64,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'
                        }
                      className={Styles.cardImg} />
                    <div className={Styles.cardContent}>{el.nama_siswa.substr(0, 15)}</div>
                    <div className={Styles.cardContent}>{el.point_siswa} Point</div>
                    <div 
                      onClick={() => this.props.history.push(`/report-student/${el.nisn}`)}
                      className={Styles.mark}>
                      Laporkan Pelanggaran
                    </div>
                  </Col>                  
                ))}
              </Row>

              <div className={Styles.subtitle}>Daftar Siswa Kelas VIII</div>
              <Row className={Styles.students}>
                {siswaKelasVIII.map((el) => (
                  <Col sm={2} className={Styles.studentCard}>
                    <img
                      alt="student"
                      src={el.photo_siswa 
                          ? `http://localhost:3001/backend1/api/${el.photo_siswa}`
                          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEXFxcX///+/v7/CwsK+vr7Gxsa7u7v7+/vZ2dnU1NTR0dHi4uL09PTJycnv7+/a2trp6enl5eX2SmxXAAAGWklEQVR4nO2d2ZarKhCGlUJQEYf3f9mjnZM2nagRQg1m8132Ra/8i7IGhqqiyGQymUwmk8lkMplMJpPJZDKZTCaTyWSuBcxore5otfyB+0clA4yu2tpNfWfLG7brJ1e3hdaXVwlK+cZ15R69awuluH9lNKCKdtpX97uergV1xbVU0PT2nbz/6UZ/ta8SjJ9OqruLdGC4f/V5lK7fGucGfauv8UkqGM5a58tC1hdwrhCv70djK/yDBN18ou9Ho9fcKg7QPub7e6YHqZ8j6DGBvoXBiDRV3X5qoCu9QFMF5ZLpm7G1NEtVkOILfGSUZamqTaxvxnpVcev6xQzpBc4SGzF5nA7MQU9TC/E3pkcSOIcNERJNah/zyCRAosJbwYWRXSKyQH6JiN/gHd5v0aTKRI+oDVtcrEzSTG2Xhi2DUw2JwLL0TAkceCKBpWXabUyebO/Ts+RvBG50hcOhQk0okONThIJUYNmR+1P0XOYZR2ynZIFihTjsQ7pdp7N0pP4UreY9oqF0NhWDwNISKiQNhSsDmT8FliWkXETNs4RzxCBaRLqM+xmqRVQUZe82RHv9TF/hgiWJiWmPYAJpKexU06czKxQ7b4BwCBMAwRomO+iNo8aXqFkFlj26QqAvm/7isRUyGymBmSpOT7rQowd9ZoHomRugnGcH0SIr5P4M0atEwn3uPXrctIatcFqxqGvInLLdQN1WZK0r7qC6GvKd7i0GzHghwNGU5fT1ClEPEyvunG0BdStDQLCYwVQoIViUJWZA5C4Ob2B6GtqT7T0QQz7x2f0eiGX+P6BQQtKGei/jH1D4/Vb69QqFxENEgUIUYkZ8GVkb5kbN92fexddXTzIqYEwrFaHQYXoaxmsYK6inT4r/2AJ5N1HEjjCmQNa7NHcs7rmF4nc1yBdOBJyuIR9zs19UwL+qANwC0Z8laO4PccRWyH6+hn93j7m8sNj6isLwlhcjwb02XjOleHTBa6YU16BZ0xqS2/qsQR/9ZuINPl9D9LqLMSQSPe4CtsyN7IEe2yLSvc9TPAI7uud5TFGf5DnJXSKHQORrl39RHMdsFemTfIbEhrgVD/0bRNyLsxuQRwyC50BPENeJI313E1o7pXyp/gtpUKQMhSuEV6IdTwdFIHsDxdNiqKDrPECYj75IJDlss1ytvhZwGpc+4Tkb7lL0pGt5OwrjS2QWWKCHRb6OgkQS+VdwAdFQZQicv0WkPWJbyBBYLBMDMLIbURMEAKHmn2RNuoDk/qZhb5H8jEmawXVyPsEVSNhUWOiAi0K1ab7GvhJnoXcgxZMTK3tgkCo+NVUnKUZsYvwnGifx+hZUFanROokedAtQ1cFEwD26QVaIf4OCNmgnzo7tJezzEdBQnxU5NhedZgnGvB/x2DtvxIa/E8AyyNKNm7Meu34cPKhLfX3b/IjwbTO4cewXxskNTeuLaw7nPAB+R+Wqb5OWyWQyKQCtfFL/qKASNDpX6WoZ39w1yTT+DNztJhnTrOecpb5nLGlG3cI6cFdAPq5U8ye77uqPbUuDe0zx7OT5knIw1ca2jKs+2CdTpn2tnrsaWFJz0HsV4PKLYkQq7d3O6cBUkS8kHO4c2r6pwpzEnLP64ajQGmmNdX/9HkTOldE5xzNXWODd22p5JHQ6ujhXvHfjUGlzuJigjfbDZvn4iiNaRgVBQ2a6aWgr0Fo/lrpw+4NvhjHoXI5itx90HXFWaG0/Olc3TTvTNE3tpr6zEf+oQ796AsDd39Ph5jkm4XTxWFCPhg3HmKdXWqyLfCCis8kC0pRghXIdIY4eYwuSYZbcAV2RWmJlZLRq+8VWOm0LTKK5uCG0SSUKFJhWIslF2WCsT+ZSRfRO2iKVu1ESWidtYtMEDa5ZgGdI0soFGEaOnifFSwz2YuKYj4foUg2Ij+fTa8QC+kK940Nnw94W6j2fPYBmmzgawifDgy5gowvxyZvsQLESHzLYp8idJfYVtIhGl+eIXEQjZVvmPXHNlS7iZm5EpeCG+1eHENNrUEgP/bNEvKS9SKS4E94X5GJLGNHnTEA73TBCG2fI2v89xbcvYXAtfJ10ZiUoYCR8hkZHUHZ6gcL3lZCNNwFTf2MIiPrsDZ/jmE4vouQ94CPOt1oSMpornNO9lsSc14dyettNxkSgCM6aKXvb9XhOji+5rJFu9jP/D22DcioP1o84AAAAAElFTkSuQmCC'
                        }
                      className={Styles.cardImg} />
                    <div className={Styles.cardContent}>{el.nama_siswa}</div>
                    <div className={Styles.cardContent}>{el.point_siswa} Point</div>
                    <div 
                      onClick={() => this.props.history.push(`/report-student/${el.nisn}`)}
                      className={Styles.mark}>
                      Laporkan Pelanggaran
                    </div>
                  </Col>                  
                ))}
              </Row>

              <div className={Styles.subtitle}>Daftar Siswa Kelas IX</div>
              <Row className={Styles.students}>
                {siswaKelasIX.map((el) => (
                  <Col sm={2} className={Styles.studentCard}>
                    <img
                      alt="student"
                      src={el.photo_siswa 
                          ? `http://localhost:3001/backend1/api/${el.photo_siswa}`
                          : 'data:image/png;base64,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'
                        }
                      className={Styles.cardImg} />
                    <div className={Styles.cardContent}>{el.nama_siswa}</div>
                    <div className={Styles.cardContent}>{el.point_siswa} Point</div>
                    <div 
                      onClick={() => this.props.history.push(`/report-student/${el.nisn}`)}
                      className={Styles.mark}>
                      Laporkan Pelanggaran
                    </div>
                  </Col>                  
                ))}
              </Row>
              
            </Row>
          </Col>
        </Row>

      </Container>
    )
  }
}

export default DashboardTeacher