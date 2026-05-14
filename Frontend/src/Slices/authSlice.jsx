import { createSlice } from "@reduxjs/toolkit";

const safeParse = (jsonString) => {
  if (!jsonString || jsonString === "undefined" || jsonString === "null") {
    return null;
  }
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    localStorage.removeItem("user"); // Clean corrupted data
    return null;
  }
};

const initialState = {
  user: safeParse(localStorage.getItem("user")),
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;

      // Ensure user object exists
      if (!user) {
        console.error("Login payload is missing user object");
        return;
      }

      state.user = user;
      state.token = token || null;

      // Save to localStorage safely
      localStorage.setItem("user", JSON.stringify(user));
      if (token) {
        localStorage.setItem("token", token);
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    // Optional: Update user info (e.g., after profile update)
    updateUser: (state, action) => {
      if (state.user && action.payload) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
