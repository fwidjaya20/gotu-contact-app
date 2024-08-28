import { UnknownFailure } from "@/shared/DataType";
import { renderHook, waitFor } from "@testing-library/react-native";
import { ContactEntity } from "../../Entities";
import {
  ContactsFailureSelector,
  ContactsMapSelector,
  ContactsUiSelector,
  SetContact,
  SetContactsFailure,
  SetContactsLoaded,
  SetContactsLoading,
} from "../../Redux";
import { useGetContactDetail } from "../useGetContactDetail";

const mockDispatch = jest.fn();
const mockSelector = jest.fn();
const mockGetContact = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockSelector(selector),
}));

jest.mock("../../Module", () => ({
  useContactsModule: () => ({
    GetContact: mockGetContact,
  }),
}));

describe("useGetContactDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getContact", () => {
    it("success", async () => {
      const mockResponse: ContactEntity = {
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
        jobTitle: "Software Engineer",
        phoneNumbers: [
          {
            id: "1",
            label: "main",
            number: "1234567890",
          },
        ],
      };

      mockSelector.mockImplementation((selector: Function) => {
        switch (selector) {
          case ContactsMapSelector:
            return {};
          case ContactsFailureSelector:
            return undefined;
          case ContactsUiSelector:
            return { isLoading: false, isLoaded: false, isError: false };
          default:
            return null;
        }
      });

      mockGetContact.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useGetContactDetail());

      await waitFor(async () => {
        result.current.getContact("1");
      });

      expect(mockDispatch).toHaveBeenCalledWith(SetContactsLoading(true));
      expect(mockDispatch).toHaveBeenCalledWith(SetContact(mockResponse));
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
          case ContactsUiSelector:
            return { isLoading: false, isLoaded: false, isError: true };
          default:
            return null;
        }
      });

      mockGetContact.mockRejectedValue(failure);

      const { result } = renderHook(() => useGetContactDetail());

      await waitFor(async () => {
        result.current.getContact("1");
      });

      expect(mockDispatch).toHaveBeenCalledWith(SetContactsLoading(true));
      expect(mockDispatch).toHaveBeenCalledWith(SetContactsFailure(failure));
    });
  });
});
