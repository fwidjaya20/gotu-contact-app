import { ForbiddenFailure } from "@/shared/DataType";
import { ExpoContactRepository } from "../../Repositories";
import ClientContact, {
  PermissionResponse,
  requestPermissionsAsync,
} from "expo-contacts";
import { GetContactUseCase } from "../GetContact";

jest.mock("expo-contacts", () => {
  return {
    requestPermissionsAsync: jest.fn(),
  };
});

jest.mock("../../Repositories", () => {
  const original =
    jest.requireActual<typeof import("../../Repositories")>(
      "../../Repositories"
    );

  return {
    ...original,
    ExpoContactRepository: jest.fn().mockImplementation(() => {
      return {
        getContactById: jest.fn(),
      };
    }),
  };
});

const mockRequestPermissionsAsync =
  requestPermissionsAsync as jest.MockedFunction<
    typeof requestPermissionsAsync
  >;

describe("GetContactsUseCase", () => {
  let repository: jest.Mocked<ExpoContactRepository>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    repository = new ExpoContactRepository(ClientContact) as any;
  });

  it("should throw a ForbiddenFailure when permission is not granted", async () => {
    mockRequestPermissionsAsync.mockResolvedValue({
      granted: false,
    } as unknown as PermissionResponse);

    const fn = GetContactUseCase(repository);

    await expect(fn("1")).rejects.toThrow(ForbiddenFailure);
    await expect(fn("1")).rejects.toThrow(
      "the contacts permission was not granted"
    );
    expect(repository.getContactById).not.toHaveBeenCalled();
  });

  it("should throw a ForbiddenFailure when permission is not granted", async () => {
    mockRequestPermissionsAsync.mockResolvedValue({
      granted: true,
    } as unknown as PermissionResponse);

    repository.getContactById.mockResolvedValue({
      addresses: [],
      company: "",
      emails: [],
      fullName: "John Doe",
      id: "1",
      isFavorite: false,
      jobTitle: "",
      phoneNumbers: [],
    });

    const fn = GetContactUseCase(repository);

    await expect(fn("1")).resolves.toEqual({
      addresses: [],
      company: "",
      emails: [],
      fullName: "John Doe",
      id: "1",
      isFavorite: false,
      jobTitle: "",
      phoneNumbers: [],
    });
    expect(repository.getContactById).toHaveBeenCalledWith("1");
  });
});
