import React, { Component } from 'react'
import {
  Alert,
  Button,
  Dropdown,
  Container,
  Col,
  Form,
  Row
} from 'react-bootstrap'
import { connect } from 'react-redux'
import CardEdit from '../../../components/cards/cardEdit/cardEdit'
import Dummy from '../../../assets/dummy.png'
import Footer from '../../../components/footer/footer'
import moment from 'moment'
import NavigationBar from '../../../components/navbar/navbar'
import {
  deleteMovie,
  getAllMovie,
  postMovie,
  updateMovie
} from '../../../redux/action/movie'
import Styles from './manageMovie.module.css'
import ReactPaginate from 'react-paginate'

class ManageMovie extends Component {

  constructor(props) {
    super(props)
    this.state = {
      search: '%%',
      sortBy: 'movie_name ASC',
      form: {
        movieName: '',
        movieCategory: '',
        movieReleaseDate: '',
        movieDuration: '',
        movieDirectedBy: '',
        movieCasts: '',
        movieSynopsis: '',
        movieImage: null,
        image: null
      },
      id: 0,
      isUpdate: false,
      showDeletionAlert: false,
      deletionAlertMsg: '',
      showUpdateAlert: false,
      updateAlertMsg: '',
      limit: 10,
      page: 1,
    }
  }

  componentDidMount(prevProps, prevState) {
    this.getData();
    if (this.props.auth.data.user_role !== 'admin') {
      alert("You are not authorized to access this page")
      this.props.history.push("/")
    } else {
      // if(prevState) {
      //   if (
      //     prevState.search !== this.state.search ||
      //     prevState.sortBy !== this.state.sortBy
      //   ) {
      //     this.setState({ page: 1 }, () => {
      //       this.getData();
      //     });
      //   }
    
      //   if (
      //     prevState.search !== this.state.search ||
      //     prevState.sortBy !== this.state.sortBy ||
      //     prevState.page !== this.state.page
      //   ) {
      //     this.props.history.push(
      //       `/main/admin/manage-movie?search=${this.state.search}&sortby=${this.state.sortBy}&page=${this.state.page}`
      //     );
      //   }
      // }
    }
  }

