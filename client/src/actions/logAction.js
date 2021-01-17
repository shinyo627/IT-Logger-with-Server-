import {
  GET_LOGS,
  ADD_LOG,
  UPDATE_LOG,
  DELETE_LOG,
  SEARCH_LOGS,
  SET_CURRENT,
  SET_LOADING,
  LOGS_ERROR,
  CLEAR_CURRENT,
} from './types';
import axios from 'axios';

// THIS IS EASIER VERSION TO UNDERSTAND
// export const getLOGS = () => {
//   // redux-thunk comes with dispatch and allows us to return a function directly
//   // getState as param is optional which allows us to get part of state
//   return async (dispatch) => {
//     setLoading();

//     const res = await axios.get('/logs');

//     dispatch({
//       type: Get_LOGS,
//       payload: res.data,
//     });
//   };
// };

// Get logs from server
export const getLogs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.get('api/logs');

    dispatch({
      type: GET_LOGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Add logs
export const addLog = (log) => async (dispatch) => {
  try {
    setLoading();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('api/logs', log, config);

    dispatch({
      type: ADD_LOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Update log
export const updateLog = (log) => async (dispatch) => {
  try {
    setLoading();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(`api/logs/${log.id}`, log, config);

    dispatch({
      type: UPDATE_LOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Delete log from server
export const deleteLog = (_id) => async (dispatch) => {
  try {
    setLoading();

    await axios.delete(`api/logs/${_id}`);
    dispatch({ type: DELETE_LOG, payload: _id });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Search logs from server
export const searchLogs = (searchKeyword) => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.get(`api/logs/search?q=${searchKeyword}`);

    dispatch({
      type: SEARCH_LOGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Set current
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

// Clear current
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};
