// Entry point of Reducer
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// thunk is redux's middleware that we can make asynchronous actions...
import thunk from 'redux-thunk';
// Incoming reducers ex)logs, techs, posts, etc... reducers I bring to the root
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
