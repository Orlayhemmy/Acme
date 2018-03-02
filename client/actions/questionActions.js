import axios from 'axios';
import jwt from 'jsonwebtoken';

export function setCurrentQuestion(newQuestion) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_QUESTION', payload: { newQuestion } });
  };
}

export function getQuestion(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_QUESTION' });
    axios.get(`api/v1/question/${id}`).then((response) => {
      dispatch({ type: 'GET_QUESTION_SUCCESS', payload: response });
      const { token } = response.data;
      localStorage.setItem('question', token);
      dispatch(setCurrentQuestion(jwt.decode(token)));
    }).catch((err) => {
      dispatch({ type: 'GET_QUESTION_FAILS', payload: err.response });
    });
  };
}

export function createQuestion(data) {
  return (dispatch) => {
    dispatch({ type: 'CREATE_QUESTION' });
    axios.post('api/v1/questions', data).then((response) => {
      dispatch({ type: 'CREATE_QUESTION_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'CREATE_QUESTION_FAILS', payload: err.response });
    });
  };
}

export function modifyQuestion(id, data) {
  return (dispatch) => {
    dispatch({ type: 'MODIFY_QUESTION' });
    axios.put(`api/v1/question/${id}`, data).then((response) => {
      dispatch({ type: 'MODIFY_QUESTION_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'MODIFY_QUESTION_FAIL', payload: err.response });
    });
  };
}

export function deleteQuestion(id, data) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_QUESTION' });
    axios.delete(`api/v1/question/${id}`, data).then((response) => {
      dispatch({ type: 'DELETE_QUESTION_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'DELETE_QUESTION_FAIL', payload: err.response });
    });
  };
}

export function getTestQuestions(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_QUESTIONS' });
    axios.get(`api/v1/testquestions/${id}`).then((response) => {
      dispatch({ type: 'GET_QUESTIONS_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'GET_QUESTIONS_FAIL', payload: err.response });
    });
  };
}

// export function getClassQuestions(id) {
//   return (dispatch) => {
//     dispatch({ type: 'GET_CLASS_QUESTIONS' });
//     axios.get(`api/v1/classquestions/${id}`).then((response) => {
//       dispatch({ type: 'CLASS_QUESTIONS_SUCCESS', payload: response });
//     }).catch((err) => {
//       dispatch({ type: 'CLASS_QUESTIONS_FAIL', payload: err.response });
//     });
//   };
// }