
const initialState = {
  loading: '',
  loaded: '',
  status: '',
  message: '',
};
export default (state = initialState, action = {}) => {
  switch (action.type) {

    case 'GET_SUBJECTS': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'GET_SUBJECTS_SUCCESS': {
      const { subjects } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        subjects,
      };
    }
    case 'GET_SUBJECTS_FAIL': {
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
