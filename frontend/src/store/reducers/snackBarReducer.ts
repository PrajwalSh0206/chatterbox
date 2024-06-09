// reducers/counterReducer.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SnackbarDto } from "../../dto/snackbar";

const initialState: SnackbarDto = {
  message: "",
  visible: false,
};

const snackbarDetails = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    enableSnackbar: (state, actions: PayloadAction<SnackbarDto>) => {
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
