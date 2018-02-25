import axios from 'axios';

export function setCurrentTerm(value) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_TERM', payload: { value } });
  };
}

export function setTerm(id) {
  return (dispatch) => {
    dispatch({ type: 'INSERT_TERM' });
    axios.put(`api/v1/term/${id}`).then((response) => {
      dispatch({ type: 'INSERT_TERM_SUCCESS', payload: response });
      localStorage.setItem('termId', id);
      dispatch(setCurrentTerm(id));
    }).catch((err) => {
      dispatch({ type: 'INSERT_TERM_FAILS', payload: err.response });
    });
  };
}

export function getCurrentTerm() {
  return (dispatch) => {
    dispatch({ type: 'GET_TERM' });
    axios.get('api/v1/term').then((response) => {
      dispatch({ type: 'GET_TERM_SUCCESS', payload: response });
      localStorage.setItem('termId', response.data.id);
      dispatch(setCurrentTerm(response.data.id));
    }).catch((err) => {
      dispatch({ type: 'GET_TERM_FAILS', payload: err.response });
    });
  };
}
