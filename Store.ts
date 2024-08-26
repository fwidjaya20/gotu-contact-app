import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ContactReducer } from "./modules/contacts";

export const RootReducer = combineReducers({
  contacts: new ContactReducer().build(),
});

export const RootStore = configureStore({
  reducer: RootReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
