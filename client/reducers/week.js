
const initialState = {
  loading: '',
  loaded: '',
  status: '',
  message: '',
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_CURRENT_WEEK': {
      return {
        ...state,
        currentWeek: action.payload,
      };
    }
    default: return state;
  }
};
