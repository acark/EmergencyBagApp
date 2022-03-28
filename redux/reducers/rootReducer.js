import {combineReducers} from 'redux';
import {itemReducer, notesReducer, personal_info_reducer} from './reducer';

export default combineReducers({
  items: itemReducer,
  notes: notesReducer,
  personalInfo: personal_info_reducer,
});
