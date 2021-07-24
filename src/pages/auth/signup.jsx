import Logo from '../../assets/auth-logo.png';
import React, { Component } from 'react';
import Styles from './auth.module.css';
import {
  Container,
  Col,
  Form,
  Row
} from 'react-bootstrap';

class Signup extends Component {

  render() {
    return(
      <>
        <Container fluid>
          <Row>
            <Col className={Styles.left} md={7}>
              <img 
                src={Logo}
                alt="tixscape logo"
                className={Styles.logo}
              />
              <h4 className={Styles.hfour}>wait, watch, wow</h4>
            </Col>
            <Col className={Styles.formFields}>

            {/* <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group> */}
            
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Signup;