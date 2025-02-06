import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "property-owner" | "admin";
  country?: string;
  profileImage?: string;
  isBlocked: boolean;
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
      } else if (action.payload.user.role === "admin") {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isVerified = true;
      }
    },
    updateUser(state, action: PayloadAction<{name: string, country: string, profileImage: string}>) {
      if(state.user){
        state.user.name = action.payload.name;
        state.user.country = action.payload.country;
        state.user.profileImage = action.payload.profileImage;
      }
    },
    userStatus(state, action: PayloadAction<{isBlocked: boolean}>) {
      if(state.user){
        state.user.isBlocked = action.payload.isBlocked;
      }
    }
  },
});

export const { login, logout, loginHost, updateUser, userStatus } = userSlice.actions;
export default userSlice.reducer;
