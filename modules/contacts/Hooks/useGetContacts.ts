import { useCallback } from "react";
import { GetContactsDTO } from "../DTOs";
import { GetContactsResponse } from "../Entities";
import { useContactsModule } from "../Module";
import { useDispatch, useSelector } from "react-redux";
import {
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

  const { GetContacts } = useContactsModule();
  const dispatch = useDispatch();

  const getContacts = useCallback(async (dto?: GetContactsDTO) => {
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

  return {
    contacts,
    failure,
    favorite,
    list,
    metadata,
    getContacts,
    ui,
  };
}
