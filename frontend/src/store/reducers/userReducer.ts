// reducers/counterReducer.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserDto } from '../../dto/user';

const initialState: UserDto = {
  username: ""
};

const userSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    storeUserDetails: (state,actions: PayloadAction<UserDto>) => {
      state.username = actions.payload.username;
    },
  },
});

export const { storeUserDetails } = userSlice.actions;
export default userSlice.reducer;
