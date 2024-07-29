import { MouseEventHandler } from "react";

export type TRole = {
    id?: number ;
    role_name: string;
   
  };

export type TRoleProps = {
    item?: TRole;
    addToList: (newData: TRole | any) => void;
    updateToList: (modifiedData: TRole | any) => void;
    onClose: MouseEventHandler<HTMLButtonElement>;
    handleFormLoading: (isFormLoading: boolean) => void;
  };