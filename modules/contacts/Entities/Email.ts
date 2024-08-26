import { RawJson } from "@/shared/DataType";

export interface Email {
  id: string;
  label: string;
  email: string;
}

export namespace Email {
  export function fromJson(json: RawJson): Email {
    return {
      id: json["id"],
      label: json["label"],
      email: json["email"],
    };
  }
}
