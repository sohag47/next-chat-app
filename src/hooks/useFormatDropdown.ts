/* eslint-disable object-curly-spacing */
/* eslint-disable prettier/prettier */

import { IDropdown } from "@/types/idropdown";



export default function useFormatDropdown(data: any[], refValue: string, refLabel: string | number): any {

  let dropdown_list: IDropdown[] = [];

  if (Array?.isArray(refLabel)) {
    data?.map((item) => {
      let Item = { value: 0, label: "" };
      let labelText = "";

      Item.value = item[refValue];
      refLabel?.map((label) => {
        if (Array?.isArray(label)) {
          let nestedLabelText = "";

          label?.map((nestedLabel) => {
            nestedLabelText =
              nestedLabelText + `${item[nestedLabel] != null ? item[nestedLabel] : ""} `;
          });
          labelText = labelText + `(${nestedLabelText})`;
        } else {
          labelText = labelText + `${item[label] != null ? item[label] : ""} `;
        }
      });
      Item.label = labelText;
      dropdown_list.push(Item);
    });
  } else {
    data?.map((item) => dropdown_list.push({ value: item[refValue] ?? "", label: item[refLabel] ?? "" }));
  }

  return dropdown_list;
}