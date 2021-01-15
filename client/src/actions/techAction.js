import axios from 'axios';
import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR,
} from './types';

// Get techs from server
export const getTechs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.get('/techs');

    dispatch({
      type: GET_TECHS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Add a tech
export const addTech = (tech) => async (dispatch) => {
  try {
    setLoading();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/techs', tech, config);

    dispatch({
      type: ADD_TECH,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Delete a tech
export const deleteTech = (id) => async (dispatch) => {
  try {
    setLoading();

    await axios.delete(`/techs/${id}`);

    dispatch({
      type: DELETE_TECH,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
