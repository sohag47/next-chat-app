/* eslint-disable object-curly-spacing */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";

type CURDHookReturnType<T> = {
  listState: T[];
  setListState: React.Dispatch<React.SetStateAction<T[]>>;
  addToList: (newData: T) => void;
  updateToList: (modifiedData: T) => void;
  removeFromList: (oldData: T) => void;
  addToListLastItem: (newData: T) => void;
  updateToListLastItem: (modifiedData: T) => void;
};

export default function useCurd<T>(stateType: T[] = []): CURDHookReturnType<T> {
  const [listState, setListState] = useState<T[]>(stateType);

  const addToList = (newData: T) => {
    let item_list = [...listState];

    // add item as a element of last item
    item_list.unshift(newData);
    setListState(item_list);
  };

  const addToListLastItem = (newData: T) => {
    let item_list = [...listState];

    // add item as a element of last item
    item_list.push(newData);
    setListState(item_list);
  };

  const updateToList = (modifiedData: T, column_name: string = "id") => {
    let item_list = [...listState];

    item_list.map((item, index) => {
      if (
        (item as any)[`${column_name}`] ==
        (modifiedData as any)[`${column_name}`]
      ) {
        item_list.splice(index, 1);
      }
    });
    item_list.unshift(modifiedData);
    setListState(item_list);
  };

  const updateToListLastItem = (
    modifiedData: T,
    column_name: string = "id"
  ) => {
    let item_list = [...listState];

    item_list.map((item, index) => {
      if (
        (item as any)[`${column_name}`] ==
        (modifiedData as any)[`${column_name}`]
      ) {
        item_list.splice(index, 1);
      }
    });
    item_list.push(modifiedData);
    setListState(item_list);
  };

  const removeFromList = (oldData: T, column_name: string = "id") => {
    let item_list = [...listState];

    item_list.map((item, index) => {
      if (
        (item as any)[`${column_name}`] == (oldData as any)[`${column_name}`]
      ) {
        item_list.splice(index, 1);
      }
    });
    setListState(item_list);
  };

  return {
    listState,
    setListState,
    addToList,
    updateToList,
    removeFromList,
    addToListLastItem,
    updateToListLastItem,
  };
}
