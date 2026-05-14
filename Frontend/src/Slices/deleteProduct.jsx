import { createSlice } from "@reduxjs/toolkit";
import { deleteProducts } from "../Thunks/productsThunks";

const deletetProductsSlice = createSlice({
  name: "deleteProduct",
  initialState: {
    data: [],
    error: false,
    pending: false,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteProducts.pending, (state) => {
      state.error = false;
      state.pending = true;
    });
    builder.addCase(deleteProducts.rejected, (state) => {
      state.pending = false;
      state.error = true;
    });
    builder.addCase(deleteProducts.fulfilled, (state, action) => {
      state.pending = false;
      state.error = false;
      state.data = state.data.filter((val) => val.id !== action.payload.id);
    });
  },
});
export default deletetProductsSlice.reducer;
