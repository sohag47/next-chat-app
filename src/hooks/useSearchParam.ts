export default function useSearchParam(
  paramObject: any = {},
  search_by_name = "",
  search_data_name = "",
  search_by_array = [],
): string {
  let final_string = "";
  const search_data_value = paramObject[`${search_data_name}`] ?? "";

  // if (defaultValue) {
  //     final_string = defaultValue;
  // }
  if (Object?.entries(paramObject)?.length > 0) {
    Object?.entries(paramObject)?.map(([key, value], index) => {
      if (index === 0) {
        if (value && key != search_data_name && key != search_by_name) {
          const add_one = `${key}=${value}`;

          final_string = final_string + add_one;
        } else if (key === search_by_name && search_data_value) {
          const search_data = paramObject[`${search_data_name}`] ?? "";
          const add_one = `${value}=${search_data}`;

          final_string = final_string + add_one;
        }
      } else {
        if (value && key != search_data_name && key != search_by_name) {
          const add_one = `${key}=${value}`;

          final_string = final_string + "&" + add_one;
        } else if (key === search_by_name && search_data_value) {
          const search_data = paramObject[`${search_data_name}`] ?? "";
          const add_one = `${value}=${search_data}`;

          final_string = final_string + "&" + add_one;
        }
      }
    });
  }

  return final_string;
}
