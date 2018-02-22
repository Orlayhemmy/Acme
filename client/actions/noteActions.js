import axios from 'axios';

export function setCurrentNote(id) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_NOTE', payload: { id } })
  };
}

export function getNote(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_LESSON_NOTE' });
    axios.get(`api/v1/notes/${id}`).then((response) => {
      dispatch({ type: 'GET_NOTE_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'GET_NOTE_FAIL', payload: err.response });
    });
  };
}

export function createNote(data) {
  return (dispatch) => {
    dispatch({ type: 'CREATE_LESSON_NOTE' });
    axios.post('api/v1/notes', data).then((response) => {
      dispatch({ type: 'LESSON_NOTE_CREATED', payload: response.data });
      const id = response.data.noteId;
      setCurrentNote(id);
    }).catch((err) => {
      dispatch({ type: 'LESSON_NOTE_FAIL', payload: err.response });
    });
  };
}

export function modifyNote(data) {
  return (dispatch) => {
    dispatch({ type: 'MODIFY_LESSON_NOTE' });
    axios.put('api/v1/notes', data).then((response) => {
      dispatch({ type: 'MODIFY_NOTE_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'MODIFY_NOTE_FAIL', payload: err.response });
    });
  };
}