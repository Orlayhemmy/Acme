import axios from 'axios';

export function setCurrentAssignment(id) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_ASSIGNMENT', payload: { id } })
  };
}

export function getAssignment(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_ASSIGNMENT' });
    axios.get(`api/v1/assignment/${id}`).then((response) => {
      dispatch({ type: 'GET_ASSIGNMENT_SUCCESS', payload: response });
      localStorage.setItem('assignmentId', id);
      dispatch(setCurrentAssignment(id));
    }).catch((err) => {
      dispatch({ type: 'GET_ASSIGNMENT_FAILS', payload: err.response });
    });
  };
}

export function createAssignment(data) {
  return (dispatch) => {
    dispatch({ type: 'CREATE_ASSIGNMENT' });
    axios.post('api/v1/assignments', data).then((response) => {
      dispatch({ type: 'CREATE_ASSIGNMENT_SUCCESS', payload: response.data });
      const id = response.data.assignmentId;
      localStorage.setItem('assignmentId', id);
      dispatch(setCurrentAssignment(id));
    }).catch((err) => {
      dispatch({ type: 'CREATE_ASSIGNMENT_FAILS', payload: err.response });
    });
  };
}

export function modifyAssignment(id, data) {
  return (dispatch) => {
    dispatch({ type: 'MODIFY_ASSIGNMENT' });
    axios.put(`api/v1/assignment/${id}`, data).then((response) => {
      dispatch({ type: 'MODIFY_ASSIGNMENT_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'MODIFY_ASSIGNMENT_FAIL', payload: err.response });
    });
  };
}

export function getWeekAssignments(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_ASSIGNMENTS' });
    axios.get(`api/v1/weekassignments/${id}`).then((response) => {
      dispatch({ type: 'GET_ASSIGNMENTS_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'GET_ASSIGNMENTS_FAIL', payload: err.response });
    });
  };
}

export function getClassAssignments(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_CLASS_ASSIGNMENTS' });
    axios.get(`api/v1/classassignments/${id}`).then((response) => {
      dispatch({ type: 'CLASS_ASSIGNMENTS_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'CLASS_ASSIGNMENTS_FAIL', payload: err.response });
    });
  };
}