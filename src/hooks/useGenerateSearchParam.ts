import React from 'react'

export default function useGenerateSearchParam(defaultValue: string = '', paramObject: any = {}, search_by_name: string = "", search_data_name: string = '', search_by_array: any[] = []) {
  let final_string = '';
  let search_data_value = paramObject[`${search_data_name}`] ?? '';

  if (defaultValue) {
    final_string = defaultValue;
  }
  if (Object?.entries(paramObject)?.length > 0) {
    Object?.entries(paramObject)?.forEach(([key, value]) => {
      if (value && key != search_data_name && key != search_by_name) {
        let add_one = `${key}=${value}`;
        final_string = final_string + '&' + add_one;
      } else if (key === search_by_name && search_data_value) {
        let search_data = paramObject[`${search_data_name}`] ?? '';
        let add_one = `${value}=${search_data}`;
        final_string = final_string + '&' + add_one;
      }
    });
  }

  return final_string;
}
