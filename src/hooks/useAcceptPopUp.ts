import Swal from "sweetalert2";

/* eslint-disable no-console */

import {useAlert} from "./useAlert";

type Row = {
  id?: number;
  [key: string]: any;
};

export const useAcceptPopUp = (
  acceptMutation: (data: Row) => Promise<any>,
  actionCURD: (data: any) => void,
) => {
  const Alert = useAlert();
  const acceptPopup = async (tableRowData: Row) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "rounded-md bg-error text-white h-10 px-5 py-2 mx-1",
        cancelButton: "rounded-md bg-[#D8D9DD] text-black h-10 px-5 py-2 mx-1",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        if (Object.entries(tableRowData).length > 0) {
          const response = await acceptMutation(tableRowData);

          if (response?.data?.success) {
            swalWithBootstrapButtons.fire(
              "Confirmed!",
              response?.data?.message ?? "Request Confirmed",
              "success",
            );
            actionCURD(tableRowData);
          } else {
            console.error("Request failed!:", response.data);
            swalWithBootstrapButtons.fire(
              "Confirmed!",
              response?.data?.message ?? "Request Failed!",
              "error",
            );
            Alert("error", response.data.message || "Request failed!");
          }
        }
      } catch (error) {
        console.error(error);
        Alert("error", (error as any).data.message || (error as any).message);
      }
    }
  };

  return {acceptPopup};
};
