import axios from 'axios';
import jwt from 'jsonwebtoken';
import { createStudentActivity, createActivity } from './activityActions';

export function setCurrentFeedback(newFeedback) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_FEEDBACK', payload: { newFeedback } });
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

export function getWeekFeedback(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_WEEK_FEEDBACK' });
    axios.get(`api/v1/weekfeedbacks/${id}`).then((response) => {
      dispatch({ type: 'GET_WEEK_FEEDBACK_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'GET_WEEK_FEEDBACK_FAILS', payload: err.response });
    });
  };
}

export function getStudentFeedback(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_STUDENT_FEEDBACK' });
    axios.get(`api/v1/viewfeedback/${id}`).then((response) => {
      dispatch({ type: 'GET_STUDENT_FEEDBACK_SUCCESS', payload: response });
      const { token } = response.data;
      localStorage.setItem('feedback', token);
      dispatch(setCurrentFeedback(jwt.decode(token)));
    }).catch((err) => {
      dispatch({ type: 'GET_STUDENT_FEEDBACK_FAILS', payload: err.response });
    });
  };
}

export function createFeedback(data) {
  return (dispatch) => {
    dispatch({ type: 'CREATE_FEEDBACK' });
    axios.post('api/v1/feedbacks', data).then((response) => {
      dispatch({ type: 'CREATE_FEEDBACK_SUCCESS', payload: response });
      const { token } = response.data;
      localStorage.setItem('feedback', token);
      dispatch(setCurrentFeedback(jwt.decode(token)));
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
      if (data.upload) {
        const act = {
          description: `You uploaded a response to ${data.assignmentTopic}`,
          title: data.assignmentTopic,
        };
        dispatch(createStudentActivity(act));
        const act2 = {
          description: `Gave a response to ${data.assignmentTopic}`,
          title: data.fullname,
          subjectId: data.subjectId,
        };
        dispatch(createActivity(act2));
      }
      if (data.score) {
        const act = {
          description: `${data.fullname} gave a remark to your response`,
          title: data.assignmentTopic,
        };
        dispatch(createStudentActivity(act));
      }
    }).catch((err) => {
      dispatch({ type: 'MODIFY_FEEDBACK_FAIL', payload: err.response });
    });
  };
}

export function sendTestFeedback(id, data) {
  return (dispatch) => {
    dispatch({ type: 'SEND_FEEDBACK' });
    axios.post('api/v1/testfeedbacks', data).then((response) => {
      dispatch({ type: 'SEND_FEEDBACK_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'SEND_FEEDBACK_FAILS', payload: err.response });
    });
  };
}

