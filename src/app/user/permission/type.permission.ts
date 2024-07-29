import { MouseEventHandler } from "react";

export type TPermission = {
  id?: any;
  user_id: string;
  name: string;
  icon: string;
};
export type TPermissionForm = {
  user_id: string;
  service_id: string[];
};
export type TPermissionProps = {
  item?: TPermission;
  addToList: (newData: TPermission | any) => void;
  updateToList: (modifiedData: TPermission | any) => void;
  onClose: MouseEventHandler<HTMLButtonElement>;
  handleFormLoading: (isFormLoading: boolean) => void;
};