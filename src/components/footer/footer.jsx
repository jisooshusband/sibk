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
          <Col style={{ textAlign:"start" }}><p>SIBK 2021</p></Col>
          <Col><p>{""}</p></Col>
          <Col style={{ textAlign:"end" }}><p>Ladias Hutagalung</p></Col>
        </Row>
      </>
    )
  }
}

export default Footer