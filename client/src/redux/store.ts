import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice";
import propertyReducer from "../redux/property/propertySlice";
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
const persistedProperty = persistReducer(persistConfig, propertyReducer);

export const store = configureStore({
  reducer: {
    user: persistedUser,
    property: persistedProperty
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;