import isEmpty from 'lodash/isEmpty';

const initialState = {
  loading: '',
  loaded: '',
  status: '',
  message: '',
  isAssess: false,
};
export default (state = initialState, action = {}) => {
  switch (action.type) {

    case 'CREATE_FEEDBACK': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'CREATE_FEEDBACK_SUCCESS': {
      const { message, feedbackId } = action.payload;
      return {
        ...state,
        loading: true,
        loaded: false,
        message,
        feedbackId,
      };
    }
    case 'CREATE_FEEDBACK_FAILS': {
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
    case 'SET_CURRENT_FEEDBACK': {
      const id = action.payload;
      return {
        ...state,
        isAssess: !isEmpty(id),
        id,
      };
    }
    case 'GET_FEEDBACK': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'GET_FEEDBACK_FAIL': {
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
    case 'GET_FEEDBACK_SUCCESS': {
      const feedback = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        feedback,
      };
    }
    case 'GET_CLASS_FEEDBACKS': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'CLASS_FEEDBACKS_FAIL': {
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
    case 'CLASS_FEEDBACKS_SUCCESS': {
      const feedbacks = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        feedbacks,
      };
    }
    case 'MODIFY_FEEDBACK': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'MODIFY_FEEDBACK_SUCCESS': {
      const { message } = action.payload;
      return { 
        ...state,
        loading: true,
        loaded: false,
        message,
      };
    }
    case 'MODIFY_FEEDBACK_FAIL': {
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
    case 'GET_FEEDBACKS': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'GET_FEEDBACKS_FAIL': {
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
    case 'GET_FEEDBACKS_SUCCESS': {
      const { feedbacks } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        feedbacks,
      };
    }
    default: return state;
  }
};
