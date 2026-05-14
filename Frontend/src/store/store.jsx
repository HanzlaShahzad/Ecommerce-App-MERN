import { configureStore } from "@reduxjs/toolkit";
import postProducts from "../Slices/createSliceSlice.jsx";
import itemsReducer from "../Slices/getProductsSlice.jsx";
import deleteProduct from "../Slices/deleteProduct.jsx";
import signupUser from "../Slices/signupSlice.jsx";
import signinUser from "../Slices/signinSlice.jsx";
import users from "../Slices/getUsersSlice.jsx";
import auth from "../Slices/authSlice.jsx";
export const store = configureStore({
  reducer: {
    postProducts: postProducts,
    items: itemsReducer,
    deleteProduct: deleteProduct,
    signupUser: signupUser,
    signinUser: signinUser,
    users: users,
    auth: auth,
  },
});
