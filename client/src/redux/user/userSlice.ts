import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  role: "customer" | "property-owner" | "admin";
}

interface UserState {
  user: User | null;
  isVerified: boolean;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  isVerified: false,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isVerified = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isVerified = false;
    },
    loginHost(state, action: PayloadAction<{ user: User; token: string }>) {
      if (action.payload.user.role === "property-owner") {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isVerified = true;
      } else {
        console.warn("Attempted to loginHost with a non-property-owner role");
      }
    },
  },
});

export const { login, logout, loginHost } = userSlice.actions;
export default userSlice.reducer;
