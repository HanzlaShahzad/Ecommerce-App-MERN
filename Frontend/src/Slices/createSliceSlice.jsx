import { createSlice } from "@reduxjs/toolkit";
import { postProducts } from "../Thunks/productsThunks";

const postProductsSlice = createSlice({
  name: "postProducts",
  initialState: {
    data: [],
    error: false,
    pending: false,
  },
  extraReducers: (builder) => {
    builder.addCase(postProducts.pending, (state) => {
      state.error = false;
      state.pending = true;
    });
    builder.addCase(postProducts.rejected, (state) => {
      state.pending = false;
      state.error = true;
    });
    builder.addCase(postProducts.fulfilled, (state, action) => {
      state.pending = false;
      state.error = false;
      state.data = action.payload;
    });
  },
});
export default postProductsSlice.reducer;
