import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../Thunks/signupAndSigninThunk";

const getUsersSlice = createSlice({
  name: "users",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: false,
    pending: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.error = false;
      state.pending = true;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.pending = false;
      state.error = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.pending = false;
      state.error = false;
      state.user = action.payload;
    });
  },
});
export default getUsersSlice.reducer;
