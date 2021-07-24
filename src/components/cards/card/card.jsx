import React, { Component } from 'react'
import Styles from './card.module.css'
import { withRouter } from 'react-router-dom'

class Cards extends Component {

  handleMovieDetails = (id) => {
    this.props.history.push(`app/movie-details/${id}`)
  }

  render() {
    const { movie_id, movie_image } = this.props.data

    return(
      <>
        <div className={Styles.imgBox}
        onClick={() => {
          this.handleMovieDetails(movie_id)
        }}>
          <img src={`http://localhost:3001/backend1/api/${movie_image}`}
            alt='now showing' 
            className={Styles.showingImg} />
        </div>
      </>
    )
  }
}

export default withRouter(Cards)
