import { RawJson } from "@/shared/DataType";
import { PhoneNumber } from "./PhoneNumber";

export interface ContactEntity {
  company: string;
  fullName: string;
  id: string;
  jobTitle: string;
  phoneNumbers: PhoneNumber[];
}

export namespace ContactEntity {
  export function fromJson(json: RawJson): ContactEntity {
    return {
      company: json["company"],
      fullName: json["name"],
      id: json["id"],
      jobTitle: json["jobTitle"],
      phoneNumbers: (json["phoneNumbers"] ?? []).map(PhoneNumber.fromJson),
    };
  }
}

export interface GetContactsResponse {
  contacts: ContactEntity[];
  hasPreviousPages?: boolean;
  hasNextPages?: boolean;
}

export namespace GetContactsResponse {
  export function fromJson(json: RawJson): GetContactsResponse {
    return {
      contacts: (json["data"] ?? []).map(ContactEntity.fromJson),
      hasNextPages: json["hasNextPage"] ?? false,
      hasPreviousPages: json["hasPreviousPage"] ?? false,
    };
  }
}
