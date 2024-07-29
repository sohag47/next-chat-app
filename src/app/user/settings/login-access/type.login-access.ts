import { MouseEventHandler } from "react";

export type TEvents = {
    id?: number ;
    service_name: string;
    secret_key: string;
   
  };

export type TFormEventProps = {
    item?: TEvents;
    addToList: (newData: TEvents | any) => void;
    updateToList: (modifiedData: TEvents | any) => void;
    onClose: MouseEventHandler<HTMLButtonElement>;
    handleFormLoading: (isFormLoading: boolean) => void;
  };