import { Failure, UnknownFailure } from "@/shared/DataType";
import { ContactEntity, GetContactsResponse } from "../../Entities";
import {
  AddFavorite,
  AppendContacts,
  RemoveFavorite,
  SetContact,
  SetContacts,
  SetContactsFailure,
  SetContactsLoaded,
  SetContactsLoading,
} from "../Actions";

const dataContact: ContactEntity = {
  addresses: [],
  company: "Example Corp",
  emails: [
    {
      email: "john.doe@example.com",
      id: "1",
      label: "work",
    },
  ],
  fullName: "John Doe",
  id: "1",
  isFavorite: false,
  jobTitle: "Software Engineer",
  phoneNumbers: [
    {
      id: "1",
      label: "main",
      number: "1234567890",
    },
  ],
};

describe("Contacts Action", () => {
  it("should create an action to append contacts", () => {
    const payload: GetContactsResponse = {
      contacts: [],
      hasNextPages: false,
      hasPreviousPages: false,
    };
    const expectedAction = {
      type: "CONTACTS/APPEND",
      payload: payload,
    };
    expect(AppendContacts(payload)).toEqual(expectedAction);
  });

  it("should create an action to set a single contact", () => {
    const payload: ContactEntity = { ...dataContact };
    const expectedAction = {
      type: "CONTACTS/SET/SINGLE",
      payload: payload,
    };
    expect(SetContact(payload)).toEqual(expectedAction);
  });

  it("should create an action to set contacts", () => {
    const payload: GetContactsResponse = {
      contacts: [],
      hasNextPages: false,
      hasPreviousPages: false,
    };
    const expectedAction = {
      type: "CONTACTS/SET",
      payload: payload,
    };
    expect(SetContacts(payload)).toEqual(expectedAction);
  });

  it("should create an action to set contacts failure", () => {
    const failure: Failure = new UnknownFailure({
      message: "this is error message",
      name: "error",
    });
    const expectedAction = {
      type: "CONTACTS/FAILURE",
      payload: failure,
    };
    expect(SetContactsFailure(failure)).toEqual(expectedAction);
  });

  it("should create an action to set contacts loaded", () => {
    const isLoaded = true;
    const expectedAction = {
      type: "CONTACTS/LOADED",
      payload: isLoaded,
    };
    expect(SetContactsLoaded(isLoaded)).toEqual(expectedAction);
  });

  it("should create an action to set contacts loading", () => {
    const isLoading = true;
    const expectedAction = {
      type: "CONTACTS/LOADING",
      payload: isLoading,
    };
    expect(SetContactsLoading(isLoading)).toEqual(expectedAction);
  });

  it("should create an action to add a favorite", () => {
    const contactId = "1";
    const expectedAction = {
      type: "CONTACTS/FAVORITE/ADD",
      payload: contactId,
    };
    expect(AddFavorite(contactId)).toEqual(expectedAction);
  });

  it("should create an action to remove a favorite", () => {
    const contactId = "1";
    const expectedAction = {
      type: "CONTACTS/FAVORITE/REMOVE",
      payload: contactId,
    };
    expect(RemoveFavorite(contactId)).toEqual(expectedAction);
  });
});
