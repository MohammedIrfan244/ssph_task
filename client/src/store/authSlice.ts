import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
}

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") as string)
  : null;
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState: AuthState = {
  user: user,
  isAuthenticated: !!user && !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
