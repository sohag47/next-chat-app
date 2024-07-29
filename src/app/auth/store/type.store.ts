export type TPermission = {
  user_id: number | string;
  service_id: number | string;
  name: string;
}
export type TUser = {
  id: number | string;
  uuid: string;
  email: string;
  phone: string;
  username: string;
  salutation: string;
  surname: string;
  first_name: string;
  middle_name: string;
  gender: string;
  dob: string;
  status: boolean;
}

export type TSelfLibrary = {
  id?: number;
  branch_name: string;
  branch_name_bangla: string;
  branch_username: string;
  branch_code: string;
  password: string;
  phone: string;
  email: string;
  division: string;
  district: string;
  thana: string;
  latitude: string;
  longitude: string;
  description: string;
  description_bangla: string;
  is_active: boolean;
  id_print_access: boolean;
  is_main_branch: boolean;
};