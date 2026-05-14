import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = axios.create({
  baseURL: "http://localhost:2000",
});
export const postProducts = createAsyncThunk(
  "postProducts",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await URL.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("postProducts====>Data: ", res.data);
      return res.data;
    } catch (err) {
      console.log("postProducts=======>error", err);
      return rejectWithValue(err.response?.data || err.massege);
    }
  },
);

export const getProducts = createAsyncThunk(
  "getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await URL.get("/products");
      console.log("getProducts====>Data: ", res.data);
      return res.data.products;
    } catch (err) {
      console.log("getProducts=======>error", err);
      return rejectWithValue(err.response?.data || err.massege);
    }
  },
);

export const deleteProducts = createAsyncThunk(
  "deleteProducts",
  async ({ id }, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await URL.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("deleteProducts====>Data: ", res.data);
      dispatch(getProducts());
      return { id };
    } catch (err) {
      console.log("deleteProducts=======>error", err);
      return rejectWithValue(err.response?.data || err.massege);
    }
  },
);
