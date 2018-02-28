import isEmpty from 'lodash/isEmpty';

const initialState = {
  loading: '',
  loaded: '',
  status: '',
  message: '',
  isAssess: false,
  assignment: {
    Class: {},
  },
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
    case 'CREATE_ASSIGNMENT_SUCCESS': {
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
    case 'CREATE_ASSIGNMENT_FAILS': {
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
      const { newAssignment } = action.payload;
      const { content, topic, classname, termId, weekId, id } = newAssignment;
      const assignment = { 
        content, topic, classname, termId, weekId, id,
      }
      return {
        ...state,
        isAssess: !isEmpty(newAssignment),
        assignment,
        status: '',
        message: '',
      };
    }
    case 'GET_ASSIGNMENT': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
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
      const { message } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
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
      const { status } = action.payload;
      const { message } = action.payload.data;
      return { 
        ...state,
        loading: true,
        loaded: false,
        status,
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
        status: '',
        message: '',
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
      const { status } = action.payload;
      const { message, assignments } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
        message,
        assignments,
      };
    }
    case 'DELETE_ASSIGNMENT': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'DELETE_ASSIGNMENT_SUCCESS': {
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
    case 'DELETE_ASSIGNMENT_FAIL': {
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
