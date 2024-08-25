import { Pagination } from "@/shared/ValueObject";
import { ContactQuery, Fields } from "expo-contacts";

export interface GetContactsDTO extends Pagination {
  id: string;
}

export namespace GetContactsDTO {
  export function toContactQuery(dto: GetContactsDTO): ContactQuery {
    const { limit, offset } = Pagination.toJson(dto);

    return {
      id: dto.id,
      fields: [Fields.ID, Fields.Name, Fields.PhoneNumbers],
      pageOffset: offset,
      pageSize: limit,
    };
  }
}
