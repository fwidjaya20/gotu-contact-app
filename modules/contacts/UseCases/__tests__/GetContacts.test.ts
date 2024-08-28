import { ForbiddenFailure } from "@/shared/DataType";
import { ExpoContactRepository } from "../../Repositories";
import { GetContactsUseCase } from "../GetContacts";
import ClientContact, {
  PermissionResponse,
  requestPermissionsAsync,
} from "expo-contacts";

const mockFnGetContacts = jest.fn();

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
        getContacts: mockFnGetContacts,
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

    const fn = GetContactsUseCase(repository);

    await expect(fn({})).rejects.toThrow(ForbiddenFailure);
    await expect(fn({})).rejects.toThrow(
      "the contacts permission was not granted"
    );
    expect(repository.getContacts).not.toHaveBeenCalled();
  });

  it("should throw a ForbiddenFailure when permission is not granted", async () => {
    mockRequestPermissionsAsync.mockResolvedValue({
      granted: true,
    } as unknown as PermissionResponse);

    repository.getContacts.mockResolvedValue({
      contacts: [],
      hasNextPages: false,
      hasPreviousPages: false,
    });

    const fn = GetContactsUseCase(repository);

    await expect(fn({})).resolves.toEqual({
      contacts: [],
      hasNextPages: false,
      hasPreviousPages: false,
    });
    expect(repository.getContacts).toHaveBeenCalledWith({});
  });
});
