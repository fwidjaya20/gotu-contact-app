import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddFavorite, ContactsMapSelector, RemoveFavorite } from "../Redux";

export function useContactFavorite() {
  const contacts = useSelector(ContactsMapSelector);

  const dispatch = useDispatch();

  const toggle = useCallback(
    (id: string) => {
      if (!contacts[id]?.isFavorite) {
        dispatch(AddFavorite(id));
        return;
      }

      dispatch(RemoveFavorite(id));
    },
    [contacts]
  );

  return { toggle };
}
