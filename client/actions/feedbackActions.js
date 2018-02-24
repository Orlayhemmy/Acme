import axios from 'axios';

export function setCurrentFeedback(id) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_FEEDBACK', payload: { id } })
  };
}

export function getFeedback(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_FEEDBACK' });
    axios.get(`api/v1/feedback/${id}`).then((response) => {
      dispatch({ type: 'GET_FEEDBACK_SUCCESS', payload: response });
      localStorage.setItem('feedbackId', id);
      dispatch(setCurrentFeedback(id));
    }).catch((err) => {
      dispatch({ type: 'GET_FEEDBACK_FAILS', payload: err.response });
    });
  };
}

export function createFeedback(data) {
  return (dispatch) => {
    dispatch({ type: 'CREATE_FEEDBACK' });
    axios.post('api/v1/feedbacks', data).then((response) => {
      dispatch({ type: 'CREATE_FEEDBACK_SUCCESS', payload: response.data });
      const id = response.data.feedbackId;
      localStorage.setItem('feedbackId', id);
      dispatch(setCurrentFeedback(id));
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
    }).catch((err) => {
      dispatch({ type: 'MODIFY_FEEDBACK_FAIL', payload: err.response });
    });
  };
}

export function getWeekFeedbacks(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_FEEDBACKS' });
    axios.get(`api/v1/weekfeedbacks/${id}`).then((response) => {
      dispatch({ type: 'GET_FEEDBACKS_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'GET_FEEDBACKS_FAIL', payload: err.response });
    });
  };
}

export function getClassFeedbacks(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_CLASS_FEEDBACKS' });
    axios.get(`api/v1/classfeedbacks/${id}`).then((response) => {
      dispatch({ type: 'CLASS_FEEDBACKS_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'CLASS_FEEDBACKS_FAIL', payload: err.response });
    });
  };
}