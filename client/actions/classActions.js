import axios from 'axios';
import jwt from 'jsonwebtoken';

export function setCurrentTeacherClasses(classes) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_TEACHER_CLASSES', payload: { classes } });
  };
}

export function getTeacherClasses() {
  return (dispatch) => {
    dispatch({ type: 'GET_TEACHER_CLASSES' });
    axios.get('api/v1/subjectclasses').then((response) => {
      dispatch({ type: 'TEACHER_CLASSES_SUCCESS', payload: response });
      const { token } = response.data;
      localStorage.setItem('teacherClasses', token);
      dispatch(setCurrentTeacherClasses(jwt.decode(token)));
    }).catch((err) => {
      dispatch({ type: 'TEACHER_CLASSES_FAIL', payload: err.response });
    });
  };
}

export function deleteTeacherClasses(id) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_TEACHER_CLASSES' });
    axios.delete(`api/v1/subjectclasses/${id}`).then((response) => {
      dispatch({ type: 'DELETE_TEACHER_CLASSES_SUCCESS', payload: response });
      dispatch(getTeacherClasses());
    }).catch((err) => {
      dispatch({ type: 'DELETE_TEACHER_CLASSES_FAIL', payload: err.response });
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

export function createSubjectClasses(id) {
  const data = {
    classId: id,
  };
  return (dispatch) => {
    dispatch({ type: 'CREATE_TEACHER_CLASSES' });
    axios.post('api/v1/subjectclasses', data).then((response) => {
      dispatch({ type: 'CREATE_TEACHER_CLASSES_SUCCESS', payload: response });
      dispatch(getTeacherClasses());
    }).catch((err) => {
      dispatch({ type: 'CREATE_TEACHER_CLASSES_FAILS', payload: err.response });
    });
  };
}