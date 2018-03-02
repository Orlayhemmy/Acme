import axios from 'axios';
import jwt from 'jsonwebtoken';
import { createActivity, createStudentActivity } from './activityActions';


export function setCurrentAssignment(newAssignment) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_ASSIGNMENT', payload: { newAssignment } })
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

export function getStudentWeekAssignments(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_STUDENT_ASSIGNMENTS' });
    axios.get(`api/v1/studentweekassignments/${id}`).then((response) => {
      dispatch({ type: 'GET_STUDENT_ASSIGNMENTS_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'GET_STUDENT_ASSIGNMENTS_FAIL', payload: err.response });
    });
  };
}

export function getAssignment(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_ASSIGNMENT' });
    axios.get(`api/v1/assignment/${id}`).then((response) => {
      dispatch({ type: 'GET_ASSIGNMENT_SUCCESS', payload: response });
      const { token } = response.data;
      localStorage.setItem('assignment', token);
      dispatch(setCurrentAssignment(jwt.decode(token)));
    }).catch((err) => {
      dispatch({ type: 'GET_ASSIGNMENT_FAILS', payload: err.response });
    });
  };
}

export function getStudentAssignment(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_STUDENT_ASSIGNMENT' });
    axios.get(`api/v1/studentassignment/${id}`).then((response) => {
      dispatch({ type: 'GET_STUDENT_ASSIGNMENT_SUCCESS', payload: response });
      const { token } = response.data;
      localStorage.setItem('assignment', token);
      dispatch(setCurrentAssignment(jwt.decode(token)));
    }).catch((err) => {
      dispatch({ type: 'GET_STUDENT_ASSIGNMENT_FAILS', payload: err.response });
    });
  };
}

export function createAssignment(data, weekId) {
  return (dispatch) => {
    dispatch({ type: 'CREATE_ASSIGNMENT' });
    axios.post('api/v1/assignments', data).then((response) => {
      dispatch({ type: 'CREATE_ASSIGNMENT_SUCCESS', payload: response });
      const { token } = response.data;
      localStorage.setItem('assignment', token);
      dispatch(setCurrentAssignment(jwt.decode(token)));
      dispatch(getWeekAssignments(weekId));
      const act = {
        description: `You created an assignment :${data.topic}`,
        title: data.topic,
      }
      dispatch(createActivity(act));
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
      dispatch(getWeekAssignments(data.weekId));
      if (data.upload) {
        const act = {
          description: `You uploaded an assignment: ${data.topic}`,
          title: data.topic,
        }
        dispatch(createActivity(act));
        const act2 = {
          description: `${data.lastname} sent an assignment`,
          title: data.topic,
          classId: data.classId,
        }
        dispatch(createStudentActivity(act2));
      }
    }).catch((err) => {
      dispatch({ type: 'MODIFY_ASSIGNMENT_FAIL', payload: err.response });
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

export function deleteAssignment(id, weekId) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_ASSIGNMENT' });
    axios.delete(`api/v1/assignment/${id}`).then((response) => {
      dispatch({ type: 'DELETE_ASSIGNMENT_SUCCESS', payload: response });
      dispatch(getWeekAssignments(weekId));
    }).catch((err) => {
      dispatch({ type: 'DELETE_ASSIGNMENT_FAIL', payload: err.response });
    });
  };
}