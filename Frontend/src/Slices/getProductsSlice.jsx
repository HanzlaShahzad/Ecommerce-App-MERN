import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../Thunks/productsThunks";

const getProductsSlice = createSlice({
  name: "items",
  initialState: {
    data: [],
    error: false,
    pending: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.error = false;
      state.pending = true;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.pending = false;
      state.error = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.pending = false;
      state.error = false;
      state.data = action.payload;
    });
  },
});
export default getProductsSlice.reducer;
