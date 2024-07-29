"use client";

import {Icon} from "@iconify/react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Textarea,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import React, {useState} from "react";

import {EAlert} from "@/enums/alert";
import {useAlert} from "@/hooks/useAlert";
import useForm, {IValidation} from "@/hooks/useForm";
import {type IDropdown} from "@/types/idropdown";
import {TRoleProps, TRole} from "./type.role";
import {useAddEventsMutation, useUpdateEventsMutation} from "@/app/library/store/mutation";
import {TResponse} from "@/types/api-response.type";
import FormSkeleton from "@/components/form.skeleton";
import moment from "moment";

const FormAddrole: React.FC<TRoleProps> = ({
  item,
  addToList,
  handleFormLoading,
  updateToList,
  onClose,
}) => {
  const Alert = useAlert();

  console.log("item :>> ", item);

  // const [addEvents, insert_item] = useAddEventsMutation();
  // const [updateEvents, update_item] = useUpdateEventsMutation();

  const defaultValues: TRole = {
    role_name: item?.role_name ?? "",
  };

  const defaultValidation: IValidation = {
    role_name: {
      is_required: true,
      error_message: "Role Name is a required field",
    },
  };

  const closeForm = () => {
    resetForm();
    onClose({} as React.MouseEvent<HTMLButtonElement, MouseEvent>);
  };

  // const onSubmit = async (FORM_DATA: TRole): Promise<void> => {
  //   try {
  //     let for_data = {...FORM_DATA};

  //     if (item?.id) {
  //       handleFormLoading(true);
  //       const response = await updateEvents({id: item?.id, ...for_data}).unwrap();
  //       const {success, message, data} = response as TResponse;

  //       if (success) {
  //         updateToList(data);
  //         Alert(EAlert.success, message);
  //         closeForm();
  //       }
  //     } else {
  //       handleFormLoading(true);
  //       const response = await addEvents(for_data).unwrap();
  //       const {success, message, data} = response as TResponse;

  //       if (success) {
  //         addToList(data);
  //         Alert(EAlert.success, message);
  //         closeForm();
  //       }
  //     }
  //   } catch (error: any) {
  //     setErrors({...error?.errors});
  //     Alert(EAlert.error, (error as any).message);
  //   }
  // };

  const {form, resetForm, errors, setErrors, handleChange, handleSubmit} = useForm<TRole>({
    defaultValues,
    defaultValidation,
    // onSubmit,
  });
  // if (insert_item.isLoading || update_item.isLoading) {
  //   return <FormSkeleton />;
  // }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            className="text-dark dark:text-light font-medium"
            errorMessage={errors.role_name ? errors.role_name : ""}
            isInvalid={!!errors.role_name}
            label={
              <span className="text-dark dark:text-light font-medium">
                Role Name
                {defaultValidation?.role_name?.is_required && (
                  <span className="text-danger">*</span>
                )}
              </span>
            }
            labelPlacement="outside"
            placeholder="Enter Role Name"
            type="text"
            value={form?.role_name?.toString()}
            variant="bordered"
            onValueChange={(data: any) => {
              handleChange("role_name", data);
            }}
          />
        </div>
        <div className="flex flex-wrap justify-end gap-3 mt-3" id="buttons">
          <Button
            radius="sm"
            color="warning"
            type="reset"
            variant="solid"
            onClick={closeForm}
            className="font-semibold"
          >
            <Icon height={24} icon="majesticons:close-line" width={24} />
            Cancel
          </Button>
          <Button
            className="font-semibold"
            color="primary"
            radius="sm"
            type="submit"
            variant="solid"
          >
            <Icon height={24} icon="ic:round-download-done" width={24} />
            {item?.id ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default FormAddrole;
