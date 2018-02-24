import { combineReducers } from 'redux';
import auth from './auth';
import classes from './class';
import note from './note';
import term from './term';
import week from './week';
import assignment from './assignment';
import feedback from './feedback';

export default combineReducers({
  auth,
  classes,
  note,
  term,
  week,
  assignment,
  feedback,
});
