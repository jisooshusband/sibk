import React, { Component } from 'react'
import Styles from './footer.module.css'
import {
  Row,
  Col,
} from 'react-bootstrap'
import logo from '../../assets/tixscape-logo.png'
import cineone from '../../assets/footer-cineone.png'
import ebv from '../../assets/footer-ebv.png'
import hiflix from '../../assets/footer-hiflix.png'


class Footer extends Component {
  
  render() {
    return(
      <>
        <Row className={Styles.container}>
          <Col>
            <div>
              <img src={logo}
              className={Styles.logo}
              alt='logo'
              />              
            </div>
            <div>Book tickets conveniently, watch movie quitely.</div>
          </Col>
          <Col>
            <div className={Styles.head}>Explore</div>
            <div className={Styles.content}>Payments</div>
            <div className={Styles.content}>My Bookings</div>
            <div className={Styles.content}>Profile</div>
            <div className={Styles.content}>Contact us</div>
          </Col>
          <Col>
            <div className={Styles.head}>Our Sponsors</div>
            <div>
            <img 
                src={hiflix}
                className={Styles.sponsors}
                alt='sponsor'
              />
            </div>
            <div>
              <img 
                src={cineone}
                className={Styles.sponsors}
                alt='sponsor'
              />
            </div>
            <div>
              <img 
                src={ebv}
                className={Styles.sponsors}
                alt='sponsor'
              />
            </div>
          </Col>
          <Col>
            <div className={Styles.head}>Follow us</div>
          </Col>
        </Row>
      </>
    )
  }
}

export default Footer