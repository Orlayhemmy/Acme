import axios from 'axios';

export function getTeacherClasses(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_TEACHER_CLASSES' });
    axios.get(`api/v1/classes/${id}`).then((response) => {
      dispatch({ type: 'TEACHER_CLASSES_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'TEACHER_CLASSES_FAIL', payload: err.response });
    });
  };
}
