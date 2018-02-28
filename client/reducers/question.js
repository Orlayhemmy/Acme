import isEmpty from 'lodash/isEmpty';

const initialState = {
  loading: '',
  loaded: '',
  status: '',
  message: '',
  isQuestion: false,
  question: {
    Class: {},
  },
  questions: [],
};
export default (state = initialState, action = {}) => {
  switch (action.type) {

    case 'CREATE_QUESTION': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'CREATE_QUESTION_SUCCESS': {
      const { status } = action.payload;
      const { message } = action.payload.data;
      return {
        ...state,
        loading: true,
        loaded: false,
        message,
        status,
      };
    }
    case 'CREATE_QUESTION_FAILS': {
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
    case 'SET_CURRENT_QUESTION': {
      const { newQuestion } = action.payload;
      const { content, opt_a, opt_b, opt_c, opt_d, answer, id } = newQuestion;
      const question = { content, opt_a, opt_b, opt_c, opt_d, answer, id  }
      return {
        ...state,
        isQuestion: !isEmpty(newQuestion),
        question,
      };
    }
    case 'GET_QUESTION': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'GET_QUESTION_FAIL': {
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
    case 'GET_QUESTION_SUCCESS': {
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
    case 'GET_CLASS_QUESTIONS': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'CLASS_QUESTIONS_FAIL': {
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
    case 'CLASS_QUESTIONS_SUCCESS': {
      const questions = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        questions,
      };
    }
    case 'MODIFY_QUESTION': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'MODIFY_QUESTION_SUCCESS': {
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
    case 'MODIFY_QUESTION_FAIL': {
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
    case 'GET_QUESTIONS': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'GET_QUESTIONS_FAIL': {
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
    case 'GET_QUESTIONS_SUCCESS': {
      const { questions } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        questions,
      };
    }
    case 'DELETE_QUESTION': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'DELETE_QUESTION_SUCCESS': {
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
    case 'DELETE_QUESTION_FAIL': {
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
