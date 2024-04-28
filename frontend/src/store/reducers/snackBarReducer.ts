// reducers/counterReducer.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SnackbarState {
  message: string;
  visible: boolean;
}

const initialState: SnackbarState = {
  message: "",
  visible: false,
};

const snackbarDetails = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    enableSnackbar: (state, actions: PayloadAction<SnackbarState>) => {
      state.message = actions.payload.message;
      state.visible = true;
    },
    disableSnackbar: (state) => {
      state.visible = false;
    },
  },
});

export const { enableSnackbar, disableSnackbar } = snackbarDetails.actions;
export default snackbarDetails.reducer;
