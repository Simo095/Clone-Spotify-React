import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import favoriteReducer from "../reducers/favoriteReducer";
import { encryptTransform } from "redux-persist-transform-encrypt";
import songReducer from "../reducers/songReducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["song"],
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_PERSIST_KEY
    })
  ]
};
const mainReducers = combineReducers({
  //Qui scriverai i reducer di cui hai bisogno
  favorite: favoriteReducer,
  song: songReducer
});
const persistedReducer = persistReducer(persistConfig, mainReducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);
