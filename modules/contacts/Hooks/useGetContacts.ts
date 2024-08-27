import { useCallback, useRef } from "react";
import { GetContactsDTO } from "../DTOs";
import { GetContactsResponse } from "../Entities";
import { useContactsModule } from "../Module";
import { useDispatch, useSelector } from "react-redux";
import {
  AppendContacts,
  ContactsFailureSelector,
  ContactsFavouriteSelector,
  ContactsListSelector,
  ContactsMapSelector,
  ContactsMetadataSelector,
  ContactsUiSelector,
  SetContacts,
  SetContactsFailure,
  SetContactsLoaded,
  SetContactsLoading,
} from "../Redux";

export function useGetContacts() {
  const contacts = useSelector(ContactsMapSelector);
  const failure = useSelector(ContactsFailureSelector);
  const favorite = useSelector(ContactsFavouriteSelector);
  const list = useSelector(ContactsListSelector);
  const metadata = useSelector(ContactsMetadataSelector);
  const ui = useSelector(ContactsUiSelector);

  const pages = useRef<number>(1);

  const { GetContacts } = useContactsModule();
  const dispatch = useDispatch();

  const getContacts = useCallback((dto?: GetContactsDTO) => {
    dispatch(SetContactsLoading(true));

    GetContacts({
      limit: dto?.limit,
      pages: dto?.pages,
    })
      .then((result: GetContactsResponse) => {
        dispatch(SetContacts(result));
        dispatch(SetContactsLoaded(true));
      })
      .catch((e) => {
        dispatch(SetContactsFailure(e));
      });
  }, []);

  const getMoreContacts = useCallback(() => {
    if (!metadata.hasNextData) {
      return;
    }

    pages.current += 1;

    GetContacts({
      pages: pages.current,
    })
      .then((result: GetContactsResponse) => {
        dispatch(AppendContacts(result));
      })
      .catch((e) => {
        dispatch(SetContactsFailure(e));
      });
  }, [pages, metadata]);

  return {
    contacts,
    failure,
    list: [...(favorite ? [favorite] : []), ...list],
    metadata,
    getContacts,
    getMoreContacts,
    ui,
  };
}
