import React, { 
  Component
} from 'react'
import {
  Alert,
  Button,
  Container,
  Col,
  Row,
  Form,
  FormControl,
  InputGroup,
  ProgressBar
} from 'react-bootstrap'
import { 
  updateProfile,
  getUser 
} from '../../../redux/action/profile'
import Footer from '../../../components/footer/footer'
import NavigationBar from '../../../components/navbar/navbar'
import Styles from './profile.module.css'
import { connect } from 'react-redux'
import { DotsThree } from 'phosphor-react'
import Dummy from '../../../assets/dummy3.jpeg'

class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      form: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        image: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      currentImage: null,
      isUpdate: false,
      alert: false,
      alertMsg: ''
    }
  }

  componentDidMount() {
    this.getUserDetail()
  }

  getUserDetail = () => {
    this.props.getUser()
    .then((res) => {
      const { data } = res.action.payload.data
      console.log(data)
      this.setState({
        ...this.state,
        currentImage: data[0].user_profile_image,
        form: {
          ...this.state.form,
          firstName: data[0].user_name.split(' ')[0],
          lastName: data[0].user_name.split(' ')[1],
          phoneNumber: data[0].user_phone_number,
          email: data[0].user_email,
          image: data[0].user_profile_image,
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    })
  }

  handleUpdateDetails = (event) => {
    const { firstName, lastName, phoneNumber, image } = this.state.form
    event.preventDefault()

    const formData = new FormData()
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('phoneNumber', phoneNumber)

    if(image) {
      formData.append('image', image)
    }

    this.props
      .updateProfile(formData)
      .then((res) => {
        this.setState({
          alert: true,
          isUpdate: true,
          alertMsg: 'Profile updated'
        })
        setTimeout(() => {
          this.setState({
            alert: false,
          })
        }, 3000)
        this.getUserDetail()
      })
      .catch((err) => {
        console.log(err.response)
        this.setState({
          alert: true,
          alertMsg: err.response.data.msg,
        })
        setTimeout(() => {
          this.setState({
            alert: false,
          })
        }, 3000)
        this.getUserDetail()
      })
  }

  handleImage = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        image: event.target.files[0]
      }
    })
    console.log(this.state.form)
  }

  handleFile = (event) => {
    console.log(event.target.file[0])
  }

  render () {
    const { alert, alertMsg,  isUpdate, currentImage } = this.state
    const { firstName, lastName, phoneNumber, email, image } = this.state.form

    return (
      <>
        <NavigationBar isUpdate={isUpdate}/>
        <Container fluid className={Styles.container}>
          <Row className={Styles.contentContainer}>
            
            {/* user left side */}
            <Col sm={3} className={Styles.cardContainer}>
              <Row className={Styles.rowCard1}>
                <Col>INFO</Col>
                <Col className={Styles.more}>
                  <DotsThree size={30}/>
                </Col>
              </Row>

              {image !== null && image.length > 0
                ? (
                <Row>
                  <img
                    src={`http://localhost:3001/backend1/api/${image}`}
                    alt="profile" 
                    className={Styles.profilePicture}
                  />
                </Row>
                )
                : (
                <Row>
                  <img
                    src={Dummy}
                    alt="profile-no-img" 
                    className={Styles.profilePicture}
                  />
                </Row>
                )
              }

              <Row className={Styles.rowCard2}>
                <h6>{`${firstName} ${lastName}`}</h6>
                <p>Movie Goers</p>
                <hr />
              </Row>

              <Row className={Styles.loyaltyCard}>
                <p>Moviegoers</p>
                <h4>120</h4>
                <p>Points</p>
              </Row>

              <Row>
                <p>40 Points to next level</p>
                <ProgressBar animated
                  className={Styles.progress}
                  now={60} />
              </Row>

            </Col>

            <Col></Col>

            <Col sm={8} className={Styles.formContainer}>
              <Row>
                <Col><h6 className={Styles.tab}>Account Settings</h6>
                </Col>
                <Col><h6>Order History</h6>
                </Col>
              </Row>

              <Row className={Styles.titleTab}>
                <div>Details Information</div>
              </Row>

              {alert
                ? (
                <Row>
                  <Alert variant="warning">{alertMsg}</Alert>
                </Row> )
                : ("")
              }

              <Form onSubmit={this.handleUpdateDetails}>
              <Row className={Styles.formRow}>
                <Col sm={6}>

                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={firstName}
                      placeholder=""
                      className={Styles.customInput}
                      onChange={(event) => this.changeText(event)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      placeholder=""
                      className={Styles.customInput}
                      readOnly
                      onChange={(event) => this.changeText(event)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Change Profile Picture</Form.Label>
                    <Form.Control type="file"
                      onChange={(event) => this.handleImage(event)}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    className={Styles.button}
                    type="submit">
                      Update Changes
                  </Button>

                </Col>
                <Col>

                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={lastName}
                      placeholder=""
                      className={Styles.customInput}
                      onChange={this.changeText}
                    />
                  </Form.Group>

                  <Form.Label>Phone Number</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">+62</InputGroup.Text>
                    <FormControl
                      type="number"
                      name="phoneNumber"
                      value={phoneNumber}
                      placeholder=""
                      aria-describedby="basic-addon1"
                      className={Styles.customInput}
                      onChange={this.changeText}
                    />
                  </InputGroup>

                </Col>
              </Row>
              </Form>

              <Row className={Styles.titleTab}>
                <div>Account Privacy</div>
              </Row>

              <Row className={Styles.formRow}>
                <Col>

                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder=""
                      className={Styles.customInput}
                      onChange={this.changeText}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    className={Styles.button}>
                    Update Changes
                  </Button>

                </Col>
                <Col>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder=""
                      className={Styles.customInput}
                      onChange={this.changeText}
                    />
                  </Form.Group>

                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  update: state.updateProfile
})

const mapDispatchToProps = {
  updateProfile,
  getUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)