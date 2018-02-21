
const initialState = {
  loading: '',
  loaded: '',
  status: '',
  message: '',
};
export default (state = initialState, action = {}) => {
  switch (action.type) {

    case 'GET_TEACHER_CLASSES': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'TEACHER_CLASSES_SUCCESS': {
      const { classes } = action.payload.data;
      return {
        ...state,
        loading: true,
        loaded: false,
        classes,
      };
    }
    case 'TEACHER_CLASSES_FAIL': {
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
