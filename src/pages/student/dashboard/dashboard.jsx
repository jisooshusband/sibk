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
import Styles from './dashboard.module.css'

class DashboardStudent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: 'Sarah Adara',
    }
  }

  render() {
    return(
      <Container fluid className={Styles.container}>

        <AppNavbar />

        <Row className={Styles.row1}>
          <Col sm={2}>
            <Sidebar activePage={"dashboard"} />
          </Col>

          <Col className={Styles.contentContainer}>
            <Row>
              <Col className={Styles.title}>Dashboard</Col>
              <Col className={Styles.navigation}>
                <Button
                  className={Styles.button}
                  variant="primary">
                  + Buat jadwal konseling
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        
      </Container>
    )
  }

}

export default DashboardStudent
