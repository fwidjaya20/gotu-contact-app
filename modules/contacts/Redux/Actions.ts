import { createAction } from "@reduxjs/toolkit";
import { ContactEntity, GetContactsResponse } from "../Entities";
import { Failure } from "@/shared/DataType";

export const SetContact = createAction<ContactEntity>("CONTACTS/SET/SINGLE");
export const SetContacts = createAction<GetContactsResponse>("CONTACTS/SET");
export const SetContactsFailure = createAction<Failure>("CONTACTS/FAILURE");
export const SetContactsLoaded = createAction<boolean>("CONTACTS/LOADED");
export const SetContactsLoading = createAction<boolean>("CONTACTS/LOADING");

export const AddFavorite = createAction<string>("CONTACTS/FAVORITE/ADD");
export const RemoveFavorite = createAction<string>("CONTACTS/FAVORITE/REMOVE");
