import { useCallback } from "react";
import Swal from "sweetalert2";

import { TAlertType } from "@/types/alert";

export function useAlert() {
  const Alert = useCallback((alertType: TAlertType, alertMessage: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      showCloseButton: true,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      color: "#4136A9",
      icon: alertType,
      title: alertMessage,
    });
  }, []);

  return Alert;
}
