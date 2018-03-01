import axios from 'axios';

export function setCurrentFeedback(newFeedback) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_FEEDBACK', payload: { newFeedback } })
  };
}

export function getFeedback(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_FEEDBACK' });
    axios.get(`api/v1/feedback/${id}`).then((response) => {
      dispatch({ type: 'GET_FEEDBACK_SUCCESS', payload: response });
      const { token } = response.data;
      localStorage.setItem('feedback', token);
      dispatch(setCurrentFeedback(jwt.decode(token)));
    }).catch((err) => {
      dispatch({ type: 'GET_FEEDBACK_FAILS', payload: err.response });
    });
  };
}

export function createFeedback(data) {
  return (dispatch) => {
    dispatch({ type: 'CREATE_FEEDBACK' });
    axios.post('api/v1/feedbacks', data).then((response) => {
      dispatch({ type: 'CREATE_FEEDBACK_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'CREATE_FEEDBACK_FAILS', payload: err.response });
    });
  };
}

export function modifyFeedback(id, data) {
  return (dispatch) => {
    dispatch({ type: 'MODIFY_FEEDBACK' });
    axios.put(`api/v1/feedback/${id}`, data).then((response) => {
      dispatch({ type: 'MODIFY_FEEDBACK_SUCCESS', payload: response });
      const { token } = response.data;
      localStorage.setItem('feedback', token);
      dispatch(setCurrentFeedback(jwt.decode(token)));
    }).catch((err) => {
      dispatch({ type: 'MODIFY_FEEDBACK_FAIL', payload: err.response });
    });
  };
}

