import { renderHook, waitFor } from "@testing-library/react-native";
import { AddFavorite, ContactsMapSelector, RemoveFavorite } from "../../Redux";
import { useContactFavorite } from "../useContactFavorite";

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockSelector(selector),
}));

describe("useContactFavorite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("toggle", () => {
    it("should mark as favorite", async () => {
      mockSelector.mockImplementation((selector: Function) => {
        switch (selector) {
          case ContactsMapSelector:
            return {
              1: {
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
              },
            };
          default:
            return null;
        }
      });

      const { result } = renderHook(() => useContactFavorite());

      await waitFor(async () => {
        result.current.toggle("1");
      });

      expect(mockDispatch).toHaveBeenCalledWith(AddFavorite("1"));
    });

    it("should unmark from favorite", async () => {
      mockSelector.mockImplementation((selector: Function) => {
        switch (selector) {
          case ContactsMapSelector:
            return {
              1: {
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
                isFavorite: true,
                jobTitle: "Software Engineer",
                phoneNumbers: [
                  {
                    id: "1",
                    label: "main",
                    number: "1234567890",
                  },
                ],
              },
            };
          default:
            return null;
        }
      });

      const { result } = renderHook(() => useContactFavorite());

      await waitFor(async () => {
        result.current.toggle("1");
      });

      expect(mockDispatch).toHaveBeenCalledWith(RemoveFavorite("1"));
    });
  });
});
