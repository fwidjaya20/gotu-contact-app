import { GetContactsDTO } from "../DTOs";
import { ContactEntity, GetContactsResponse } from "../Entities";

export interface Repository {
  getContacts(dto: GetContactsDTO): Promise<GetContactsResponse>;
  getContactById(id: string): Promise<ContactEntity>;
}
