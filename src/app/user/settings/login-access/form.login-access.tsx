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
import {TFormEventProps, TEvents} from "./type.login-access";
import {TResponse} from "@/types/api-response.type";
import FormSkeleton from "@/components/form.skeleton";
import moment from "moment";
import { useAddLoginAccessMutation, useUpdateLoginAccessMutation } from "../../store/mutation";

const FormLoginaAccess: React.FC<TFormEventProps> = ({
  item,
  addToList,
  handleFormLoading,
  updateToList,
  onClose,
}) => {
  const Alert = useAlert();

  console.log("item :>> ", item);

  const [addLoginAccess, insert_item] = useAddLoginAccessMutation();
  const [updateLoginAccess, update_item] = useUpdateLoginAccessMutation();

  const defaultValues: TEvents = {
    service_name: item?.service_name ?? "",
    secret_key: item?.secret_key ?? "",
   
  };

  const defaultValidation: IValidation = {
    service_name: {
      is_required: true,
      error_message: "Service Name is a required field",
    },
    secret_key: {
      is_required: true,
      error_message: "Secrete Key is a required field",
    },
    
  };

  const closeForm = () => {
    resetForm();
    onClose({} as React.MouseEvent<HTMLButtonElement, MouseEvent>);
  };

  const onSubmit = async (FORM_DATA: TEvents): Promise<void> => {
    try {
      let for_data = {...FORM_DATA};

      if (item?.id) {
        handleFormLoading(true);
        const response = await updateLoginAccess({id: item?.id, ...for_data}).unwrap();
        const {success, message, data} = response as TResponse;

        if (success) {
          updateToList(data);
          Alert(EAlert.success, message);
          closeForm();
        }
      } else {
        handleFormLoading(true);
        const response = await addLoginAccess(for_data).unwrap();
        const {success, message, data} = response as TResponse;

        if (success) {
          addToList(data);
          Alert(EAlert.success, message);
          closeForm();
        }
      }
    } catch (error: any) {
      setErrors({...error?.errors});
      Alert(EAlert.error, (error as any).message);
    }
  };

  const {form, resetForm, errors, setErrors, handleChange, handleSubmit} = useForm<TEvents>({
    defaultValues,
    defaultValidation,
    onSubmit,
  });
  if (insert_item.isLoading || update_item.isLoading) {
    return <FormSkeleton />;
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            className="text-dark dark:text-light font-medium"
            errorMessage={errors.service_name ? errors.service_name : ""}
            isInvalid={!!errors.service_name}
            label={
              <span className="text-dark dark:text-light font-medium">
                Service Name
                {defaultValidation?.service_name?.is_required && (
                  <span className="text-danger">*</span>
                )}
              </span>
            }
            labelPlacement="outside"
            placeholder="Enter Service Name"
            type="text"
            value={form?.service_name?.toString()}
            variant="bordered"
            onValueChange={(data: any) => {
              handleChange("service_name", data);
            }}
          />

          <Input
            className="text-dark dark:text-light font-medium"
            errorMessage={errors.secret_key ? errors.secret_key : ""}
            isInvalid={!!errors.secret_key}
            label={
              <span className="text-dark dark:text-light font-medium">
                Secrete Key
                {defaultValidation?.secret_key?.is_required && (
                  <span className="text-danger">*</span>
                )}
              </span>
            }
            labelPlacement="outside"
            placeholder="Enter  Secrete Key"
            type="text"
            value={form?.secret_key?.toString()}
            variant="bordered"
            onValueChange={(data: any) => {
              handleChange("secret_key", data);
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

export default FormLoginaAccess;
