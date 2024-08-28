import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/Store";

const ContactsRoot = (state: RootState) => state.contacts;

export const ContactsMapSelector = createSelector(
  ContactsRoot,
  (data) => data.contacts
);

export const ContactsFailureSelector = createSelector(
  ContactsRoot,
  (data) => data.failure
);

export const ContactsFavouriteSelector = createSelector(
  ContactsRoot,
  (data) => data.favorite
);

export const ContactsListSelector = createSelector(ContactsRoot, (data) =>
  data.list.filter((it) => data.contacts[it].id !== data.favorite)
);

export const ContactsMetadataSelector = createSelector(
  ContactsRoot,
  (data) => data.metadata
);

export const ContactsUiSelector = createSelector(
  ContactsRoot,
  (data) => data.ui
);
