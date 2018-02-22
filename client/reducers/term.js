
const initialState = {
  loading: '',
  loaded: '',
  status: '',
  message: '',
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_CURRENT_TERM': {
      return {
        ...state,
        currentTerm: action.payload,
      };
    }
    default: return state;
  }
};
