import { Reducer } from "@/shared/Redux";
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import { GetContactsResponse } from "../Entities";
import {
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
        favourite: {},
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
      .addCase(SetContacts, ContactReducer.setContacts)
      .addCase(SetContactsFailure, ContactReducer.setContactsFailure)
      .addCase(SetContactsLoaded, ContactReducer.setContactsLoaded)
      .addCase(SetContactsLoading, ContactReducer.setContactLoading);
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
