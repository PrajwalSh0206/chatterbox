// reducers/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer'; // Import your individual reducers
import snackBarReducer from './snackBarReducer';
import recieverReducer from './recieverReducer';

const rootReducer = combineReducers({
  user: userReducer,
  snackbar:snackBarReducer,
  receiever:recieverReducer
});

export default rootReducer;
