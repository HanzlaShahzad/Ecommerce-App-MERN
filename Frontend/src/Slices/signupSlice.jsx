import { createSlice } from "@reduxjs/toolkit";
import { signupUser } from "../Thunks/signupAndSigninThunk";

const signupUserSlice = createSlice({
  name: "signupUser",
  initialState: {
    data: [],
    error: false,
    pending: false,
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state) => {
      state.error = false;
      state.pending = true;
    });
    builder.addCase(signupUser.rejected, (state) => {
      state.pending = false;
      state.error = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.pending = false;
      state.error = false;
      state.data = action.payload;
      localStorage.setItem("token", action.payload.token);
    });
  },
});
export default signupUserSlice.reducer;
