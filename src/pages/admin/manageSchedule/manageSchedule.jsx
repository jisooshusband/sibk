import React, { Component } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  NavDropdown,
  Row
} from 'react-bootstrap';
import Footer from '../../../components/footer/footer';
import NavigationBar from '../../../components/navbar/navbar';
import Styles from './manageSchedule.module.css';
import Dummy from '../../../assets/dummy.png';
import cineone from '../../../assets/footer-cineone.png';
import ebv from '../../../assets/footer-ebv.png';
import hiflix from '../../../assets/footer-hiflix.png';


class ManageSchedule extends Component {
  render() {
    const time = ["08:00am", "10:00am", "12:00pm", "14:00pm", "16: 00pm", "18:00pm"];

    return (
      <>
        <NavigationBar/>
        <Container fluid className={Styles.container}>
          <Row>
            <h5>Form Schedule</h5>
          </Row>

          <Row className={Styles.row1}>
            <Col sm={3}>
              <div className={Styles.imageContainer}>
                <img src={Dummy}
                  alt="movie-cover"
                  className={Styles.movieCover}  
                />             
              </div>
             </Col>
            <Col>
              <div className={Styles.formContainer}>
                <h6 className={Styles.inputTitle}>Movie</h6>
                <NavDropdown title="Dropdown" id="nav-dropdown" className={Styles.navDropdown}>
                  <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </div>

              <Row>
                <Col>
                  <div className={Styles.formContainer}>
                    <h6 className={Styles.inputTitle}>Name</h6>
                    <Form.Control 
                      type="text" 
                      className={Styles.customInput}
                      placeholder=""
                    />
                  </div>
                  </Col>
                <Col>
                  
                <div className={Styles.formContainer}>
                  <h6 className={Styles.inputTitle}>Price</h6>
                  <Form.Control 
                    type="text" 
                    className={Styles.customInput}
                    placeholder=""
                  />
                </div>
                </Col>
              </Row>

              <Row>
              <div className={Styles.formContainer}>
                  <h6 className={Styles.inputTitle}>Premiere</h6>
                </div>

                <Col>
                  <div className={Styles.imgDiv}>
                    <img className={Styles.cinemas} src={cineone} alt="cinema" />
                  </div>
                </Col>
                <Col>
                <div className={Styles.imgDiv}>
                    <img className={Styles.cinemas} src={ebv} alt="cinema" />
                  </div>
                </Col>
                <Col>
                <div className={Styles.imgDiv}>
                    <img className={Styles.cinemas} src={hiflix}  alt="cinema"/>
                  </div>
                </Col>
              </Row>

            </Col>
            <Col>
            <div className={Styles.formContainer}>
              <h6 className={Styles.inputTitle}>Location</h6>
                <NavDropdown title="Dropdown" id="nav-dropdown" className={Styles.navDropdown}>
                  <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                </NavDropdown>            
            </div>

              <Row>
                <Col>
                  <div className={Styles.formContainer}>
                    <h6 className={Styles.inputTitle}>Date Start</h6>
                    <Form.Control 
                      type="date" 
                      className={Styles.customInput}
                      placeholder=""
                    />
                  </div>
                </Col>
                <Col>
                  <div className={Styles.formContainer}>
                    <h6 className={Styles.inputTitle}>Date End</h6>
                    <Form.Control 
                      type="date" 
                      className={Styles.customInput}
                      placeholder=""
                    />
                  </div>
                </Col>
              </Row>

              <div className={Styles.formContainer}>
                <Row>
                  <h6>Time</h6>
                  {time.map((el) => {
                    return (
                      <Col xs={3} className={Styles.times}>
                        {el}
                      </Col>
                    )
                  })}
               </Row>

               <Row>
                 <Col>
                  <Button variant="outline-primary" className={Styles.resetButton}>
                    Reset</Button>
                 </Col>

                 <Col>
                  <Button variant="primary" className={Styles.submitButton}>
                    Submit</Button>
                 </Col>

               </Row>
              </div>
  

            </Col>
          </Row>

        </Container>
        <Footer />
      </>
    )
  }
}

export default ManageSchedule;