// reducers/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer'; // Import your individual reducers

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
