import axios from 'axios';
import jwt from 'jsonwebtoken';
import { createActivity } from './activityActions';

export function setCurrentNote(newNote) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_NOTE', payload: { newNote } })
  };
}

export function getWeekNotes(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_LESSON_NOTES' });
    axios.get(`api/v1/weeknotes/${id}`).then((response) => {
      dispatch({ type: 'GET_NOTES_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'GET_NOTES_FAIL', payload: err.response });
    });
  };
}

export function getStudentWeekNotes(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_STUDENT_NOTES' });
    axios.get(`api/v1/studentweeknotes/${id}`).then((response) => {
      dispatch({ type: 'GET_STUDENT_NOTES_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'GET_STUDENT_NOTES_FAIL', payload: err.response });
    });
  };
}

export function getNote(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_LESSON_NOTE' });
    axios.get(`api/v1/note/${id}`).then((response) => {
      dispatch({ type: 'GET_NOTE_SUCCESS', payload: response });
      const { token } = response.data;
      localStorage.setItem('note', token);
      dispatch(setCurrentNote(jwt.decode(token)));
    }).catch((err) => {
      dispatch({ type: 'GET_NOTE_FAILS', payload: err.response });
    });
  };
}

export function getStudentNote(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_STUDENT_LESSON_NOTE' });
    axios.get(`api/v1/studentnote/${id}`).then((response) => {
      dispatch({ type: 'GET_STUDENT_NOTE_SUCCESS', payload: response });
      const { token } = response.data;
      localStorage.setItem('note', token);
      dispatch(setCurrentNote(jwt.decode(token)));
    }).catch((err) => {
      dispatch({ type: 'GET_STUDENT_NOTE_FAILS', payload: err.response });
    });
  };
}

export function createNote(data, weekId) {
  return (dispatch) => {
    dispatch({ type: 'CREATE_LESSON_NOTE' });
    axios.post('api/v1/notes', data).then((response) => {
      dispatch({ type: 'CREATE_NOTE_SUCCESS', payload: response });
      const { token } = response.data;
      localStorage.setItem('note', token);
      dispatch(setCurrentNote(jwt.decode(token)));
      dispatch(getWeekNotes(weekId));
      const act = {
        description: `You created a lesson note :${data.topic}`,
        title: data.topic,
      }
      dispatch(createActivity(act));
    }).catch((err) => {
      dispatch({ type: 'CREATE_NOTE_FAILS', payload: err.response });
    });
  };
}

export function modifyNote(id, data) {
  return (dispatch) => {
    dispatch({ type: 'MODIFY_LESSON_NOTE' });
    axios.put(`api/v1/note/${id}`, data).then((response) => {
      dispatch({ type: 'MODIFY_NOTE_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'MODIFY_NOTE_FAIL', payload: err.response });
    });
  };
}



export function deleteNote(id, weekId) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_NOTE' });
    axios.delete(`api/v1/note/${id}`).then((response) => {
      dispatch({ type: 'DELETE_NOTE_SUCCESS', payload: response });
      dispatch(getWeekNotes(weekId));
    }).catch((err) => {
      dispatch({ type: 'DELETE_NOTE_FAIL', payload: err.response });
    });
  };
}