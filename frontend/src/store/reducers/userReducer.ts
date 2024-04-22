// reducers/counterReducer.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
  id:string,
  username: string;
}

const initialState: UserState = {
  id:"",
  username: ""
};

const userSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    editUserDetails: (state,actions: PayloadAction<UserState>) => {
      state.username = actions.payload.username;
      state.id = actions.payload.id;
    },
  },
});

export const { editUserDetails } = userSlice.actions;
export default userSlice.reducer;
