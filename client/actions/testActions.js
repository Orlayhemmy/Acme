import axios from 'axios';
import jwt from 'jsonwebtoken';
import { createActivity } from './activityActions';


export function setCurrentTest(newTest) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_TEST', payload: { newTest } })
  };
}

export function getTest(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_TEST' });
    axios.get(`api/v1/test/${id}`).then((response) => {
      dispatch({ type: 'GET_TEST_SUCCESS', payload: response });
      const { token } = response.data;
      localStorage.setItem('test', token);
      dispatch(setCurrentTest(jwt.decode(token)));
    }).catch((err) => {
      dispatch({ type: 'GET_TEST_FAILS', payload: err.response });
    });
  };
}

export function getTermTests(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_TESTS' });
    axios.get(`api/v1/termtests/${id}`).then((response) => {
      dispatch({ type: 'GET_TESTS_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'GET_TESTS_FAIL', payload: err.response });
    });
  };
}

export function createTest(data, termId) {
  return (dispatch) => {
    dispatch({ type: 'CREATE_TEST' });
    axios.post('api/v1/tests', data).then((response) => {
      dispatch({ type: 'CREATE_TEST_SUCCESS', payload: response.data });
      const { token } = response.data;
      localStorage.setItem('test', token);
      dispatch(setCurrentTest(jwt.decode(token)));
      dispatch(getTermTests(termId));
      const act = {
        description: `You created a test :${data.title}`,
        title: data.title,
      }
      dispatch(createActivity(act));
    }).catch((err) => {
      dispatch({ type: 'CREATE_TEST_FAILS', payload: err.response });
    });
  };
}

export function modifyTest(id, data) {
  return (dispatch) => {
    dispatch({ type: 'MODIFY_TEST' });
    axios.put(`api/v1/test/${id}`, data).then((response) => {
      dispatch({ type: 'MODIFY_TEST_SUCCESS', payload: response });
      dispatch(getTermTests(data.termId));
    }).catch((err) => {
      dispatch({ type: 'MODIFY_TEST_FAIL', payload: err.response });
    });
  };
}

export function getClassTests(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_CLASS_TESTS' });
    axios.get(`api/v1/studenttests/${id}`).then((response) => {
      dispatch({ type: 'CLASS_TESTS_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'CLASS_TESTS_FAIL', payload: err.response });
    });
  };
}

export function deleteTest(id, termId) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_TEST' });
    axios.delete(`api/v1/test/${id}`).then((response) => {
      dispatch({ type: 'DELETE_TEST_SUCCESS', payload: response });
      dispatch(getTermTests(termId));
    }).catch((err) => {
      dispatch({ type: 'DELETE_TEST_FAIL', payload: err.response });
    });
  };
}
