import { RawJson } from "@/shared/DataType";

export interface PhoneNumber {
  id: string;
  number: string;
}

export namespace PhoneNumber {
  export function fromJson(json: RawJson): PhoneNumber {
    return {
      id: json["id"],
      number: json["number"],
    };
  }
}
