import axios from 'axios';

export function setCurrentWeek(value) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_WEEK', payload: { value } });
  };
}

export function setWeek(id) {
  return (dispatch) => {
    dispatch({ type: 'INSERT_WEEK' });
    axios.put(`api/v1/week/${id}`).then((response) => {
      dispatch({ type: 'INSERT_WEEK_SUCCESS', payload: response });
      localStorage.setItem('weekId', id);
      dispatch(setCurrentWeek(id));
    }).catch((err) => {
      dispatch({ type: 'INSERT_WEEK_FAILS', payload: err.response });
    });
  };
}

export function getCurrentWeek() {
  return (dispatch) => {
    dispatch({ type: 'GET_WEEK' });
    axios.get('api/v1/week').then((response) => {
      dispatch({ type: 'GET_WEEK_SUCCESS', payload: response });
      localStorage.setItem('weekId', response.data.id);
      dispatch(setCurrentWeek(response.data.id));
    }).catch((err) => {
      dispatch({ type: 'GET_WEEK_FAILS', payload: err.response });
    });
  };
}