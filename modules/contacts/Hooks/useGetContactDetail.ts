import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContactEntity } from "../Entities";
import { useContactsModule } from "../Module";
import {
  ContactsFailureSelector,
  ContactsMapSelector,
  ContactsUiSelector,
  SetContact,
  SetContactsFailure,
  SetContactsLoaded,
  SetContactsLoading,
} from "../Redux";

export function useGetContactDetail() {
  const contacts = useSelector(ContactsMapSelector);
  const failure = useSelector(ContactsFailureSelector);
  const ui = useSelector(ContactsUiSelector);

  const contactId = useRef<string>();

  const { GetContact } = useContactsModule();

  const dispatch = useDispatch();

  const getContact = useCallback(async (id: string) => {
    contactId.current = id;

    dispatch(SetContactsLoading(true));

    GetContact(id)
      .then((result: ContactEntity) => {
        dispatch(SetContact(result));
        dispatch(SetContactsLoaded(true));
      })
      .catch((e) => {
        dispatch(SetContactsFailure(e));
      });
  }, []);

  return {
    contact: contactId.current ? contacts[contactId.current] : undefined,
    failure,
    getContact,
    ui,
  };
}
