import { RawJson } from "@/shared/DataType";
import { PhoneNumber } from "./PhoneNumber";
import { Address } from "./Address";
import { Email } from "./Email";

export interface ContactEntity {
  addresses: Address[];
  company: string;
  emails: Email[];
  fullName: string;
  id: string;
  isFavorite: boolean;
  jobTitle: string;
  phoneNumbers: PhoneNumber[];
}

export namespace ContactEntity {
  export function fromJson(json: RawJson): ContactEntity {
    return {
      addresses: (json["addresses"] ?? []).map(Address.fromJson),
      company: json["company"],
      emails: (json["emails"] ?? []).map(Email.fromJson),
      fullName: json["name"],
      id: json["id"],
      isFavorite: false,
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
