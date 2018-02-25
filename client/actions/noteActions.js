import axios from 'axios';

export function setCurrentNote(id) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_NOTE', payload: { id } })
  };
}

export function getNote(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_LESSON_NOTE' });
    axios.get(`api/v1/note/${id}`).then((response) => {
      dispatch({ type: 'GET_NOTE_SUCCESS', payload: response });
      localStorage.setItem('noteId', id);
      dispatch(setCurrentNote(id));
    }).catch((err) => {
      dispatch({ type: 'GET_NOTE_FAILS', payload: err.response });
    });
  };
}

export function createNote(data) {
  return (dispatch) => {
    dispatch({ type: 'CREATE_LESSON_NOTE' });
    axios.post('api/v1/notes', data).then((response) => {
      dispatch({ type: 'CREATE_NOTE_SUCCESS', payload: response });
      const id = response.data.noteId;
      localStorage.setItem('noteId', id);
      dispatch(setCurrentNote(id));
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