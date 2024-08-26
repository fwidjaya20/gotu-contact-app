import { Failure } from "@/shared/DataType";
import { ContactEntity } from "../Entities";
import { PaginationMetadata } from "@/shared/ValueObject";

export interface ContactState {
  contacts: Record<string, ContactEntity>;
  failure: Failure | undefined;
  favorite: string[];
  list: string[];
  metadata: PaginationMetadata;
  ui: {
    isError: boolean;
    isLoaded: boolean;
    isLoading: boolean;
  };
}
