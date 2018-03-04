import axios from 'axios';
import jwt from 'jsonwebtoken';


export function getTeacherClasses() {
  return (dispatch) => {
    dispatch({ type: 'GET_TEACHER_CLASSES' });
    axios.get('api/v1/subjectclasses').then((response) => {
      dispatch({ type: 'TEACHER_CLASSES_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'TEACHER_CLASSES_FAIL', payload: err.response });
    });
  };
}

export function getClasses() {
  return (dispatch) => {
    dispatch({ type: 'GET_CLASSES' });
    axios.get('api/v1/classes').then((response) => {
      dispatch({ type: 'GET_CLASSES_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'GET_CLASSES_FAIL', payload: err.response });
    });
  };
}

export function createSubjectClasses(data) {
  return (dispatch) => {
    dispatch({ type: 'CREATE_TEACHER_CLASSES' });
    axios.post('api/v1/feedbacks', data).then((response) => {
      dispatch({ type: 'CREATE_TEACHER_CLASSES_SUCCESS', payload: response });
      dispatch(getTeacherClasses());
    }).catch((err) => {
      dispatch({ type: 'CREATE_TEACHER_CLASSES_FAILS', payload: err.response });
    });
  };
}