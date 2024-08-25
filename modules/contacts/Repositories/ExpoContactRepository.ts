import {
  BadRequestFailure,
  Failure,
  NotFoundFailure,
  UnknownFailure,
} from "@/shared/DataType/Failure";
import * as ContactClient from "expo-contacts";
import { GetContactsDTO } from "../DTOs";
import { ContactEntity, GetContactsResponse } from "../Entities";
import { Repository } from "./Repository";

export class ExpoContactRepository implements Repository {
  constructor(private readonly client: typeof ContactClient) {}

  public async getContacts(dto: GetContactsDTO): Promise<GetContactsResponse> {
    try {
      this.client.getContactByIdAsync;

      const dataContacts = await this.client.getContactsAsync({
        ...GetContactsDTO.toContactQuery(dto),
        fields: [
          ContactClient.Fields.ID,
          ContactClient.Fields.Name,
          ContactClient.Fields.PhoneNumbers,
        ],
        sort: "firstName",
      });

      return GetContactsResponse.fromJson(dataContacts);
    } catch (e) {
      throw new UnknownFailure(e as Error);
    }
  }

  public async getContactById(id: string): Promise<ContactEntity> {
    try {
      const dataContact = await this.client.getContactByIdAsync(id, [
        ContactClient.Fields.ID,
        ContactClient.Fields.Name,
        ContactClient.Fields.PhoneNumbers,
      ]);

      if (dataContact === undefined) {
        throw new NotFoundFailure(new Error("the contact was not found"));
      }

      return ContactEntity.fromJson(dataContact);
    } catch (e: unknown) {
      if (e instanceof Failure) {
        throw e;
      }

      if (
        e instanceof Error &&
        e.message ===
          "Error: Contacts.getContactByIdAsync: Please pass an ID as a parameter"
      ) {
        throw new BadRequestFailure(e);
      }

      throw new UnknownFailure(e as Error);
    }
  }
}
