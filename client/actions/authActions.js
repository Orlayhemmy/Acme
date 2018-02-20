import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthorizationToken';

export function setCurrentUser(newUser, token) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_USER', payload: { newUser, token } })
  };
}

export function staffSignInRequest(user) {
  return (dispatch) => {
    dispatch({ type: 'USER_LOGIN' });
    axios.post('api/v1/staffs/login', user).then((response) => {
      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response });
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token), token));
    }).catch((err) => {
      dispatch({ type: 'USER_LOGIN_FAIL', payload: err.response });
    });
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
}