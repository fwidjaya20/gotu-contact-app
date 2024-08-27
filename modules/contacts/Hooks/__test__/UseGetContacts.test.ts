import { UnknownFailure } from "@/shared/DataType";
import { renderHook, waitFor } from "@testing-library/react-native";
import { GetContactsResponse } from "../../Entities";
import {
  AppendContacts,
  ContactsFailureSelector,
  ContactsFavouriteSelector,
  ContactsListSelector,
  ContactsMapSelector,
  ContactsMetadataSelector,
  ContactsUiSelector,
  SetContacts,
  SetContactsFailure,
  SetContactsLoaded,
  SetContactsLoading,
} from "../../Redux";
import { useGetContacts } from "../useGetContacts";

const mockDispatch = jest.fn();
const mockSelector = jest.fn();
const mockGetContacts = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockSelector(selector),
}));

jest.mock("../../Module", () => ({
  useContactsModule: () => ({
    GetContacts: mockGetContacts,
  }),
}));

describe("useGetContacts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getContacts", () => {
    it("success", async () => {
      const mockResponse: GetContactsResponse = {
        contacts: [],
        hasNextPages: false,
        hasPreviousPages: false,
      };

      mockSelector.mockImplementation((selector: Function) => {
        switch (selector) {
          case ContactsMapSelector:
            return {};
          case ContactsFailureSelector:
            return undefined;
          case ContactsFavouriteSelector:
            return null;
          case ContactsListSelector:
            return [];
          case ContactsMetadataSelector:
            return { hasNextData: false, hasPreviousData: false };
          case ContactsUiSelector:
            return { isLoading: false, isLoaded: false, isError: false };
          default:
            return null;
        }
      });

      mockGetContacts.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useGetContacts());

      await waitFor(async () => {
        result.current.getContacts();
      });

      expect(mockDispatch).toHaveBeenCalledWith(SetContactsLoading(true));
      expect(mockDispatch).toHaveBeenCalledWith(SetContacts(mockResponse));
      expect(mockDispatch).toHaveBeenCalledWith(SetContactsLoaded(true));
    });

    it("error", async () => {
      const failure = new UnknownFailure({
        message: "this is error message",
        name: "error",
      });

      mockSelector.mockImplementation((selector: Function) => {
        switch (selector) {
          case ContactsMapSelector:
            return {};
          case ContactsFailureSelector:
            return failure;
          case ContactsFavouriteSelector:
            return undefined;
          case ContactsListSelector:
            return [];
          case ContactsMetadataSelector:
            return { hasNextData: false, hasPreviousData: false };
          case ContactsUiSelector:
            return { isLoading: false, isLoaded: false, isError: true };
          default:
            return null;
        }
      });

      mockGetContacts.mockRejectedValue(failure);

      const { result } = renderHook(() => useGetContacts());

      await waitFor(async () => {
        result.current.getContacts();
      });

      expect(mockDispatch).toHaveBeenCalledWith(SetContactsLoading(true));
      expect(mockDispatch).toHaveBeenCalledWith(SetContactsFailure(failure));
    });
  });

  describe("getMoreContacts", () => {
    it("success", async () => {
      const mockResponse: GetContactsResponse = {
        contacts: [],
        hasNextPages: false,
        hasPreviousPages: false,
      };

      mockSelector.mockImplementation((selector: Function) => {
        switch (selector) {
          case ContactsMapSelector:
            return {};
          case ContactsFailureSelector:
            return undefined;
          case ContactsFavouriteSelector:
            return null;
          case ContactsListSelector:
            return [];
          case ContactsMetadataSelector:
            return { hasNextData: true, hasPreviousData: false };
          case ContactsUiSelector:
            return { isLoading: false, isLoaded: false, isError: false };
          default:
            return null;
        }
      });

      mockGetContacts.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useGetContacts());

      await waitFor(async () => {
        result.current.getMoreContacts();
      });

      expect(mockDispatch).toHaveBeenCalledWith(AppendContacts(mockResponse));
    });

    it("error", async () => {
      const failure = new UnknownFailure({
        message: "this is error message",
        name: "error",
      });

      mockSelector.mockImplementation((selector: Function) => {
        switch (selector) {
          case ContactsMapSelector:
            return {};
          case ContactsFailureSelector:
            return failure;
          case ContactsFavouriteSelector:
            return undefined;
          case ContactsListSelector:
            return [];
          case ContactsMetadataSelector:
            return { hasNextData: true, hasPreviousData: false };
          case ContactsUiSelector:
            return { isLoading: false, isLoaded: false, isError: true };
          default:
            return null;
        }
      });

      mockGetContacts.mockRejectedValue(failure);

      const { result } = renderHook(() => useGetContacts());

      await waitFor(async () => {
        result.current.getMoreContacts();
      });

      expect(mockDispatch).toHaveBeenCalledWith(SetContactsFailure(failure));
    });
  });
});
