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

    case 'CREATE_ASSIGNMENT': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'ASSIGNMENT_CREATED': {
      const { message, assignmentId } = action.payload;
      return {
        ...state,
        loading: true,
        loaded: false,
        message,
        assignmentId,
      };
    }
    case 'ASSIGNMENT_FAIL': {
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
    case 'SET_CURRENT_ASSIGNMENT': {
      const id = action.payload;
      return {
        ...state,
        isAssess: !isEmpty(id),
        id,
      };
    }
    case 'GET_ASSIGNMENT': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'GET_ASSIGNMENT_FAIL': {
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
    case 'GET_ASSIGNMENT_SUCCESS': {
      const assignment = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        assignment,
      };
    }
    case 'GET_CLASS_ASSIGNMENTS': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'CLASS_ASSIGNMENTS_FAIL': {
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
    case 'CLASS_ASSIGNMENTS_SUCCESS': {
      const assignments = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        assignments,
      };
    }
    case 'MODIFY_ASSIGNMENT': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'MODIFY_ASSIGNMENT_SUCCESS': {
      const { message } = action.payload;
      return { 
        ...state,
        loading: true,
        loaded: false,
        message,
      };
    }
    case 'MODIFY_ASSIGNMENT_FAIL': {
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
    case 'GET_ASSIGNMENTS': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'GET_ASSIGNMENTS_FAIL': {
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
    case 'GET_ASSIGNMENTS_SUCCESS': {
      const { assignments } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        assignments,
      };
    }
    default: return state;
  }
};
