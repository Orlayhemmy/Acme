import isEmpty from 'lodash/isEmpty';

const initialState = {
  loading: '',
  loaded: '',
  status: '',
  message: '',
  isClass: false,
};
export default (state = initialState, action = {}) => {
  switch (action.type) {

    case 'SET_CURRENT_CLASSES': {
      const { teacherClasses } = action.payload;
      const { classId, classname } = teacherClasses;
      const teachClasses = { classId, classname }
      return {
        ...state,
        isClass: !isEmpty(teachClasses),
        status: '',
        message: '',
      };
    }

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
      const { status } = action.payload;
      const { message, teacherclasses } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
        message,
        teacherclasses,
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
    case 'CREATE_TEACHER_CLASSES': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'CREATE_TEACHER_CLASSES_SUCCESS': {
      const { classes } = action.payload.data;
      return {
        ...state,
        loading: true,
        loaded: false,
        classes,
      };
    }
    case 'CREATE_TEACHER_CLASSES_FAIL': {
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
    case 'GET_CLASSES': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'GET_CLASSES_SUCCESS': {
      const { classes } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        classes,
      };
    }
    case 'GET_CLASSES_FAIL': {
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
