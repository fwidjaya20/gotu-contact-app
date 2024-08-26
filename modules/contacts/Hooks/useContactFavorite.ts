import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddFavorite,
  ContactsFavouriteSelector,
  RemoveFavorite,
} from "../Redux";

export function useContactFavorite() {
  const favorite = useSelector(ContactsFavouriteSelector);

  const dispatch = useDispatch();

  const toggle = useCallback(
    (id: string) => {
      if (favorite[id] === undefined) {
        dispatch(AddFavorite(id));
        return;
      }

      dispatch(RemoveFavorite(id));
    },
    [favorite]
  );

  return { toggle };
}
