import { Failure } from "@/shared/DataType";
import { useCallback, useMemo, useState } from "react";
import { ContactEntity } from "../Entities";
import { useContactsModule } from "../Module";

export function useGetContactDetail() {
  const [contact, setContact] = useState<ContactEntity>();
  const [failure, setFailure] = useState<Failure>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const hasError = useMemo(() => failure !== undefined, [failure]);
  const isLoaded = useMemo(
    () => !isLoading && !hasError && contact !== undefined,
    [contact, isLoading, hasError]
  );

  const { GetContact } = useContactsModule();

  const getContact = useCallback(async (id: string) => {
    setIsLoading(true);

    GetContact(id)
      .then((result: ContactEntity) => {
        setContact(result);
      })
      .catch((e) => {
        setFailure(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    contact,
    failure,
    getContact,
    state: {
      isLoaded,
      isLoading,
      hasError,
    },
  };
}