  getData = () => {
    console.log("Get Data !");
    const { page, limit, sortBy, search } = this.state;

    this.props.getAllMovie(page, limit, sortBy, search);
  };

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    })
  }

  handleReset = (event) => {
    this.setState({
      isUpdate: false,
      form: {
        movieName: '',
        movieCategory: '',
        movieReleaseDate: '',
        movieDuration: '',
        movieDirectedBy: '',
        movieCasts: '',
        movieSynopsis: '',
        movieImage: null,
        image: null
      }
    })
  } 

  handleImage = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        image: event.target.files[0]
      }
    })
    // if (event.target.files[0]) {
    //   this.setState({
    //     form: {
    //       ...this.state.form,
    //       movieImage: URL.createObjectURL(event.target.files[0]),
    //       image: event.target.files[0]
    //     }
    //   })
    // } else {
    //   this.setState({
    //     form: {
    //       ...this.state.form,
    //       movieImage: null,
    //       image: null
    //     }
    //   })
    // }
  }

  handleSubmit = () => {
    const { isUpdate } = this.state;

    isUpdate 
    ? (this.updateMovie()) 
    : ( this.submitMovie() )
  }
 
  handleUpdate = (data) => {
    // method will be sent to cards
    const idMovie = data.movie_id
    this.setState({
      isUpdate: true,
      id: idMovie,
      page: 1,
      limit: 10,
      sortBy: 'movie_name ASC',
      search: '%%',
      form: {
        movieName: data.movie_name,
        movieCategory: data.movie_category,
        movieReleaseDate: moment(data.movie_release_date).format("YYYY-MM-DD"),
        movieDuration: data.movie_duration,
        movieDirectedBy: data.movie_directed_by,
        movieCasts: data.movie_casts,
        movieSynopsis: data.movie_synopsis,
        movieImage: `http://localhost:3001/backend1/api/${data.movie_image}`,
        image: null
      }
    })
  }

  handleDelete = (id) => {
    // method will be sent to cards
    this.props
      .deleteMovie(id)
      .then((res) => {
        this.setState({
          showDeletionAlert: true,
          deletionAlertMsg: "Movie deleted"
        }, () => {
          this.getData()
        })
        setTimeout(() => {
          this.setState({
            showDeletionAlert: false,
          })
        }, 3000)
      })
      .catch((err) => {
        this.setState({
          showDeletionAlert: true,
          deletionAlertMsg: "Failed deleting data"
        })
        setTimeout(() => {
          this.setState({
            showDeletionAlert: false,
          })
        }, 3000)
      })
  }

  updateMovie = () => {
    const { form, id } = this.state

    delete form.movieImage

    if (!form.image) {
      delete form.image
    }

    const formData = new FormData()
    for(const key in form) {
      formData.append(key, form[key])
    }

    this.props
    .updateMovie(id, formData)
    .then((res) => {
      this.setState({
        showUpdateAlert: true,
        updateAlertMsg: "Movie updated"
      })
      setTimeout(() => {
        this.setState({
          showUpdateAlert: false,
        })
      }, 3000)
      this.getData()
    })
    .catch((err) => {
      this.setState({
        showUpdateAlert: true,
        updateAlertMsg: "Failed updating data"
      })
      setTimeout(() => {
        this.setState({
          showUpdateAlert: false,
        })
      }, 3000)
    })
  }

  submitMovie = () => {
    const { form } = this.state;

    const formData = new FormData()
    for(const key in form) {
      formData.append(key, form[key])
    }
    this.props
    .postMovie(formData)
    .then((res) => {
      this.setState({
        showUpdateAlert: true,
        updateAlertMsg: "Success creating new movie",
      })
      setTimeout(() => {
        this.setState({
          showUpdateAlert: false,
        })
      }, 3000)
      this.getData()
    })
    .catch((err) => {
      this.setState({
        showUpdateAlert: true,
        updateAlertMsg: "Failed creating new movie"
      })
      setTimeout(() => {
        this.setState({
          showUpdateAlert: false,
        })
      })
    })

  }

  handleSelect = (event) => {
    console.log(event)

    this.setState({
      sortBy: event
      // sortBy: `"${event}"`,
    })
  }
  
  render() {
    const {
      isUpdate,
      showDeletionAlert,
      showUpdateAlert,
      deletionAlertMsg,
      updateAlertMsg,
    } = this.state

    const {
      dataMovie,
      pagination
    } = this.props.movie

    const {
      movieName,
      movieCategory,
      movieReleaseDate,
      movieDuration,
      movieDirectedBy,
      movieCasts,
      movieSynopsis,
      movieImage,
    } = this.state.form
    return(
      <>
        <NavigationBar />
        <Container fluid className={Styles.container}>
          <h5>Form Movie</h5>

          <Row className={Styles.row1}>
            <Row>
              <Col sm={3}>
                <div className={Styles.imageBox}>
                  <img
                    src={movieImage ? movieImage : Dummy}
                    className={Styles.movieCover}
                    alt="movie-cover"
                  />
                </div>
                <div className={Styles.filePicker}>
                  <p>Select image</p>
                  <Form>
                    <Form.Group>
                      <Form.File
                        onChange={(event) => this.handleImage(event)}
                      />
                    </Form.Group>
                  </Form>
                </div>
              </Col>
              <Col>
                <Form.Group className={Styles.customForm}>
                  <Form.Label>Movie Name</Form.Label>
                  <Form.Control 
                    type="text"
                    name="movieName"
                    value={movieName}
                    placeholder="Input movie name"
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>

                <Form.Group className={Styles.customForm}>
                  <Form.Label>Director</Form.Label>
                  <Form.Control 
                    type="text"
                    name="movieDirectedBy"
                    value={movieDirectedBy}
                    placeholder="Input movie director"
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>
                
                <Form.Group className={Styles.customForm}>
                  <Form.Label>Release Date</Form.Label>
                  <Form.Control 
                    type="date"
                    name="movieReleaseDate"
                    value={movieReleaseDate}
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>

                <Form.Group className={Styles.customForm}>
                  <Form.Label>Synopsis</Form.Label>
                  <Form.Control className={Styles.synopsisField}
                    type="text"
                    name="movieSynopsis"
                    value={movieSynopsis}
                    placeholder="A long time ago in a galaxy far far away"
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className={Styles.customForm}>

                  {
                    showUpdateAlert
                    ? <Alert variant="warning" className={Styles.alert}>{updateAlertMsg}</Alert>
                    : ""
                  }

                  <Form.Label>Category</Form.Label>
                  <Form.Control 
                    type="text"
                    name="movieCategory"
                    value={movieCategory}
                    placeholder="Input movie categories"
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>

                <Form.Group className={Styles.customForm}>
                  <Form.Label>Casts</Form.Label>
                  <Form.Control 
                    type="text"
                    name="movieCasts"
                    value={movieCasts}
                    placeholder="Input movie casts"
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>

                <Form.Group className={Styles.customForm}>
                  <Form.Label>Durations</Form.Label>
                  <Form.Control 
                    type="number"
                    name="movieDuration"
                    value={movieDuration}
                    placeholder="Input movie durations in minutes"
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <div className={Styles.buttons}>
                <Button 
                  variant="outline-primary"
                  className={Styles.resetButton}
                  onClick={() => this.handleReset()}
                >Reset</Button>
                <Button
                  variant="primary"
                  className={Styles.submitButton}
                  onClick={() => this.handleSubmit()}
                >
                  {isUpdate
                    ? "Update"
                    : "Submit"
                  }
                </Button>
              </div>
            </Row>
          </Row>
          
          <Row className={Styles.titleRow}>
            <Col>
              <h5>Data Movie</h5>
            </Col>
            <Col>
              <Dropdown className={Styles.dropdown} onSelect={this.handleSelect}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic" className={Styles.dropdownButton}>
                  Sort
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="movie_name ASC">Movie name A-Z</Dropdown.Item>
                  <Dropdown.Item eventKey="movie_name DESC">Movie name Z-A</Dropdown.Item>
                  <Dropdown.Item eventKey="movie_release_date DESC">Latest release</Dropdown.Item>
                  <Dropdown.Item eventKey="movie_release_date ASC">Oldest release</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </Col>
          </Row>

          {showDeletionAlert
            ? <Alert variant="warning">{deletionAlertMsg}</Alert>
            : ""
          }

          <Row className={Styles.row2}>
            {dataMovie.map((item, key) => {
              return(
                <Col lg={3} md={4} key={key} className="mb-2">
                  <CardEdit 
                    data={item}
                    handleUpdate={this.handleUpdate.bind(this)}
                    handleDelete={this.handleDelete.bind(this)}
                  />
                </Col>
              )
            })}
          </Row>

          <div className={Styles.divPagination}>
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pagination.totalPage ? pagination.totalPage : 0}
                marginPagesDisplayed={5}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={Styles.pagination}
                subContainerClassName={`${Styles.pages} ${Styles.pagination}`}
                activeClassName={Styles.active} 
              />
            </div>

        </Container>
        <div className={Styles.footer}>
          <Footer />
        </div>
      </>
    )
  }
}

const mapDispatchToProps = {
  deleteMovie,
  getAllMovie,
  postMovie,
  updateMovie
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  movie: state.movie
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageMovie)