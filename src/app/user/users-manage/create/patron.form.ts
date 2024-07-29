'use client';
import { IValidation } from "@/hooks/useForm";
export const formValues: any = {
  library: "",
  patron_category: "",
  prefix_name: "",
  first_name: "",
  last_name: "",
  user_name: "",
  password: "",
  email: "",
  contact_no: "",
  date_of_birth: "",
  gender: "male",
  photo: "",
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
  prefix_name: {
    is_required: true,
    error_message: "Prefix name is a required field",
  },
  first_name: {
    is_required: true,
    error_message: "First name is a required field",
  },
  last_name: {
    is_required: true,
    error_message: "Last name is a required field",
  },
  user_name: {
    is_required: true,
    error_message: "User name is a required field",
  },
  password: {
    is_required: true,
    error_message: "Password is a required field",
  },
  email: {
    is_required: true,
    error_message: "Email is a required field",
  },
  contact_no: {
    is_required: true,
    error_message: "Contact no is a required field",
  },
  date_of_birth: {
    is_required: true,
    error_message: "Date of birth is a required field",
  },
  gender: {
    is_required: true,
    error_message: "Gender is a required field",
  },
  photo: {
    is_required: true,
    error_message: "Photo is a required field",
  },
};
