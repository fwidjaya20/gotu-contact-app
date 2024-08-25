import { RawJson } from "@/shared/DataType";
import { PhoneNumber } from "./PhoneNumber";

export interface ContactEntity {
  fullName: string;
  id: string;
  phoneNumbers: PhoneNumber[];
}

export namespace ContactEntity {
  export function fromJson(json: RawJson): ContactEntity {
    return {
      fullName: json["name"],
      id: json["id"],
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
      hasPreviousPages: json["hasPreviousPages"] ?? false,
      hasNextPages: json["hasNextPages"] ?? false,
    };
  }
}
