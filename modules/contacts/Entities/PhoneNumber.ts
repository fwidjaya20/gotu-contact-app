import { RawJson } from "@/shared/DataType";

export interface PhoneNumber {
  id: string;
  label: string;
  number: string;
}

export namespace PhoneNumber {
  export function fromJson(json: RawJson): PhoneNumber {
    return {
      id: json["id"],
      label: json["label"],
      number: json["number"],
    };
  }
}
