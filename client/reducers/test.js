import isEmpty from 'lodash/isEmpty';

const initialState = {
  loading: '',
  loaded: '',
  status: '',
  message: '',
  isTest: false,
  test: {
    Class: {},
  },
};
export default (state = initialState, action = {}) => {
  switch (action.type) {

    case 'CREATE_TEST': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'CREATE_TEST_SUCCESS': {
      const { message, testId } = action.payload;
      return {
        ...state,
        loading: true,
        loaded: false,
        message,
        testId,
      };
    }
    case 'CREATE_TEST_FAILS': {
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
    case 'SET_CURRENT_TEST': {
      const { newTest } = action.payload;
      const { duration, title, termId, classname, intro, id } = newTest;
      const test = { duration, title, termId, classname, intro, id }
      return {
        ...state,
        isTest: !isEmpty(newTest),
        test,
      };
    }
    case 'GET_TEST': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'GET_TEST_FAIL': {
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
    case 'GET_TEST_SUCCESS': {
      const { test } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        test,
      };
    }
    case 'GET_CLASS_TESTS': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'CLASS_TESTS_FAIL': {
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
    case 'CLASS_TESTS_SUCCESS': {
      const tests = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        tests,
      };
    }
    case 'MODIFY_TEST': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'MODIFY_TEST_SUCCESS': {
      const { status } = action.payload;
      const { message } = action.payload.data;
      return { 
        ...state,
        loading: false,
        loaded: true,
        message,
        status,
      };
    }
    case 'MODIFY_TEST_FAIL': {
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
    case 'GET_TESTS': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'GET_TESTS_FAIL': {
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
    case 'GET_TESTS_SUCCESS': {
      const { tests } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        tests,
      };
    }
    case 'DELETE_TEST': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'DELETE_TEST_SUCCESS': {
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
    case 'DELETE_TEST_FAIL': {
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
