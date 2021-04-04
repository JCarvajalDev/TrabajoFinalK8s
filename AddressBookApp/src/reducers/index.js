import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './appReducer';
import contactReducer from './contactReducer';

export default combineReducers({
  appState:appReducer,
  contactState: contactReducer,
  routing
  // More reducers if there are
  // can go here
})
