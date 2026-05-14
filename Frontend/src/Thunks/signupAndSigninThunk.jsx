import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = axios.create({
  baseURL: "http://localhost:2000",
});
export const signupUser = createAsyncThunk(
  "signupUser",
  async ({ fullName, email, password }, { rejectWithValue }) => {
    try {
      const res = await URL.post("/signup", { fullName, email, password });
      console.log("signupUser====>Data: ", res.data);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data;
    } catch (err) {
      console.log("signupUser=======>error", err);
      return rejectWithValue(err.response?.data || err.massege);
    }
  },
);

export const getUsers = createAsyncThunk(
  "getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await URL.get("/getUsers");
      console.log("getUsers====>Data: ", res.data);
      return res.data.user;
    } catch (err) {
      console.log("getUsers=======>error", err);
      return rejectWithValue(err.response?.data || err.massege);
    }
  },
);

export const signinUser = createAsyncThunk(
  "signinUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await URL.post(
        "/signin",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("signinUser====>Data: ", res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data;
    } catch (err) {
      console.log("signinUser=======>error", err);
      return rejectWithValue(err.response?.data || err.massege);
    }
  },
);
