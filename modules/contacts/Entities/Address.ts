import { RawJson } from "@/shared/DataType";

export interface Address {
  city: string;
  country: string;
  id: string;
  label: string;
  postalCode: string;
  region: string;
  street: string;
}

export namespace Address {
  export function fromJson(json: RawJson): Address {
    return {
      city: json["city"],
      country: json["country"],
      id: json["id"],
      label: json["label"],
      postalCode: json["postalCode"],
      region: json["region"],
      street: json["street"],
    };
  }

  export function toStdAddress({
    city,
    country,
    postalCode,
    region,
    street,
  }: Address): string {
    return `${street} ${city}, ${region} ${postalCode} ${country}`;
  }
}
