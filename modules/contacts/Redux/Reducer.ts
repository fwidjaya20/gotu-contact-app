import { Reducer } from "@/shared/Redux";
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import { ContactEntity, GetContactsResponse } from "../Entities";
import {
  AddFavorite,
  RemoveFavorite,
  SetContacts,
  SetContactsFailure,
  SetContactsLoaded,
  SetContactsLoading,
} from "./Actions";
import { ContactState } from "./State";
import { Failure } from "@/shared/DataType";

export class ContactReducer extends Reducer<ContactState> {
  constructor() {
    super(
      {
        contacts: {},
        failure: undefined,
        favorite: [],
        list: [],
        metadata: {
          hasNextData: false,
          hasPreviousData: false,
        },
        ui: {
          isError: false,
          isLoaded: false,
          isLoading: true,
        },
      },
      "CONTACTS-SLICE"
    );
  }

  protected actions(
    builder: ActionReducerMapBuilder<ContactState>
  ): ActionReducerMapBuilder<ContactState> {
    return builder
      .addCase(AddFavorite, ContactReducer.addFavorite)
      .addCase(RemoveFavorite, ContactReducer.removeFavorite)
      .addCase(SetContacts, ContactReducer.setContacts)
      .addCase(SetContactsFailure, ContactReducer.setContactsFailure)
      .addCase(SetContactsLoaded, ContactReducer.setContactsLoaded)
      .addCase(SetContactsLoading, ContactReducer.setContactLoading);
  }

  static addFavorite(
    this: void,
    state: WritableDraft<ContactState>,
    { payload }: PayloadAction<string>
  ) {
    state.favorite.push(payload);
    state.contacts[payload].isFavorite = true;

    state.favorite.sort((a, b) => {
      const l = state.contacts[a].fullName.toLowerCase();
      const r = state.contacts[b].fullName.toLowerCase();

      return l.localeCompare(r);
    });
  }

  static removeFavorite(
    this: void,
    state: WritableDraft<ContactState>,
    { payload }: PayloadAction<string>
  ) {
    state.favorite = state.favorite.filter((id) => id !== payload);
    state.contacts[payload].isFavorite = false;
  }

  static setContact(
    this: void,
    state: WritableDraft<ContactState>,
    { payload }: PayloadAction<ContactEntity>
  ) {
    state.contacts[payload.id] = payload;
  }

  static setContacts(
    this: void,
    state: WritableDraft<ContactState>,
    { payload }: PayloadAction<GetContactsResponse>
  ) {
    state.contacts = {};
    state.failure = undefined;
    state.list = [];

    payload.contacts.forEach((it) => {
      if (state.contacts[it.id] === undefined) {
        state.contacts[it.id] = it;
      }

      state.list.push(it.id);
    });

    state.metadata = {
      hasNextData: payload.hasNextPages,
      hasPreviousData: payload.hasPreviousPages,
    };
  }

  static setContactsFailure(
    this: void,
    state: WritableDraft<ContactState>,
    { payload }: PayloadAction<Failure>
  ) {
    state.failure = payload;
    state.ui.isError = true;
  }

  static setContactsLoaded(
    this: void,
    state: WritableDraft<ContactState>,
    { payload }: PayloadAction<boolean>
  ) {
    state.ui.isError = false;
    state.ui.isLoaded = payload;
    state.ui.isLoading = false;
  }

  static setContactLoading(
    this: void,
    state: WritableDraft<ContactState>,
    { payload }: PayloadAction<boolean>
  ) {
    state.ui.isError = false;
    state.ui.isLoaded = false;
    state.ui.isLoading = payload;
  }
}
