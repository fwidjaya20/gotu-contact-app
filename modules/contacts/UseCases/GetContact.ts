import { ForbiddenFailure } from "@/shared/DataType/Failure";
import { requestPermissionsAsync } from "expo-contacts";
import { ContactEntity } from "../Entities";
import { Repository } from "../Repositories";

export type GetContactUseCase = (id: string) => Promise<ContactEntity>;

export function GetContactUseCase(repository: Repository): GetContactUseCase {
  return async (id: string): Promise<ContactEntity> => {
    try {
      const { granted } = await requestPermissionsAsync();

      if (!granted) {
        throw new ForbiddenFailure(
          new Error("the contacts permission was not granted")
        );
      }

      return await repository.getContactById(id);
    } catch (e) {
      throw e;
    }
  };
}
