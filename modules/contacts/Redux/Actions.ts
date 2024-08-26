import { createAction } from "@reduxjs/toolkit";
import { GetContactsResponse } from "../Entities";
import { Failure } from "@/shared/DataType";

export const SetContacts = createAction<GetContactsResponse>("CONTACTS/SET");
export const SetContactsFailure = createAction<Failure>("CONTACTS/FAILURE");
export const SetContactsLoaded = createAction<boolean>("CONTACTS/LOADED");
export const SetContactsLoading = createAction<boolean>("CONTACTS/LOADING");
