// reducers/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer'; // Import your individual reducers
import snackBarReducer from './snackBarReducer';

const rootReducer = combineReducers({
  user: userReducer,
  snackbar:snackBarReducer
});

export default rootReducer;
