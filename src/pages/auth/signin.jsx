import React, { Component } from 'react';
import Styles from './auth.module.css';
import {
  Alert,
  Button,
  Container,
  Col,
  Form,
  Row,
} from 'react-bootstrap';
import { connect } from 'react-redux'
import { signin } from '../../redux/action/auth';
import authLogo from '../../assets/auth-logo.png';
import google from '../../assets/google.png';
import facebook from '../../assets/fb.png';
import tixscapeLogo from '../../assets/tixscape-logo.png';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: "",
        password: ""
      },
      alertMsg: "",
      alert: false,
    }
  }

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    })
  }

  handleLogin = (event) => {
    event.preventDefault();
    this.props
    .signin(this.state.form)
      .then((res) => {
        this.setState({
          alertMsg: res.action.payload.data.msg,
          alert: true
        })
        setTimeout(() => {
          this.setState({
            alert: false
          })
        }, 3000)
        localStorage.setItem("token", this.props.auth.data.token)
        this.props.history.push("/")
      })
      .catch((err) => {
        this.setState({
          alertMsg: err.response.data.msg,
          alert: true
        })
        setTimeout(() => {
          this.setState({
            alert: false
          })
        }, 3000)
      })
  }

  render() {
    const { email, password } = this.state.form
    const { alert, alertMsg } = this.state

    return (
      <>
        <Container fluid>

          <Row>

            <Col sm={7} className={Styles.leftSide}>
              <div className={Styles.logoContainer}>
                <img src={authLogo} className={Styles.authLogo} alt="auth-logo"/>
              </div>
              <div>wait watch wow</div>
            </Col>

            <Col sm={5} className={Styles.rightSide}>

              <img src={tixscapeLogo} className={Styles.tixscapeLogo} alt="logo" />

              <Row>
                <h3>Sign In</h3>
                <p>Sign in with your data that you entered
                  during your registration</p>

                {alert
                  ? (<Alert variant="warning">
                      {alertMsg}
                    </Alert>)
                  : ("")
                }
              </Row>
              <Form onSubmit={this.handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  className={Styles.customInput}
                  placeholder={"youremail@mailprovider.com"}
                  onChange={(event) => this.changeText(event)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  className={Styles.customInput}
                  placeholder="******"
                  onChange={(event) => this.changeText(event)}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className={Styles.signinButton}>
                Sign In
              </Button>
              </Form>

              <p className={Styles.forget}>Forgotten your password ?
                <span className={Styles.toReset}> Reset here !</span>
              </p>

              <Row className={Styles.or}>
                <Col><hr /></Col>
                <Col>or</Col>
                <Col><hr /></Col>
              </Row>

              <Row className={Styles.or}>
                <Col>
                  <Button variant="light" className={Styles.socialButton}>
                    <img src={google} alt="google" className={Styles.socialIcon} />
                    Google</Button>
                </Col>
                <Col sm={2}>{""}</Col>
                <Col>
                  <Button variant="light" className={Styles.socialButton}>
                    <img src={facebook} alt="facebook" className={Styles.socialIcon} />
                    Facebook</Button>
                </Col>
              </Row>

            </Col>

          </Row>

        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = { signin }

export default connect(mapStateToProps, mapDispatchToProps)(Signin)