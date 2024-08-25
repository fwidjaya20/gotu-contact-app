import { Pagination } from "@/shared/ValueObject";
import { ContactQuery } from "expo-contacts";

export interface GetContactsDTO extends Pagination {}

export namespace GetContactsDTO {
  export function toContactQuery(dto: GetContactsDTO): ContactQuery {
    const { limit, offset } = Pagination.toJson(dto);

    return {
      pageOffset: offset,
      pageSize: limit,
    };
  }
}
