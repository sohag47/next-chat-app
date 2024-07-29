import Swal from "sweetalert2";

import { useAlert } from "./useAlert";

import { EAlert } from "@/enums/alert";
import { TResponse } from "@/types/api-response.type";

interface Row {
  id?: number;
  [key: string]: any;
}

export const useDelete = (
  deleteMutation: (id: number) => Promise<any>,
  removeFromList: (data: any, column_id: string) => void,
  name: string = "Delete",
  deletable_id: string = "id",
  column_id: string = "id"
) => {
  const Alert = useAlert();
  const deletePopup = async (deleteData: Row) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "rounded-md bg-danger text-white h-10 px-5 py-2 mx-1",
        cancelButton:
          "rounded-md border-danger border text-black h-10 px-5 py-2 mx-1",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: `Are you sure want to ${name}?`,
      text: `This item will be ${name} immediately. You can’t undo this action`,
      icon: EAlert.warning,
      showCancelButton: true,
      confirmButtonText: `${name}`,
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        if (deleteData[`${deletable_id}`]) {
          const response = await deleteMutation(deleteData[`${deletable_id}`]);

          if (response?.data?.success) {
            swalWithBootstrapButtons.fire(
              `${name}`,
              `Successfully ${name}`,
              "success"
            );
            Alert(
              EAlert.success,
              response?.data?.message || `${name} successfully`
            );
            removeFromList(deleteData, column_id);
          } else {
            Alert(EAlert.error, response?.data?.message || `${name} failed`);
          }
        }
      } catch (error) {
        console.error(error);
        Alert(
          EAlert.error,
          (error as any)?.data?.message ||
          (error as any)?.message ||
          "Something went wrong! Please try again."
        );
      }
    }
  };

  return { deletePopup };
};

export const useActionWithNotes = (
  actionMutation: (id: number) => Promise<any>,
  actionFromList: (data: any, column_id: string) => void,
  actionType: string = "delete",
  actionTitle: string = "Are you sure?",
  deletable_id: string = "id",
  isComment: boolean = false,
  note_name: string = "comment",
) => {
  const Alert = useAlert();
  const actionPopup = async (deleteData: Row) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "rounded-md bg-primary text-white h-10 px-5 py-2 mx-1",
        cancelButton:
          "rounded-md border-primary border text-black h-10 px-5 py-2 mx-1",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: actionTitle ?? "",
        text: `This item will be ${actionType} immediately. You can’t undo this action`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((res) => {
        if (res.isConfirmed) {
          if (isComment) {
            Swal.fire<any>({
              title: `Write reason for ${actionType}!`,
              input: "text",
              inputLabel: "Notes",
              inputPlaceholder: `Enter your Notes for ${actionType}`,
              inputValidator: (value: string) => {
                return value ? null : "You need to write something!";
              },
            }).then((res) => {
              try {
                if (deleteData) {
                  let form_data: any = {
                    ...deleteData
                  };
                  form_data[`${note_name}`] = res?.value;
                  console.log("form_data", form_data);
                  actionMutation(form_data)
                    .then((response) => {
                      const { success, message } = response?.data as TResponse;
                      if (success) {
                        actionFromList(deleteData, deletable_id);
                        Alert(EAlert.success, message);
                      }
                    })
                    .catch((err) => {
                      Alert(EAlert.error, err?.data?.message);
                    });
                }
              } catch (err) {
                console.log(err);
              }
            });
          } else {
            if (deleteData) {
              let form_data: any = {
                ...deleteData
              };
              console.log("form_data", form_data);
              actionMutation(form_data)
                .then((response) => {
                  const { success, message } = response?.data as TResponse;
                  if (success) {
                    actionFromList(deleteData, deletable_id);
                    Alert(EAlert.success, message);
                  }
                })
                .catch((err) => {
                  Alert(EAlert.error, err?.data?.message);
                });
            }
          }

        }
      });
  };

  return { actionPopup };
};

export const useUpdateStatus = (
  deleteMutation: (tableRow: any) => Promise<any>,
  reloadPage: () => void,
  name: string = "Delete",
  deletable_id: string = "id",
  column_id: string = "id"
) => {
  const Alert = useAlert();
  const deletePopup = async (deleteData: Row) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "rounded-md bg-danger text-white h-10 px-5 py-2 mx-1",
        cancelButton:
          "rounded-md border-danger border text-black h-10 px-5 py-2 mx-1",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: `Are you sure want to ${name}?`,
      text: `This item will be ${name} immediately. You can’t undo this action`,
      icon: EAlert.warning,
      showCancelButton: true,
      confirmButtonText: `${name}`,
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        if (deleteData[`${deletable_id}`]) {
          const response = await deleteMutation({ ...deleteData });

          if (response?.data?.success) {
            swalWithBootstrapButtons.fire(
              `${name}`,
              `Successfully ${name}`,
              "success"
            );
            Alert(
              EAlert.success,
              response?.data?.message || `${name} successfully`
            );
            reloadPage();
          } else {
            Alert(EAlert.error, response?.data?.message || `${name} failed`);
          }
        }
      } catch (error) {
        console.error(error);
        Alert(
          EAlert.error,
          (error as any)?.data?.message ||
          (error as any)?.message ||
          "Something went wrong! Please try again."
        );
      }
    }
  };

  return { deletePopup };
};