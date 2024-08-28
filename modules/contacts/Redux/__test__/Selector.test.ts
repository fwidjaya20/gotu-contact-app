import { RootState } from "@/Store";
import {
  ContactsFailureSelector,
  ContactsFavouriteSelector,
  ContactsListSelector,
  ContactsMapSelector,
  ContactsMetadataSelector,
  ContactsUiSelector,
} from "../Selectors";

const dataState: RootState = {
  contacts: {
    contacts: {
      "1": {
        addresses: [],
        company: "",
        emails: [],
        fullName: "John Doe",
        id: "1",
        jobTitle: "",
        phoneNumbers: [],
      },
      "2": {
        addresses: [],
        company: "",
        emails: [],
        fullName: "Jane Doe",
        id: "2",
        jobTitle: "",
        phoneNumbers: [],
      },
    },
    failure: undefined,
    favorite: undefined,
    list: ["1", "2"],
    metadata: {
      hasNextData: false,
      hasPreviousData: false,
    },
    ui: {
      isError: false,
      isLoaded: true,
      isLoading: false,
    },
  },
};

describe("Contacts Selectors", () => {
  it("should select contacts map", () => {
    const result = ContactsMapSelector(dataState);
    expect(result).toEqual(dataState.contacts.contacts);
  });

  it("should select contacts failure", () => {
    const result = ContactsFailureSelector(dataState);
    expect(result).toEqual(dataState.contacts.failure);
  });

  it("should select contacts favorite", () => {
    const result = ContactsFavouriteSelector(dataState);
    expect(result).toEqual(dataState.contacts.favorite);
  });

  it("should select contacts list without favorites", () => {
    const result = ContactsListSelector(dataState);
    const expectedList = dataState.contacts.list.filter(
      (id) => dataState.contacts.contacts[id].id !== dataState.contacts.favorite
    );
    expect(result).toEqual(expectedList);
  });

  it("should select contacts metadata", () => {
    const result = ContactsMetadataSelector(dataState);
    expect(result).toEqual(dataState.contacts.metadata);
  });

  it("should select contacts UI state", () => {
    const result = ContactsUiSelector(dataState);
    expect(result).toEqual(dataState.contacts.ui);
  });
});
