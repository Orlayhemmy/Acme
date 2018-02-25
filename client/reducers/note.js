import isEmpty from 'lodash/isEmpty';

const initialState = {
  loading: '',
  loaded: '',
  status: '',
  message: '',
  isNote: false,
  note: {
    Class: {},
    Subject: {},
  },
};
export default (state = initialState, action = {}) => {
  switch (action.type) {

    case 'CREATE_LESSON_NOTE': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'CREATE_NOTE_SUCCESS': {
      const { message, noteId } = action.payload.data;
      const { status } = action.payload;
      return {
        ...state,
        loading: true,
        loaded: false,
        message,
        noteId,
        status,
      };
    }
    case 'CREATE_NOTE_FAILS': {
      const { status } = action.payload;
      const { message } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
        message,
      };
    }
    case 'SET_CURRENT_NOTE': {
      const id = action.payload;
      return {
        ...state,
        isNote: !isEmpty(id),
        id,
      };
    }
    case 'GET_LESSON_NOTE': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'GET_NOTE_FAIL': {
      const { status } = action.payload;
      const { message } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
        message,
      };
    }
    case 'GET_NOTE_SUCCESS': {
      const { note } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        note,
      };
    }
    case 'MODIFY_LESSON_NOTE': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'MODIFY_NOTE_SUCCESS': {
      const { message } = action.payload;
      return { 
        ...state,
        loading: true,
        loaded: false,
        message,
      };
    }
    case 'MODIFY_NOTE_FAIL': {
      const { status } = action.payload;
      const { message } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
        message,
      };
    }
    case 'GET_LESSON_NOTES': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'GET_NOTES_FAIL': {
      const { status } = action.payload;
      const { message } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
        message,
      };
    }
    case 'GET_NOTES_SUCCESS': {
      const { notes } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        notes,
      };
    }
    default: return state;
  }
};
