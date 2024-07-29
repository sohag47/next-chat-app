export type TSidebar = {
  id: number;
  key: string;
  name: string;
  link: string;
  icon: string;
  access_permission: boolean;
  submenu?: TSubmenu[];
  badge?: string;
}[];

export type TSubmenu = {
  parent_id: number;
  name: string;
  link: string;
  access_permission: boolean;
  badge?: string;
};
