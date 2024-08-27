import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ContactReducer } from "./modules/contacts";

export const RootReducer = combineReducers({
  contacts: new ContactReducer().build(),
});

export const RootStore = configureStore({
  reducer: RootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type RootState = ReturnType<typeof RootReducer>;
