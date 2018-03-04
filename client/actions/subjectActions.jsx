import axios from 'axios';

export function getSubjects() {
  return (dispatch) => {
    dispatch({ type: 'GET_SUBJECTS' });
    axios.get('api/v1/subjects').then((response) => {
      dispatch({ type: 'GET_SUBJECTS_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'GET_SUBJECTS_FAIL', payload: err.response });
    });
  };
}