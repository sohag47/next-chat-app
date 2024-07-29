import { MouseEventHandler } from "react";

export type TSalutation = {
    id?: number ;
    title: string;
   
  };

export type TSalutationProps = {
    item?: TSalutation;
    addToList: (newData: TSalutation | any) => void;
    updateToList: (modifiedData: TSalutation | any) => void;
    onClose: MouseEventHandler<HTMLButtonElement>;
    handleFormLoading: (isFormLoading: boolean) => void;
  };