
const initialState = {
  loading: '',
  loaded: '',
  status: '',
  message: '',
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
    case 'LESSON_NOTE_CREATED': {
      const { message, noteId } = action.payload;
      return {
        ...state,
        loading: true,
        loaded: false,
        message,
        noteId,
      };
    }
    case 'LESSON_NOTE_FAIL': {
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
    default: return state;
  }
};
