import isEmpty from 'lodash/isEmpty';

const initialState = {
  loading: '',
  loaded: '',
  status: '',
  message: '',
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_CURRENT_WEEK': {
      const id = action.payload;
      return {
        ...state,
        isWeek: !isEmpty(id),
        id,
        status: '',
        message: '',
      };
    }
    case 'GET_WEEK': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'GET_WEEK_FAILS': {
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
    case 'GET_WEEK_SUCCESS': {
      const id = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        id,
      };
    }
    case 'INSERT_WEEK': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'INSERT_WEEK_FAILS': {
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
    case 'INSERT_WEEK_SUCCESS': {
      const { message } = action.payload.data;
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status,
      };
    }
    default: return state;
  }
};
