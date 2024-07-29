type StringOrNull = string | null;


type TLink = {
  active: boolean;
  label: StringOrNull;
  url: StringOrNull;
};


export type TPagination = {
  current_page: number;
  data?: any | any[];
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  links?: TLink[];
  next_page_url?: StringOrNull;
  path?: StringOrNull;
  per_page?: number;
  prev_page_url?: StringOrNull;
  to?: number;
  total: number;
};