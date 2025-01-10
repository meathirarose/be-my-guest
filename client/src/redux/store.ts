import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

export type RootState = ReturnType<typeof store.getState>;

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedUser = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
