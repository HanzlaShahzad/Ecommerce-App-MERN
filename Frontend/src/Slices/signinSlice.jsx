import { createSlice } from "@reduxjs/toolkit";
import { signinUser } from "../Thunks/signupAndSigninThunk";

const signinUserSlice = createSlice({
  name: "signinUser",
  initialState: {
    data: [],
    token: null,
    error: false,
    pending: false,
  },
  extraReducers: (builder) => {
    builder.addCase(signinUser.pending, (state) => {
      state.error = false;
      state.pending = true;
    });
    builder.addCase(signinUser.rejected, (state) => {
      state.pending = false;
      state.error = true;
    });
    builder.addCase(signinUser.fulfilled, (state, action) => {
      state.pending = false;
      state.error = false;
      state.data = action.payload;
      state.token = action.payload.token;
    });
  },
});
export default signinUserSlice.reducer;
