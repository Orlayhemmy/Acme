import isEmpty from 'lodash/isEmpty';


const initialState = {
  isAuth: false,
  isStudent: false,
  user: {},
  loading: '',
  loaded: '',
  status: '',
  message: '',
  error: '',
  userToken:'',
};
export default (state = initialState, action = {}) => {
  switch (action.type) {

    case 'SET_CURRENT_USER': {
      const { newUser } = action.payload;
      const { lastname, fullname, id, classId, deptId, deptname, subjectId, subject, isStudent } = newUser;
      const user = {
        lastname, fullname, id, classId, deptId, deptname, subjectId, subject,
      }
      return {
        isAuth: !isEmpty(newUser),
        user,
        isStudent: newUser.isStudent,
      };
    }
    case 'USER_LOGIN': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
      };
    }
    case 'USER_LOGIN_SUCCESS': {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
    case 'USER_LOGIN_FAIL': {
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
    case 'USER_SIGNUP': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'USER_SIGNUP_SUCCESS': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case 'USER_SIGNUP_FAIL': {
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
    case 'VERIFY_EMAIL': {
      return {
        ...state,
        loading: true,
        status: '',
        message: '',
      };
    }
    case 'VERIFY_EMAIL_SUCCESS': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case 'VERIFY_EMAIL_FAIL': {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
      };
    }
    case 'GENERATE_CODE': {
      return {
        ...state,
        status: '',
        codeMessage: '',
        code: action.payload,
      };
    }
    case 'WRONG_CODE': {
      return {
        ...state,
        status: '',
        codeMessage: action.payload,
        codeStatus: '',
      };
    }
    case 'UPDATE_STAFFS': {
      return {
        ...state,
        status: '',
        message: '',
        code: '',
        loading: true,
        loaded: false,
      };
    }
    case 'UPDATE_STAFFS_SUCCESS': {
      const { message } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
      };
    }
    case 'UPDATE_STAFFS_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
      };
    }
    case 'SEND_MAIL': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'SEND_MAIL_SUCCESS': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case 'SEND_MAIL_FAIL': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case 'GET_USER_EMAIL': {
      const { email } = action.payload.data;
      return {
        ...state,
        loaded: true,
        loading: false,
        email,
      };
    }
    case 'GET_STAFFS': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'GET_STAFFS_SUCCESS': {
      const { staffs } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        staffs,
      };
    }
    case 'GET_STAFFS_FAIL': {
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
