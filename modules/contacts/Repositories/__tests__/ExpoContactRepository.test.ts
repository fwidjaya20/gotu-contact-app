import ContactClient, {
  Contact,
  ContactResponse,
  getContactByIdAsync,
  getContactsAsync,
} from "expo-contacts";
import { Repository } from "../Repository";
import { ExpoContactRepository } from "../ExpoContactRepository";
import {
  BadRequestFailure,
  Failure,
  NotFoundFailure,
  UnknownFailure,
} from "@/shared/DataType";

jest.mock("expo-contacts", () => {
  const original = jest.requireActual("expo-contacts");

  return {
    ...original,
    getContactByIdAsync: jest.fn(),
    getContactsAsync: jest.fn(),
  };
});

const mockGetContactByIdAsync = getContactByIdAsync as jest.MockedFunction<
  typeof getContactByIdAsync
>;

const mockGetContactsAsync = getContactsAsync as jest.MockedFunction<
  typeof getContactsAsync
>;

describe("ExpoContactRepository", () => {
  let repository: Repository;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    repository = new ExpoContactRepository(ContactClient);
  });

  describe("getContactById", () => {
    it("throw NotFoundFailure when getting failed to find the contact", async () => {
      mockGetContactByIdAsync.mockResolvedValueOnce(undefined);

      try {
        await repository.getContactById("1");
      } catch (e) {
        expect(e).toBeInstanceOf(Failure);
        expect(e).toBeInstanceOf(NotFoundFailure);
      }
    });

    it("throw BadRequestFailure when getting empty id", async () => {
      mockGetContactByIdAsync.mockRejectedValueOnce(
        new Error(
          "Error: Contacts.getContactByIdAsync: Please pass an ID as a parameter"
        )
      );

      try {
        await repository.getContactById("");
      } catch (e) {
        expect(e).toBeInstanceOf(Failure);
        expect(e).toBeInstanceOf(BadRequestFailure);
      }
    });

    it("throw UnknownFailure when getting unknown error", async () => {
      mockGetContactByIdAsync.mockRejectedValueOnce(new Error("mock"));

      try {
        await repository.getContactById("1");
      } catch (e) {
        expect(e).toBeInstanceOf(Failure);
        expect(e).toBeInstanceOf(UnknownFailure);
      }
    });

    it("should return a valid contact", async () => {
      mockGetContactByIdAsync.mockResolvedValueOnce({
        addresses: [],
        contactType: "person",
        company: "",
        emails: [],
        name: "John Doe",
        id: "1",
        jobTitle: "",
        phoneNumbers: [],
      } as unknown as Contact);

      const result = await repository.getContactById("1");

      expect(result).toEqual({
        addresses: [],
        company: "",
        emails: [],
        fullName: "John Doe",
        id: "1",
        jobTitle: "",
        phoneNumbers: [],
      });
    });
  });

  describe("getContacts", () => {
    it("throw UnknownFailure when getting failed to retrieve contacts", async () => {
      mockGetContactsAsync.mockRejectedValueOnce(new Error("mock"));

      try {
        await repository.getContacts({});
      } catch (e) {
        expect(e).toBeInstanceOf(Failure);
        expect(e).toBeInstanceOf(UnknownFailure);
      }
    });

    it("should return contacts response correctly", async () => {
      mockGetContactsAsync.mockResolvedValueOnce({
        contacts: [],
        hasNextPage: false,
        hasPreviousPage: false,
      } as unknown as ContactResponse);

      const result = await repository.getContacts({});

      expect(result).toEqual({
        contacts: [],
        hasNextPages: false,
        hasPreviousPages: false,
      });
    });
  });
});
