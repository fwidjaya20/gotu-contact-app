import { Failure, UnknownFailure } from "@/shared/DataType";
import { Reducer } from "@reduxjs/toolkit";
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
import { ContactReducer } from "../Reducer";
import { ContactState } from "../State";

const dataState: ContactState = {
  contacts: {
    "1": {
      addresses: [],
      company: "",
      emails: [],
      fullName: "John Doe",
      id: "1",
      isFavorite: false,
      jobTitle: "",
      phoneNumbers: [],
    },
    "2": {
      addresses: [],
      company: "",
      emails: [],
      fullName: "Jane Doe",
      id: "2",
      isFavorite: false,
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
};

const dataContactKateBell: ContactEntity = {
  addresses: [
    {
      city: "Hilssborough",
      country: "USA",
      id: "1",
      label: "work",
      postalCode: "94010",
      region: "CA",
      street: "165 Davis Street",
    },
  ],
  company: "Creative Consulting",
  emails: [
    {
      email: "kate-bell@creativeconsulting.com",
      id: "1",
      label: "work",
    },
  ],
  fullName: "Kate Bell",
  id: "3",
  isFavorite: false,
  jobTitle: "Producer",
  phoneNumbers: [
    {
      id: "1",
      label: "mobile",
      number: "(555) 564-8583",
    },
    {
      id: "2",
      label: "main",
      number: "(415) 555-3695",
    },
  ],
};

describe("Contacts Reducer", () => {
  let reducer: Reducer<ContactState>;

  beforeEach(() => {
    reducer = new ContactReducer().build();
  });

  describe("AddFavorite", () => {
    let newState: ContactState;

    beforeEach(() => {
      newState = { ...dataState };
    });

    it("should mark a contact as favorite", () => {
      newState = reducer(newState, AddFavorite("1"));

      expect(newState.contacts["1"].isFavorite).toBeTruthy();
      expect(newState.contacts["2"].isFavorite).toBeFalsy();
      expect(newState.favorite).toEqual("1");
    });

    it("should mark only one contact as favorite", () => {
      newState = reducer(newState, AddFavorite("1"));
      newState = reducer(newState, AddFavorite("2"));

      expect(newState.contacts["1"].isFavorite).toBeFalsy();
      expect(newState.contacts["2"].isFavorite).toBeTruthy();
      expect(newState.favorite).toEqual("2");
    });
  });

  describe("AppendContacts", () => {
    let newState: ContactState;

    beforeEach(() => {
      newState = { ...dataState };
    });

    it("should append contacts list", () => {
      newState = reducer(
        newState,
        AppendContacts({
          contacts: [dataContactKateBell],
        })
      );

      expect(newState.contacts["3"]).not.toBeUndefined();
      expect(newState.contacts["3"]).not.toBeNull();
      expect(newState.contacts["3"]).toEqual(dataContactKateBell);
      expect(newState.list).toHaveLength(3);
    });
  });

  describe("RemoveFavorite", () => {
    let newState: ContactState;

    beforeEach(() => {
      newState = { ...dataState };
    });

    it("should remove favorite mark", () => {
      newState = reducer(newState, AddFavorite("1"));
      newState = reducer(newState, RemoveFavorite("1"));

      expect(newState.contacts["1"].isFavorite).toBeFalsy();
      expect(newState.contacts["1"].isFavorite).toBeFalsy();
      expect(newState.favorite).toBeUndefined();
    });
  });

  describe("SetContact", () => {
    let newState: ContactState;

    beforeEach(() => {
      newState = { ...dataState };
    });

    it("should set correctly", () => {
      const dataJohnDoe: ContactEntity = {
        ...dataState.contacts["1"],
        company: "Financial Service Inc.",
        jobTitle: "Portofolio Manager",
      };

      newState = reducer(newState, SetContact(dataJohnDoe));
    });
  });

  describe("SetContacts", () => {
    let newState: ContactState;

    beforeEach(() => {
      newState = { ...dataState };
    });

    it("should set correctly", () => {
      const dataContacts: GetContactsResponse = {
        contacts: [dataContactKateBell],
        hasNextPages: false,
        hasPreviousPages: false,
      };

      newState = reducer(newState, SetContacts(dataContacts));

      expect(newState.contacts[dataContactKateBell.id]).toEqual(
        dataContactKateBell
      );
      expect(newState.failure).toBeUndefined();
      expect(newState.list).toEqual([dataContactKateBell.id]);
      expect(newState.metadata).toEqual({
        hasNextData: false,
        hasPreviousData: false,
      });
    });
  });

  describe("SetContactsFailure", () => {
    let newState: ContactState;

    beforeEach(() => {
      newState = { ...dataState };
    });

    it("should set correctly", () => {
      const failure: Failure = new UnknownFailure({
        message: "this is error message",
        name: "error",
      });

      newState = reducer(newState, SetContactsFailure(failure));

      expect(newState.failure).toEqual(failure);
      expect(newState.ui.isError).toBeTruthy();
    });
  });

  describe("SetContactsLoaded", () => {
    let newState: ContactState;

    beforeEach(() => {
      newState = { ...dataState };
    });

    it("should set correctly", () => {
      newState = reducer(newState, SetContactsLoaded(true));

      expect(newState.ui.isLoaded).toBeTruthy();
    });
  });

  describe("SetContactsLoading", () => {
    let newState: ContactState;

    beforeEach(() => {
      newState = { ...dataState };
    });

    it("should set correctly", () => {
      newState = reducer(newState, SetContactsLoading(true));

      expect(newState.ui.isLoading).toBeTruthy();
    });
  });
});
