import { combineReducers } from 'redux';
import auth from './auth';
import classes from './class';

export default combineReducers({
  auth,
  classes,
});
