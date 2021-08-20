import React, { Component } from 'react'
import {
  Button,
  Carousel,
  CarouselItem,
  Col,
  Container,
  Row,
} from 'react-bootstrap'
import {
  At,
  Phone
} from 'phosphor-react'
import Footer from '../../components/footer/footer'
import Styles from './home.module.css'
import NavigationBar from '../../components/navbar/navbar'

class Home extends Component {

  toAuth = (props) => {
    this.props.history.push('/auth')
  }

  render() {

    const sources = [
      'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/5212354/pexels-photo-5212354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ]

    return(
      <>

        <Container fluid className={Styles.container}>
          <NavigationBar className={Styles.navigationBar} />
          <Row className={Styles.row1}>
            <Col sm={6}>
              <Carousel className={Styles.carousel}>
                {sources.map((el) => (
                  <CarouselItem>
                    <img src={el} alt="item" className={Styles.carouselItem} />
                  </CarouselItem>
                ))}
              </Carousel>
            </Col>
            <Col className={Styles.col2}>
              <h3>Selamat Datang!</h3>
              <h4>di Sistem Informasi Bimbingan Konseling</h4>
              <p>Aplikasi ini membantu guru dan siswa dalam pencatatan dan penerapan
                nilai-nilai kedisiplinan di sekolah. Aplikasi ini juga menghubungkan
                siswa dan guru secara dua arah dan memudahkan siswa untuk mendapatkan
                bantuan psikologis dari para guru konseling di sekolah.
              </p>

              <Button className={Styles.button}
                onClick={() => window.location.href='/auth'}
              >
                {"Klik disini untuk memulai >"}
              </Button>
            </Col>
          </Row>

          <Row className={Styles.row2}>
            <h5>Keunggulan aplikasi</h5>
            <hr />
            
            <Col sm={4}>
              <ul>
                <li>Data diperbaharui secara real-time</li>
                <li>Privasi terjamin (bcrypt)</li>
              </ul>
            </Col>

            <Col sm={4}>
              <ul>
                <li>Terintegrasi dengan whatsapp</li>
                <li>Orangtua akan mendapat laporan secara real-time</li>
              </ul>
            </Col>

            <Col sm={4}>
              <ul>
                <li>Lacak poin disiplinmu</li>
                <li>Buat jadwal konsultasi</li>
              </ul>
            </Col>
          </Row>
        </Container>

        <Container fluid className={Styles.footer}>
          <p>Dibuat atas kolaborasi dari</p>
          <Row>
            <Col>
              <img src="https://i.ibb.co/wY1SWLk/raw-1-removebg-preview.png" className={Styles.schoolImg} alt="x" />
            </Col>

            <Col>
              <h6>MTs Al Husna, Depok</h6>
              <br />
                <a href="mailto:mtsalhusnadepok1@gmail.com" className={Styles.mailto}>
                  <At size={20} />
                  mtsalhusnadepok1@gmail.com
                </a>
                <p>
                  <Phone size={20} />
                  021-872 4678
                </p>
              <p>Unggul dalam IMTAQ, mulia dalam AKHLAQ dan terampil dalam IPTEK</p>
            </Col>

            <Col>
              <h6>Ladias Hutagalung</h6>
              <br />
              <p>Teknik Informatika, Universitas Indraprasta, 2017</p>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Home
