// reducers/counterReducer.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
  username: string;
}

const initialState: UserState = {
  username: ""
};

const userSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    storeUserDetails: (state,actions: PayloadAction<UserState>) => {
      state.username = actions.payload.username;
    },
  },
});

export const { storeUserDetails } = userSlice.actions;
export default userSlice.reducer;
