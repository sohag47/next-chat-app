import { FormEvent, useState } from "react";
import { useAlert } from "./useAlert";
import { EAlert } from "@/enums/alert";

interface FormValues {
  [key: string]: number | string | boolean | null | object | object[];
}

export interface IValidationValue {
  is_required: boolean;
  error_message: string;
}

export interface IValidation {
  [key: string]: IValidationValue;
}

type Errors = {
  [key: string]: string;
};

type ChangeValidation = {
  [key: string]: boolean;
};

type FormProps<T extends FormValues> = {
  defaultValues: T;
  defaultValidation: IValidation;
  onSubmit: (form: T) => void;
};

const useForm = <T extends FormValues>({
  defaultValues,
  defaultValidation,
  onSubmit,
}: FormProps<T>) => {
  const [form, setForm] = useState<T>({ ...defaultValues });
  const [validations, setValidations] = useState<IValidation>({ ...defaultValidation });
  const [errors, setErrors] = useState<Errors>({});
  const Alert = useAlert();

  const handleChangeValidation = (validationFields: ChangeValidation) => {
    if (Object.entries(validationFields).length > 0 && Object.entries(validations).length > 0) {
      let newValue = { ...validations };
      let updateErrors = { ...errors };

      Object.entries(validationFields).forEach(([validationKey, validationValue]) => {
        newValue[validationKey].is_required = validationValue;
        delete updateErrors[validationKey];
      });

      setValidations(newValue);
      setErrors(updateErrors);
    }
  };

  const resetForm = () => {
    setForm({ ...defaultValues });
  };

  const handleBlur = (
    inputName: string,
    inputValue: string | boolean | null | object | object[],
  ) => {
    let oldErrors: Errors = { ...errors };

    if (inputValue) {
      if (Array.isArray(inputValue) && inputValue.length === 0) {
        oldErrors[inputName] = validations[inputName]?.error_message || "";
      }
      Object.entries(errors).forEach(([key]) => {
        if (key === inputName && inputValue) {
          delete oldErrors[key];
        }
      });
    } else {
      if (validations[inputName]?.is_required) {
        oldErrors[inputName] = validations[inputName]?.error_message || "";
      }
    }

    return oldErrors;
  };

  const handleChange = (name: string, value: string | boolean | null | object | object[]) => {
    let updateItem = { ...form, [name]: value };

    setForm(updateItem);
    let oldErrors = handleBlur(name, value);

    setErrors(oldErrors);
  };

  const checkFormValidation = async (form: T, validation: IValidation) => {
    let newError: IValidation = {};
    if (Object.entries(validation).length > 0) {
      Object.entries(validation).forEach(([validationKey, validationValue]) => {
        if (validationValue.is_required) {
          if (
            form[validationKey] === "" ||
            form[validationKey] === null ||
            (Array.isArray(form[validationKey]) && form[validationKey].length === 0)
          ) {
            newError[validationKey] = validationValue.error_message || "";
          }
        }
      });
    }

    return newError;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let checkResponse = await checkFormValidation(form, validations);

    if (Object.keys(checkResponse).length > 0) {
      Alert(EAlert.error, "Validation Error");
      setErrors(checkResponse as unknown as Errors);
    } else {
      onSubmit(form);
    }
  };

  return {
    form,
    errors,
    validations,
    setValidations,
    handleChangeValidation,
    resetForm,
    handleChange,
    checkFormValidation,
    setErrors,
    setForm,
    handleSubmit,
  };
};

export default useForm;

/* 
* how to use this hook

// manage others file or this file -> others file name convention is patron.form.ts
export const formValues: TFormAddPatron = {
  library: "",
  patron_category: "",
};

export const validationRules: IValidation = {
  library: {
    is_required: true,
    error_message: "Library is a required field",
  },
  patron_category: {
    is_required: true,
    error_message: "Patron category is a required field",
  },
};



// start using this hook 

import React from "react";
import { useForm } from "@/hooks/useForm";

const onSubmit = async (FORM_DATA: TFormAddPatron): Promise<void> => {
    try {
      console.log("form_data", FORM_DATA);
      // alert
      Alert(EAlert.success, "Successfully create a new patron");
    } catch (error: any) {
      Alert(
        EAlert.error,
        error.data.message || error.data.title || error.message || "Something went wrong",
      );
    }
  };

  const {form, resetForm, errors, handleChange, handleSubmit} = useForm<TFormAddPatron>({
    defaultValues: formValues,
    defaultValidation: validationRules,
    onSubmit,
  });


   <form onSubmit={handleSubmit}>
        <Input
            className="text-dark dark:text-light font-medium"
            errorMessage={errors.date_of_birth ? errors.date_of_birth : ""}
            isInvalid={!!errors.date_of_birth}
            label={
              <span className="text-dark dark:text-light font-medium">
                Date Of Birth
                {validationRules?.date_of_birth?.is_required && (
                  <span className="text-danger">*</span>
                )}
              </span>
            }
            labelPlacement="outside"
            placeholder="Enter patron date of birth"
            type="date"
            value={form?.date_of_birth?.toString()}
            variant="bordered"
            onValueChange={(data) => {
              handleChange("date_of_birth", data);
            }}
          />
    </form>

*/
