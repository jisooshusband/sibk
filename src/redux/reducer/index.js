import { combineReducers } from "redux";
import auth from './auth'
import penalty from './penalty'
import student from './student'

export default combineReducers({
  auth,
  penalty,
  student
})
