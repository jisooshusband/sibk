import React, { Component } from 'react'
import axiosApiIntances from '../../utils/axios'
// import Footer from '../../components/footer/footer'
import NavigationBar from '../../components/navbar/navbar'
import NoLoginNavigationBar from '../../components/navbar/noLoginNavbar'
import Cards from '../../components/cards/card/card'
import Footer from '../../components/footer/footer'
// import ReactPaginate from 'react-paginate'
import { connect } from 'react-redux'
import { signout } from '../../redux/action/auth'
import {
  Button,
  Col,
  Form,
  Container,
  Row,
} from 'react-bootstrap'
import Styles from './home.module.css'
import banner from '../../assets/banner.png'

class Home extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      isLogin: false,
      nowPlaying: [],
      upcoming: [],
      pagination:  {},
      page: 1,
      limit: 5,
    }
  }

  componentDidMount() {

    if (this.props.auth.data.token) {
      this.setState({ isLogin: true })
    } else {
      this.setState({ isLogin: false })
    }

    if (this.state.isLogin) {
      console.log('y');
    }

    this.getNowPlaying(this.state.page, this.state.limit, 'movie_release_date DESC')
  }

  getNowPlaying = (page, limit, sort) => {
    axiosApiIntances
      .get(`movie?page=${page}&limit=${limit}&sort=${sort}`)
      .then((res) => {
        this.setState(({
          nowPlaying: res.data.data,
          pagination: res.data.pagination
        }))
      })
      .catch((err) => {
        console.log(err.response)
      })
  }

  render() {

    const { isLogin } = this.state

    return(
      <>
        { 
          isLogin
          ? (<NavigationBar />)
          : (<NoLoginNavigationBar />)
        }
        <Container fluid className={Styles.container}>
          <Row className={Styles.row1}>
            <Col className={Styles.left}>
              <div className={Styles.tagline}>Nearest Cinema, Latest Movie</div>
              <div className={Styles.taglineLoud}>Find out now</div>
            </Col>
            <Col className={Styles.right}>
              <img src={banner} alt='banner' className={Styles.banner}/>
            </Col>
          </Row>

          <Row className={Styles.row2}>
            <Row>
              <Col>
                <div className={Styles.nowShowing}>Now Showing</div>
              </Col>
              <Col className={Styles.viewAll}>View all</Col>
            </Row>

            <Row>
              {this.state.nowPlaying.map((item, index) => {
                return(
                  <Col>
                    <Cards data={item} />
                  </Col>
                )
              })}
            </Row>
          </Row>

          <Row className={Styles.row2}>
            <Row>
              <Col>
                <div className={Styles.nowShowing}>Upcoming Movies</div>
              </Col>
              <Col className={Styles.viewAll}>View all</Col>
            </Row>

            <Row>
              {this.state.months.map((i, idx) => {
                return (
                  <Col sm={1}>
                    <Button variant='outline-primary' className={Styles.months}>
                      {i}
                    </Button>
                  </Col>
                )
              })}
            </Row>

            <Row>
              {this.state.nowPlaying.map((item, index) => {
                return(
                  <Col>
                    <Cards data={item} />
                  </Col>
                )
              })}
            </Row>
          </Row>

          <Row>
            <div className={Styles.newsLetter}>
              <div>Be the vanguard of the</div>
              <div className={Styles.moviegoers}>Movie goers</div>
              <Form>
                <Row>
                  <Col md={9}>
                    <Form.Control placeholder="Email" />
                  </Col>
                  <Col md={3}>
                    <Button variant='primary' className={Styles.joinButton}>Join</Button>
                  </Col>
                </Row>
              </Form>
              <div className={Styles.info}>By joining to our newsletter</div>
              <div className={Styles.info}>You will always be the first to know our special deals and promotions</div>
            </div>
          </Row>

          <Row className={Styles.footer}>
            <Footer />
          </Row>
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = { signout }

export default connect(mapStateToProps, mapDispatchToProps)(Home)