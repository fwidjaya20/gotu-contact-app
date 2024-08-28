import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddFavorite,
  ContactsFavouriteSelector,
  ContactsMapSelector,
  RemoveFavorite,
} from "../Redux";

export function useContactFavorite() {
  const contacts = useSelector(ContactsMapSelector);
  const favorite = useSelector(ContactsFavouriteSelector);

  const dispatch = useDispatch();

  const toggle = useCallback(
    (id: string) => {
      if (favorite !== id) {
        dispatch(AddFavorite(id));
        return;
      }

      dispatch(RemoveFavorite(id));
    },
    [contacts]
  );

  return { favorite, toggle };
}
