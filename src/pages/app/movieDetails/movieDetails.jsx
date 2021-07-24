import React, { Component } from 'react';
import axiosApiIntances from '../../../utils/axios'
import Styles from './movieDetails.module.css'
import NavigationBar from '../../../components/navbar/navbar';
import Footer from '../../../components/footer/footer'
import {
  Container,
  Col,
  Row,
} from 'react-bootstrap'

class MovieDetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {
        movie_id: this.props.match.params.id,
        movie_name: '',
        movie_duration: '',
        movie_category: '',
        movie_release_date: '',
        movie_directed_by: '',
        movie_casts: '',
        movie_synopsis: ''
      },
      premieres: [],
      show_time_date: "",
      premiere_location: "Jakarta",
      pagination: {},
      page: 1,
      limit: 5
    }
  }

  componentDidMount() {
    this.getMovieDetails()
    this.getPremiers()
    console.log(this.state)
  }

  getMovieDetails = () => {
    const { movie_id } = this.state.data
    axiosApiIntances
      .get(`movie/${movie_id}`)
      .then((res) => {
        this.setState({
          data: {
            ...this.state.data,
            ...res.data.data[0]
          }
        })
      })
      .catch((err) => {
        console.log(err.response)
      })
  }

  getPremiers = () => {
    const { movie_id } = this.state.data
    let { premiere_location, page, limit } = this.state
    premiere_location = `%${premiere_location}%`

    axiosApiIntances
    .get(`premiere/premiere-movie?location=${premiere_location}&movieId=${movie_id}&limit=${limit}&page=${page}`)
    .then((res) => {
      this.setState({
        premieres: res.data.data
      })
    })
    .catch((err) => {
      console.log(err.response)
    })
  }

  render() {
    return(
      <>
        <NavigationBar />

        <Container fluid className={Styles.container}>

          <Row className={Styles.row1}>
            
            <Col sm={3}>
              <div className={Styles.imageBox}>
                <img
                  src={`http://localhost:3001/backend1/api/${this.state.data.movie_image}`} 
                  alt='movie cover'
                  className={Styles.movieImage}
                />                
              </div>
            </Col>

            <Col>
              <div className={Styles.movieTitle}>{this.state.data.movie_name}</div>
              <div className={Styles.movieCategory}>{this.state.data.movie_category}</div>

              <div className={Styles.head}>Release date</div>
              <div className={Styles.content}>{this.state.data.movie_release_date}</div>

              <div className={Styles.head}>Duration</div>
              <div className={Styles.content}>{this.state.data.movie_duration}</div>

              <div className={Styles.head}>Directed by</div>
              <div className={Styles.content}>{this.state.data.movie_directed_by}</div>

              <div className={Styles.head}>Casts</div>
              <div className={Styles.content}>{this.state.data.movie_casts}</div>

            </Col>
          </Row>

          <Row className={Styles.Row1}>
            <div className={Styles.head}>Synopsis</div>
            <div className={Styles.content}>{this.state.data.movie_synopsis}</div>
          </Row>

          <Footer className={Styles.footer} />
        </Container>
      </>
    )
  }
}

export default MovieDetails