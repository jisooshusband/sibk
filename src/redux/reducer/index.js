import { combineReducers } from "redux";
import auth from './auth'
import movie from './movie'
import profile from './profile'

export default combineReducers({
  auth,
  movie,
  profile
})
