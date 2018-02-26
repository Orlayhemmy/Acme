import axios from 'axios';

export function setCurrentTest(id) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_TEST', payload: { id } })
  };
}

export function getTest(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_TEST' });
    axios.get(`api/v1/test/${id}`).then((response) => {
      dispatch({ type: 'GET_TEST_SUCCESS', payload: response });
      localStorage.setItem('testId', id);
      dispatch(setCurrentTest(id));
    }).catch((err) => {
      dispatch({ type: 'GET_TEST_FAILS', payload: err.response });
    });
  };
}

export function createTest(data) {
  return (dispatch) => {
    dispatch({ type: 'CREATE_TEST' });
    axios.post('api/v1/tests', data).then((response) => {
      dispatch({ type: 'CREATE_TEST_SUCCESS', payload: response.data });
      const id = response.data.testId;
      localStorage.setItem('testId', id);
      dispatch(setCurrentTest(id));
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
    }).catch((err) => {
      dispatch({ type: 'MODIFY_TEST_FAIL', payload: err.response });
    });
  };
}

export function getWeekTests(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_TESTS' });
    axios.get(`api/v1/weektests/${id}`).then((response) => {
      dispatch({ type: 'GET_TESTS_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'GET_TESTS_FAIL', payload: err.response });
    });
  };
}

export function getClassTests(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_CLASS_TESTS' });
    axios.get(`api/v1/classtests/${id}`).then((response) => {
      dispatch({ type: 'CLASS_TESTS_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'CLASS_TESTS_FAIL', payload: err.response });
    });
  };
}