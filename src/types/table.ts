export type IColumn = {
  id?: number | string;
  uid: string;
  name: string;
  sortable?: boolean;
  align?: string;
};
export type TSearchable = string | number | undefined | null;
