import { requestPermissionsAsync } from "expo-contacts";
import { GetContactsDTO } from "../DTOs";
import { GetContactsResponse } from "../Entities";
import { Repository } from "../Repositories";
import { ForbiddenFailure } from "@/shared/DataType/Failure";

export type GetContactsUseCase = (
  dto: GetContactsDTO
) => Promise<GetContactsResponse>;

export function GetContactsUseCase(repository: Repository): GetContactsUseCase {
  return async (dto: GetContactsDTO): Promise<GetContactsResponse> => {
    try {
      const { granted } = await requestPermissionsAsync();

      if (!granted) {
        throw new ForbiddenFailure(
          new Error("the contacts permission was not granted")
        );
      }

      return await repository.getContacts(dto);
    } catch (e) {
      throw e;
    }
  };
}
