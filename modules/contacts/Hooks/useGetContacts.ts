import { Failure } from "@/shared/DataType";
import { PaginationMetadata } from "@/shared/ValueObject";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GetContactsDTO } from "../DTOs";
import { ContactEntity, GetContactsResponse } from "../Entities";
import { useContactsModule } from "../Module";

export function useGetContacts() {
  const [contacts, setContacts] = useState<ContactEntity[]>([]);
  const [failure, setFailure] = useState<Failure>();
  const [metadata, setMetadata] = useState<PaginationMetadata>({
    hasNextData: false,
    hasPreviousData: false,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const hasError = useMemo(() => failure !== undefined, [failure]);

  const { GetContacts } = useContactsModule();

  const getContacts = useCallback(async (dto?: GetContactsDTO) => {
    setIsLoading(true);

    GetContacts({
      limit: dto?.limit,
      pages: dto?.pages,
    })
      .then((result: GetContactsResponse) => {
        setContacts(result.contacts);
        setMetadata({
          hasNextData: result.hasNextPages,
          hasPreviousData: result.hasPreviousPages,
        });
      })
      .catch((e) => {
        setFailure(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    contacts,
    failure,
    metadata,
    getContacts,
    state: {
      isLoading,
      hasError,
    },
  };
}
