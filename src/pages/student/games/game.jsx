import React, { Component } from 'react'
import {
  Alert,
  Button,
  Container,
  Col,
  Carousel,
  Row
} from 'react-bootstrap'
import AppNavbar from '../../../components/navbar/navbar'
import { connect } from 'react-redux'
import Sidebar from '../../../components/sidebar/sidebar'
import axiosApiIntances from '../../../utils/axios'
import Styles from './game.module.css'
import fs from 'fs'
import Axios from 'axios'

class Game extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isStart: false,
      isFinished: false,
      soal: [
        {
          "cat": "ANALOGI",
          "q": "WHITE BOARD : SPIDOL",
          "c1": "PENSIL : BUKU|X",
          "c2": "CANVAS : KUAS|Y",
          "c3": "KERTAS : PENGGARIS|X"
        },
        {
          "cat": "ANALOGI",
          "q": "POHON : BUAH",
          "c1": "PAPAN TULIS : DIKTAT|X",
          "c2": "KUDA : BALAP|X",
          "c3": "SAPI : SUSU|Y"
        },
        {
          "cat": "ANALOGI",
          "q": "LAPAR : MAKAN",
          "c1": "PANAS : DINGIN|X",
          "c2": "CAPEK : ISTIRAHAT|Y",
          "c3": "SAPI : SUSU|X"
        },
        {
          "cat": "ANALOGI",
          "q": "HUJAN : AIR",
          "c1": "SALJU : ES|Y",
          "c2": "KUDA : BALAP|X",
          "c3": "SAPI : SUSU|Y"
        },
        {
          "cat": "ANALOGI",
          "q": "IMUN : IMUNISASI",
          "c1": "PERSON : PERSONIFIKASI|Y",
          "c2": "MISKIN : KAYA|X",
          "c3": "SAHAM : MODAL|X"
        },
        {
          "cat": "MATEMATIKA",
          "q": "4, 5, 7, 6, 7, 8. 8, …",
          "c1": "9|Y",
          "c2": "6|X",
          "c3": "20|X"
        }
      ],
      temp: [],
      right: 0,
      wrong: 0
    }
  }

  componentDidMount() {
  }

  check = (event) => {
    let tempX = this.state.temp;
    if (tempX.length <= this.state.soal.length) {
      tempX.push(event.target.value);
      this.setState({
        temp: tempX
      })
    } else {
      this.setState({
        isStart: false,
        isFinished: true
      })
      let x = 0
      let y = 0
      for(let i in this.state.temp) {
        this.state.temp[i] === 'Y' ? y = y+1 : x = x + 1
      }
      this.setState({
        right: y,
        wrong: x
      })
    }
  }
  
  handleStart = () => {
    this.setState({
      isStart: true
    })
  }

  render() {


    const { isStart, isFinished, right, wrong } = this.state

    const { soal } = this.state

    return(
      <Container fluid className={Styles.container}>

        <AppNavbar activePage={"game"} />

        <Row className={Styles.row1}>
          <Col sm={2}>
            <Sidebar />
          </Col>

          <Col className={Styles.contentContainer}>
            <Row>
              <Col className={Styles.title}>Quiz</Col>
              <Col className={Styles.navigation}>
                <Button
                  className={Styles.button}
                  onClick={this.handleStart}
                  variant="primary">
                    Mulai
                </Button>
              </Col>
            </Row>

            <Row style={isFinished ? {display: "none"} : { display: "block"}}>
              <div style={isStart ? { display: "none" } : { display: "block" } }
                onClick={this.handleStart}
                className={Styles.splashScreen}>
                Click Untuk Mulai
              </div>
            </Row>

            <Row>
              <div style={isFinished ? { display: "block" } : { display: "none" } }
                className={Styles.result}>
                  Hasil
                  <h6>Kamu berhasil menjawab {right} dari {soal.length} soal</h6>
              </div>
            </Row>

            <Row>
              <Carousel
                style={isStart ? { display: "block" } : { display: "none" }}
                className={Styles.quizzies}
                >{soal.map((el) => (
                  <Carousel.Item>
                    <img
                      className={`d-block w-100 ${Styles.quizzies}`}
                      src="https://images.pexels.com/photos/5088008/pexels-photo-5088008.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>{el.cat}</h3>
                      <h3>{el.q}</h3>
                      <Row>
                        <Col>
                          <Button 
                            value={el.c1.split('|')[1]}
                            onClick={(event) => this.check(event)}
                            className={Styles.choice}>{el.c1.split('|')[0]}</Button>{""}</Col>
                        <Col>
                          <Button 
                            value={el.c2.split('|')[1]}
                            onClick={(event) => this.check(event)}
                            className={Styles.choice}>{el.c2.split('|')[0]}</Button>{""}</Col>
                        <Col>
                          <Button 
                            value={el.c3.split('|')[1]}
                            onClick={(event) => this.check(event)}
                            className={Styles.choice}>{el.c3.split('|')[0]}</Button>{""}</Col>
                      </Row>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Row>
          </Col>
        </Row>

      </Container>
    )
  }

}

export default Game
