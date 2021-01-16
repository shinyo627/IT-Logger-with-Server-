import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../actions/types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
  console.log('This is loadUser from authAction');
  // Setting token into global header once user's logged in
  // after setAuthToken I don't need each users to send token to access every private pages
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');

    console.log('loadUser from authAction', res.data);
    dispatch({
      type: USER_LOADED,
      // Response is user data
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//  Register User
export const register = (formData) => async (dispatch) => {
  // when sending data to request, I include Content-Type headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log('Authaction, register', formData);

  try {
    const res = await axios.post('/api/users', formData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      // Response here is JWS Token
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      // Response here is json object with value of msg from backend
      payload: err.response.data.msg,
    });
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  console.log('login from AuthAction');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/auth', formData, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
