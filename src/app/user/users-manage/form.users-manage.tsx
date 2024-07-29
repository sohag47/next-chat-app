"use client";

import {Icon} from "@iconify/react";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Card,
  CardBody,
  Checkbox,
  Image,
  Input,
  Radio,
  RadioGroup,
  Textarea,
} from "@nextui-org/react";
import React, {useEffect, useState} from "react";

import {EAlert} from "@/enums/alert";
import {useAlert} from "@/hooks/useAlert";
import useForm, {IValidation} from "@/hooks/useForm";
import {type IDropdown} from "@/types/idropdown";
// import {defaultDropdown} from "./create/patron.constant";
import {
  TUsersManage,
  TPatronProps,
} from "./tpe.users-manage.form";
import {EyeSlashFilledIcon} from "@/assets/icons/eye-slash-filled-icon";
import {EyeFilledIcon} from "@/assets/icons/eye-filled-icon";
import {CameraIcon} from "@/assets/icons/camera-icon";
// import {
//   useAddPatronMutation,
//   useDropdownLibrariesMutation,
//   useDropdownPatronCategoryMutation,
//   useGetPatronConfigByCategoryIdMutation,
// } from "../../store/mutation";
// import useFormatDropdown from "@/hooks/useFormatDropdown";
import {TResponse} from "@/types/api-response.type";
import FormSkeleton from "@/components/form.skeleton";
// import {TypePatronConfig} from "../settings/patron-form-configuration/type.patron-config";
import {InputFieldsEnum} from "@/enums/enum.input-fields";
import RSkeleton from "@/components/skeleton";
import CustomAlert from "@/components/custom-alert";
import {useUploadFilesMutation} from "@/app/auth/store/mutation";
import { useAddUsersRegisterMutation } from "../store/mutation";

const UsersManage: React.FC<TPatronProps> = ({
  item,
  addToList,
  updateToList,
  
  handleFormLoading,}) => {
  const Alert = useAlert();
  const {alertState, setAlertState, ShowMessage, clearMessages} = CustomAlert();

  // redux hooks
    const [addUsersRegister, insert_item] = useAddUsersRegisterMutation();
  //   const [dropdownPatronCategory, d_categories] = useDropdownPatronCategoryMutation();
  //   const [getPatronConfigByCategoryId, dynamic_fields] = useGetPatronConfigByCategoryIdMutation();
  //   const [addPatron, insert_item] = useAddPatronMutation();
  const [uploadFiles] = useUploadFilesMutation();

  // local state
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  // const [libraries, setLibraries] = useState<IDropdown[]>([]);
  const [bloodgroup, setbloodgroup] = useState<IDropdown[]>([
    {label: "A+", value: "a+"},
    {label: "A-", value: "a-"},
    {label: "B+", value: "b+"},
    {label: "B-", value: "b-"},
    {label: "O+", value: "o+"},
    {label: "O-", value: "o-"},
    {label: "AB+", value: "ab+"},
    {label: "ab-", value: "ab-"},
  ]);
  const [uroleid, seturoleid] = useState<IDropdown[]>([
    {label: "A", value: "1"},
    {label: "A-", value: "2"},
    {label: "B+", value: "3"},
    
  ]);
  // const [dynamicFields, setDynamicFields] = useState<TUsersManageDynamicSortedFields>({});

  // fetch data
  //   const handleFetchData = async () => {
  //     try {
  //       const response = await dropdownLibraries("").unwrap();
  //       const {success, data} = response as TResponse;
  //       if (success) {
  //         let format_data = useFormatDropdown(data, "id", "branch_name");
  //         setLibraries(format_data);
  //       }
  //     } catch (error: any) {
  //       Alert(EAlert.error, error?.message);
  //       console.log("error :>> ", error);
  //     }
  //   };
  //   const handleFetchPatronCategory = async () => {
  //     try {
  //       const response = await dropdownPatronCategory("").unwrap();
  //       const {success, data} = response as TResponse;
  //       if (success) {
  //         let form_data = useFormatDropdown(data, "id", "name");
  //         setPatronCategories(form_data);
  //       }
  //     } catch (error: any) {
  //       Alert(EAlert.error, error?.message);
  //       console.log("error :>> ", error);
  //     }
  //   };
  //   const handleFetchPatronConfigById = async (patron_category_id: string | number) => {
  //     try {
  //       const response = await getPatronConfigByCategoryId(patron_category_id).unwrap();
  //       const {success, data} = response as TResponse;
  //       if (success) {
  //         const sorted_group: any = Object.groupBy(
  //           data,
  //           (item: TPatronDynamicFields) => item?.group_id,
  //         );
  //         setDynamicFields(sorted_group);
  //         let set_form_data: any = {...form};
  //         let set_form_validation: any = {...validations};
  //         data?.map((item: any) => {
  //           set_form_data[`${item?.param_id}_${item?.param}`] = "";
  //           // set_form_validation[`${item?.param}`] = {
  //           //   required: item?.is_required ? true : false,
  //           //   error_message: `${item?.param} is a required field`,
  //           // };
  //         });
  //         setForm({...set_form_data});
  //         // setValidations({...set_form_validation});
  //         console.log("set_form_data :>> ", set_form_data);
  //         console.log("set_form_validation :>> ", set_form_validation);
  //       }
  //     } catch (error: any) {
  //       Alert(EAlert.error, error?.message);
  //       console.log("error :>> ", error);
  //     }
  //   };

  const defaultValues: TUsersManage = {
    // basic info
    first_name: item?.first_name ?? "",
    middle_name: item?.middle_name ?? "",
    surname: item?.surname ?? "",
    profile_img: item?.profile_img ?? "",
    gender: item?.gender ?? "male",
    salutation: item?.salutation ?? "",
    phone: item?.phone ?? "",
    dob: item?.dob ?? "",

    user_role_id: item?.user_role_id ?? "",
    status: item?.status ?? 0,
    blood_group: item?.blood_group ?? "",
    nationality: item?.nationality ?? "",
    signature: item?.signature ?? "",
    additional_phone_no: item?.additional_phone_no ?? "",
    nid_no: item?.nid_no ?? "",
    nid_img: item?.nid_img ?? "",
    dl_no: item?.dl_no ?? "",
    birth_certificate_no: item?.birth_certificate_no ?? "",
    birth_certificate_img: item?.birth_certificate_img ?? "",
    passport_no: item?.passport_no ?? "",
    passport_img: item?.passport_img ?? "",
    present_address: item?.present_address ?? "",
    permanent_address: item?.permanent_address ?? "",
    mailing_address: item?.mailing_address ?? "",
    office_address: item?.office_address ?? "",
    student_class: item?.student_class ?? "",
    student_id: item?.student_id ?? "",
    student_id_img: item?.student_id_img ?? "",
    profession: item?.profession ?? "",
    grade: item?.grade ?? "",
    department: item?.department ?? "",
    designation: item?.designation ?? "",
    emp_code: item?.emp_code ?? "",
    emp_id_img: item?.emp_id_img ?? "",
    fathers_name: item?.fathers_name ?? "",
    fathers_nid_no: item?.fathers_nid_no ?? "",
    mothers_name: item?.mothers_name ?? "",
    mothers_nid_no: item?.mothers_nid_no ?? "",
    spouse_name: item?.spouse_name ?? "",
    spouse_nid_no: item?.spouse_nid_no ?? "",
    emergency_contact_name: item?.emergency_contact_name ?? "",
    emergency_contact_no: item?.emergency_contact_no ?? "",
    emergency_contact_relation: item?.emergency_contact_relation ?? "",
    nominee: item?.nominee ?? "",
    mobile_verify: item?.mobile_verify ?? "",
    email_verify: item?.email_verify ?? "",
    document_verify: item?.document_verify ?? "",
    // verified_by: item?.verified_by ?? "",
    joining_date: item?.joining_date ?? "",
    exp_date: item?.exp_date ?? "",
    comment: item?.comment ?? "",

    //login Credentials
    username: item?.username ?? "",
    email: item?.email ?? "",
    password: "",
    password_confirmation: "",
    
  };

  const defaultValidation: IValidation = {
    
    first_name: {
      is_required: true,
      error_message: "first_name is a required field",
    },
    middle_name: {
      is_required: false,
      error_message: "middle_name is a required field",
    },
    surname: {
      is_required: false,
      error_message: "surname is a required field",
    },
    gender: {
      is_required: false,
      error_message: "gender is a required field",
    },
    salutation: {
      is_required: false,
      error_message: "salutation is a required field",
    },
    phone: {
      is_required: true,
      error_message: "phone is a required field",
    },
    dob: {
      is_required: true,
      error_message: "dob is a required field",
    },
    profile_img: {
      is_required: false,
      error_message: "profile_img is a required field",
    },
    blood_group: {
      is_required: false,
      error_message: "blood_group is a required field",
    },
    nationality: {
      is_required: false,
      error_message: "nationality is a required field",
    },
    present_address: {
      is_required: false,
      error_message: "present_address is a required field",
    },
    permanent_address: {
      is_required: false,
      error_message: "permanent_address is a required field",
    },
    mailing_address: {
      is_required: false,
      error_message: "mailing_address is a required field",
    },
    student_class: {
      is_required: false,
      error_message: "student_class is a required field",
    },
    profession: {
      is_required: false,
      error_message: "profession is a required field",
    },
    grade: {
      is_required: false,
      error_message: "grade is a required field",
    },
    nid_no: {
      is_required: false,
      error_message: "nid_no is a required field",
    },
    birth_certificate_no: {
      is_required: false,
      error_message: "birth_certificate_no is a required field",
    },  
    passport_no: {
      is_required: false,
      error_message: "passport_no is a required field",
    },
    passport_img: {
      is_required: false,
      error_message: "passport_img is a required field",
    },
    student_id: {
      is_required: false,
      error_message: "student_id is a required field",
    },
    student_id_img: {
      is_required: false,
      error_message: "student_id_img is a required field",
    },
    status: {
      is_required: false,
      error_message: "status is a required field",
    },
    signature: {
      is_required: false,
      error_message: "signature is a required field",
    },
    dl_no: {
      is_required: false,
      error_message: "dl_no is a required field",
    },
    office_address: {
      is_required: false,
      error_message: "office_address is a required field",
    },
    department: {
      is_required: false,
      error_message: "department is a required field",
    },
    designation: {
      is_required: false,
      error_message: "designation is a required field",
    },
    emp_code: {
      is_required: false,
      error_message: "emp_code is a required field",
    },
    emp_id_img: {
      is_required: false,
      error_message: "emp_id_img is a required field",
    },
    fathers_name: {
      is_required: false,
      error_message: "fathers_name is a required field",
    },
    mothers_name: {
      is_required: false,
      error_message: "mothers_name is a required field",
    },
    mothers_nid_no: {
      is_required: false,
      error_message: "mothers_nid_no is a required field",
    },
    spouse_name: {
      is_required: false,
      error_message: "spouse_name is a required field",
    },
    spouse_nid_no: {
      is_required: false,
      error_message: "spouse_nid_no is a required field",
    },
    emergency_contact_name: {
      is_required: false,
      error_message: "emergency_contact_name is a required field",
    },
    emergency_contact_no: {
      is_required: false,
      error_message: "emergency_contact_no is a required field",
    },
    emergency_contact_relation: {
      is_required: false,
      error_message: "emergency_contact_relation is a required field",
    },
    nominee: {
      is_required: false,
      error_message: "nominee is a required field",
    },
    mobile_verify: {
      is_required: false,
      error_message: "mobile_verify is a required field",
    },
    email_verify: {
      is_required: false,
      error_message: "email_verify is a required field",
    },
    document_verify: {
      is_required: false,
      error_message: "document_verify is a required field",
    },
    // verified_by: {
    //   is_required: false,
    //   error_message: "verified_by is a required field",
    // },
    joining_date: {
      is_required: false,
      error_message: "joining_date is a required field",
    },
    exp_date: {
      is_required: false,
      error_message: "exp_date is a required field",
    },
    comment: {
      is_required: false,
      error_message: "Comment is a required field",
    },
    email: {
      is_required: true,
      error_message: "Email is a required field",
    },
    username: {
      is_required: true,
      error_message: "Username is a required field",
    },
    password: {
      is_required: true,
      error_message: "Password is a required field",
    },
    password_confirmation: {
      is_required: true,
      error_message: "Password Confirmation is a required field",
    },
   
  };

  // const closeForm = () => {
  //   resetForm();
  //   setDynamicFields({});
  // };

  // const preparePatronData = (old_data: TUsersManage) => {
  //   const formData: any = {};
  //   const additional_field: any = {};
  //   if (Object.entries(old_data).length > 0) {
  //     Object?.entries(old_data).map(([key, value]) => {
  //       if (Object.hasOwn(defaultValues, key)) {
  //         formData[key] = value;
  //       } else {
  //         additional_field[key.split("_")[0]] = value;
  //       }
  //     });
  //   }
  //   return {...formData, additional_field: additional_field};
  // };

  // const fileUpload = async (files: any) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("data[1][key]", "library/profile_img");
  //     formData.append("data[1][file]", files);

  //     const response = await uploadFiles(formData).unwrap();
  //     const {success, data, message} = response as TResponse;
  //     if (success) {
  //       console.log("data", data);
  //       Alert(EAlert.success, message);
  //       // closeForm();
  //       return data;
  //     }
  //   } catch (error: any) {
  //     const {message} = error as TResponse;
  //     Alert(EAlert.error, message ?? "Something went wrong");
  //   }
  // };
  const closeForm = () => {
    resetForm();
    
  };

  const onSubmit = async (FORM_DATA: TUsersManage): Promise<void> => {
    try {
      if (!item?.id) {
        const response = await addUsersRegister(FORM_DATA).unwrap();
        const {success, message, data} = response as TResponse;

        if (success) {
          Alert(EAlert.success, message);
          closeForm();
        }
      } 
    } catch (error: any) {
      setErrors({...error?.errors});
      Alert(EAlert.error, (error as any).message);
    }
  };

    // const submitForm = async (FORM_DATA: TUsersManage): Promise<void> => {
    //   if (FORM_DATA?.profile_img) {
    //     const file_paths = await fileUpload(FORM_DATA?.profile_img);
    //     // console.log("file_paths :>> ", file_paths["1"].path);
    //     await submiTUsersManage({...FORM_DATA, profile_img: file_paths["1"]?.path});
    //   } else {
    //     await submitPatron(FORM_DATA);
    //   }
    // };

  const {
    form,
    setForm,
    resetForm,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    validations,
    setValidations,
  } = useForm<TUsersManage>({
    defaultValues,
    defaultValidation,
    onSubmit,
  });

  // fetch library and patron category dropdown
  // useEffect(() => {
  //   handleFetchData();
  //   handleFetchPatronCategory();
  // }, []);

  // fetch dynamic fields by category_id
  // useEffect(() => {
  //   if (form?.category_id) {
  //     handleFetchPatronConfigById(form?.category_id);
  //   }
  // }, [form?.category_id]);

  // password validation
    useEffect(() => {
      if (
        form?.password &&
        form?.password_confirmation &&
        form?.password !== form?.password_confirmation
      ) {
        setErrors({password_confirmation: "Password did not match!"});
      }
    }, [form?.password, form?.password_confirmation]);

  
  if (insert_item.isLoading) {
    return <FormSkeleton />;
  }
  return (
    <section>
      {/* {insert_item?.isError && <ShowMessage />} */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
        <Card id="basic_info">
          <CardBody>
            <h4 className="text-base font-bold text-center mb-5">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-5 px-1">
            <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.salutation ? errors.salutation : ""}
                isInvalid={!!errors.salutation}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Salutation
                    {defaultValidation?.salutation?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter  Salutation"
                type="text"
                value={form?.salutation?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("salutation", data);
                }}
              />
              

              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.first_name ? errors.first_name : ""}
                isInvalid={!!errors.first_name}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    First Name
                    {defaultValidation?.first_name?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter patron last name"
                type="text"
                value={form?.first_name?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("first_name", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.middle_name ? errors.middle_name : ""}
                isInvalid={!!errors.middle_name}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Middle Name
                    {defaultValidation?.middle_name?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter   Middle Name"
                type="text"
                value={form?.middle_name?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("middle_name", data);
                }}
              />
              
              <div className="-mt-16 flex justify-end">
                <label className="font-medium text-dark/80 dark:text-light/80" htmlFor="photo">
                  <Avatar
                    color={errors.profile_img ? "danger" : "default"}
                    size="sm"
                    isBordered
                    showFallback
                    src={form?.profile_img ? URL.createObjectURL((form as any)?.profile_img) : ""}
                    fallback={
                      <CameraIcon
                        className="animate-pulse w-5 h-5 text-default-500"
                        fill="currentColor"
                        size={20}
                      />
                    }
                    className="w-20 h-20 text-large"
                  />
                  Profile Image{" "}
                  {defaultValidation?.profile_img?.is_required && (
                    <span className="text-danger">*</span>
                  )}
                  <p className="text-danger text-xs -ml-10">
                    {errors.profile_img ? errors.profile_img : ""}
                  </p>
                </label>
                <div className="flex gap-x-2">
                  <input
                    accept="image/*"
                    className="text-dark/80 hidden dark:text-light/80 w-full px-2 h-10 pt-1 border rounded-xl mt-1"
                    id="photo"
                    name="profile_img"
                    type="file"
                    onChange={(event) =>
                      handleChange("profile_img", event.target?.files && event.target?.files[0])
                    }
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-5 px-1">
            <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.surname ? errors.surname : ""}
                isInvalid={!!errors.surname}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Surname
                    {defaultValidation?.surname?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter  Surname"
                type="text"
                value={form?.surname?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("surname", data);
                }}
              />
              <RadioGroup
                errorMessage={errors?.gender && errors?.gender.toString()}
                isInvalid={errors?.gender ? true : false}
                label={
                  <span className="font-medium text-dark/80 dark:text-light/80">
                    Gender
                    {defaultValidation?.gender?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                orientation="horizontal"
                value={form.gender?.toString()}
                onValueChange={(data) => handleChange("gender", data)}
              >
                <Radio value="male">
                  <p className="text-dark/80 dark:text-light/80">Male</p>
                </Radio>
                <Radio value="female">
                  <p className="text-dark/80 dark:text-light/80">Female</p>
                </Radio>
                <Radio value="others">
                  <p className="text-dark/80 dark:text-light/80">Others</p>
                </Radio>
              </RadioGroup>
            
              <Autocomplete
                isClearable
                className="text-dark dark:text-light font-medium"
                defaultItems={bloodgroup}
                errorMessage={errors.blood_group ? errors.blood_group : ""}
                isInvalid={!!errors.blood_group}
                // isLoading={d_categories?.isLoading}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Blood Group{" "}
                    {defaultValidation?.blood_group?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="select your Blood Group"
                selectedKey={form?.blood_group?.toString()}
                variant="bordered"
                onSelectionChange={(data) => {
                  handleChange("blood_group", data ? data.toString() : "");
                }}
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>

             

              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.dob ? errors.dob : ""}
                isInvalid={!!errors.dob}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Date Of Birth
                    {defaultValidation?.dob?.is_required && <span className="text-danger">*</span>}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter  date of birth"
                type="date"
                value={form?.dob?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("dob", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.nationality ? errors.nationality : ""}
                isInvalid={!!errors.nationality}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Nationality
                    {defaultValidation?.nationality?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Nationality"
                type="text"
                value={form?.nationality?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("nationality", data);
                }}
              />
               <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.phone ? errors.phone : ""}
                isInvalid={!!errors.phone}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Phone Number
                    {defaultValidation?.phone?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Phone Number"
                type="number"
                value={form?.phone?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("phone", data);
                }}
              />

              
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.present_address ? errors.present_address : ""}
                isInvalid={!!errors.present_address}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Present Address
                    {defaultValidation?.present_address?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Present Address"
                type="text"
                value={form?.present_address?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("present_address", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.permanent_address ? errors.permanent_address : ""}
                isInvalid={!!errors.permanent_address}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Permanent Address
                    {defaultValidation?.permanent_address?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Permanent Address"
                type="text"
                value={form?.permanent_address?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("permanent_address", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.mailing_address ? errors.mailing_address : ""}
                isInvalid={!!errors.mailing_address}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Mailing Address
                    {defaultValidation?.mailing_address?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Mailing address"
                type="text"
                value={form?.mailing_address?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("mailing_address", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.student_class ? errors.student_class : ""}
                isInvalid={!!errors.student_class}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Student Class
                    {defaultValidation?.student_class?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Student Class"
                type="text"
                value={form?.student_class?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("student_class", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.profession ? errors.profession : ""}
                isInvalid={!!errors.profession}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Profession
                    {defaultValidation?.profession?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Profession"
                type="text"
                value={form?.profession?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("profession", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.grade ? errors.grade : ""}
                isInvalid={!!errors.grade}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Grade
                    {defaultValidation?.grade?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter grade"
                type="text"
                value={form?.grade?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("grade", data);
                }}
              />
            </div>
          </CardBody>
        </Card>
        {/* {dynamic_fields?.isLoading && <RSkeleton numberOfSkeletons={2} />} */}
        {/* {Object.entries(dynamicFields).length > 0 && (
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(dynamicFields).map(([key, value]) => (
              <Card>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {Array.isArray(value) &&
                      value?.map((item: TUsersManageDynamicFields) => {
                        if (
                          item?.type === InputFieldsEnum.TEXT ||
                          item?.type === InputFieldsEnum.NUMBER
                        ) {
                          return (
                            <Input
                              className="text-dark dark:text-light font-medium"
                              errorMessage={
                                errors[`${item?.param_id}_${item?.param}`]
                                  ? errors[`${item?.param_id}_${item?.param}`]
                                  : ""
                              }
                              isInvalid={!!errors[`${item?.param_id}_${item?.param}`]}
                              label={
                                <span className="text-dark dark:text-light font-medium">
                                  {item?.title}
                                  {item?.is_required && <span className="text-danger">*</span>}
                                </span>
                              }
                              labelPlacement="outside"
                              placeholder="Enter patron user name"
                              type={item?.type}
                              // value={form[`${item?.param_id}_${item?.param}`]?.toString()}
                              variant="bordered"
                              onValueChange={(data) => {
                                handleChange(`${item?.param_id}_${item?.param}`, data);
                              }}
                            />
                          );
                        } else if (item?.type === InputFieldsEnum.IMAGE) {
                          return (
                            <>
                              <div className="flex gap-x-2">
                                <input
                                  accept="image/*"
                                  className="text-dark/80 hidden dark:text-light/80 w-full px-2 h-10 pt-1 border rounded-xl mt-1"
                                  id="photo"
                                  name="profile_img"
                                  type="file"
                                  onChange={(event) =>
                                    handleChange(
                                      "profile_img",
                                      event.target?.files && event.target?.files[0],
                                    )
                                  }
                                />
                              </div>
                            </>
                          );
                        }
                      })}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )} */}
        <Card id="Documents">
          <CardBody>
            <h4 className="text-base font-bold text-center">Documents</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-5">
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.nid_no ? errors.nid_no : ""}
                isInvalid={!!errors.nid_no}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    NID No
                    {defaultValidation?.nid_no?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter patron first name"
                type="text"
                value={form?.nid_no?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("nid_no", data);
                }}
              />
              <div className="-mt-1">
                <label
                  className="font-medium text-dark/80 dark:text-light/80"
                  htmlFor="license_img"
                >
                  NID Img{" "}
                  {defaultValidation?.nid_img?.is_required && (
                    <span className="text-danger">*</span>
                  )}
                </label>
                <div className="flex gap-x-2">
                  <input
                    accept="image/*"
                    className="text-dark/80 dark:text-light/80 w-full px-2 h-10 pt-1 border rounded-xl mt-1"
                    id="nid_img"
                    name="nid_img"
                    placeholder="Select a photo"
                    required={defaultValidation?.nid_img?.is_required}
                    type="file"
                    onChange={(event) =>
                      handleChange("nid_img", event.target?.files && event.target?.files[0])
                    }
                  />
                </div>
                <p className="text-danger text-xs">{errors.image ? errors.image : ""}</p>
              </div>
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.birth_certificate_no ? errors.birth_certificate_no : ""}
                isInvalid={!!errors.birth_certificate_no}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Birth Certificate No
                    {defaultValidation?.birth_certificate_no?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter  Birth Certificate No"
                type="text"
                value={form?.birth_certificate_no?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("birth_certificate_no", data);
                }}
              />
              <div className="-mt-1">
                <label
                  className="font-medium text-dark/80 dark:text-light/80"
                  htmlFor="license_img"
                >
                  Birth Certificate Img{" "}
                  {defaultValidation?.birth_certificate_img?.is_required && (
                    <span className="text-danger">*</span>
                  )}
                </label>
                <div className="flex gap-x-2">
                  <input
                    accept="image/*"
                    className="text-dark/80 dark:text-light/80 w-full px-2 h-10 pt-1 border rounded-xl mt-1"
                    id="birth_certificate_img"
                    name="birth_certificate_img"
                    placeholder="Select a photo"
                    required={defaultValidation?.birth_certificate_img?.is_required}
                    type="file"
                    onChange={(event) =>
                      handleChange(
                        "birth_certificate_img",
                        event.target?.files && event.target?.files[0],
                      )
                    }
                  />
                </div>
                <p className="text-danger text-xs">{errors.image ? errors.image : ""}</p>
              </div>

              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.passport_no ? errors.passport_no : ""}
                isInvalid={!!errors.passport_no}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Passport No
                    {defaultValidation?.passport_no?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Passport No"
                type="text"
                value={form?.passport_no?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("passport_no", data);
                }}
              />
              <div className="-mt-1">
                <label
                  className="font-medium text-dark/80 dark:text-light/80"
                  htmlFor="license_img"
                >
                  Passport Img{" "}
                  {defaultValidation?.passport_img?.is_required && (
                    <span className="text-danger">*</span>
                  )}
                </label>
                <div className="flex gap-x-2">
                  <input
                    accept="image/*"
                    className="text-dark/80 dark:text-light/80 w-full px-2 h-10 pt-1 border rounded-xl mt-1"
                    id="passport_img"
                    name="passport_img"
                    placeholder="Select a photo"
                    required={defaultValidation?.passport_img?.is_required}
                    type="file"
                    onChange={(event) =>
                      handleChange("passport_img", event.target?.files && event.target?.files[0])
                    }
                  />
                </div>
                <p className="text-danger text-xs">{errors.image ? errors.image : ""}</p>
              </div>

              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.student_id ? errors.student_id : ""}
                isInvalid={!!errors.student_id}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Student Id
                    {defaultValidation?.student_id?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Student Id"
                type="text"
                value={form?.student_id?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("student_id", data);
                }}
              />

              <div className="-mt-1">
                <label
                  className="font-medium text-dark/80 dark:text-light/80"
                  htmlFor="license_img"
                >
                  Student Id Img{" "}
                  {defaultValidation?.student_id_img?.is_required && (
                    <span className="text-danger">*</span>
                  )}
                </label>
                <div className="flex gap-x-2">
                  <input
                    accept="image/*"
                    className="text-dark/80 dark:text-light/80 w-full px-2 h-10 pt-1 border rounded-xl mt-1"
                    id="student_id_img"
                    name="student_id_img"
                    placeholder="Select a photo"
                    required={defaultValidation?.student_id_img?.is_required}
                    type="file"
                    onChange={(event) =>
                      handleChange("student_id_img", event.target?.files && event.target?.files[0])
                    }
                  />
                </div>
                <p className="text-danger text-xs">{errors.image ? errors.image : ""}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card id="Family-info">
          <CardBody>
            <h4 className="text-base font-bold text-center">Family Info</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-5">
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.fathers_name ? errors.fathers_name : ""}
                isInvalid={!!errors.fathers_name}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Fathers Name
                    {defaultValidation?.fathers_name?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Fathers Name"
                type="text"
                value={form?.fathers_name?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("fathers_name", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.fathers_nid_no ? errors.fathers_nid_no : ""}
                isInvalid={!!errors.fathers_nid_no}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Fathers NID No
                    {defaultValidation?.fathers_nid_no?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Fathers NID No"
                type="text"
                value={form?.fathers_nid_no?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("fathers_nid_no", data);
                }}
              />

              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.mothers_name ? errors.mothers_name : ""}
                isInvalid={!!errors.mothers_name}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Mothers Name
                    {defaultValidation?.mothers_name?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Mothers Name"
                type="text"
                value={form?.mothers_name?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("mothers_name", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.mothers_nid_no ? errors.mothers_nid_no : ""}
                isInvalid={!!errors.mothers_nid_no}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Mothers NID No
                    {defaultValidation?.mothers_nid_no?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Mothers NID No"
                type="text"
                value={form?.mothers_nid_no?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("mothers_nid_no", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.spouse_name ? errors.spouse_name : ""}
                isInvalid={!!errors.spouse_name}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Spouse Name
                    {defaultValidation?.spouse_name?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter  Spouse Name"
                type="text"
                value={form?.spouse_name?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("spouse_name", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.spouse_nid_no ? errors.spouse_nid_no : ""}
                isInvalid={!!errors.spouse_nid_no}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Spouse NID No
                    {defaultValidation?.spouse_nid_no?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter  Spouse NID No"
                type="text"
                value={form?.spouse_nid_no?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("spouse_nid_no", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.emergency_contact_name ? errors.emergency_contact_name : ""}
                isInvalid={!!errors.emergency_contact_name}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Emergency Contact Name
                    {defaultValidation?.emergency_contact_name?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Emergency Contact Name"
                type="text"
                value={form?.emergency_contact_name?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("emergency_contact_name", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.emergency_contact_no ? errors.emergency_contact_no : ""}
                isInvalid={!!errors.emergency_contact_no}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Emergency Contact Number
                    {defaultValidation?.emergency_contact_no?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Emergency Contact Number"
                type="number"
                value={form?.emergency_contact_no?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("emergency_contact_no", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={
                  errors.emergency_contact_relation ? errors.emergency_contact_relation : ""
                }
                isInvalid={!!errors.emergency_contact_relation}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Emergency Contact Relation
                    {defaultValidation?.emergency_contact_relation?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Emergency Contact Relation"
                type="text"
                value={form?.emergency_contact_relation?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("emergency_contact_relation", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.nominee ? errors.nominee : ""}
                isInvalid={!!errors.nominee}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Nominee
                    {defaultValidation?.nominee?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter  Nominee"
                type="text"
                value={form?.nominee?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("nominee", data);
                }}
              />
            </div>
          </CardBody>
        </Card>

        <Card id="Other-info">
          <CardBody>
            <h4 className="text-base font-bold text-center">Other Info</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-5">
            <Autocomplete
                isClearable
                className="text-dark dark:text-light font-medium"
                defaultItems={uroleid}
                errorMessage={errors.user_role_id ? errors.user_role_id : ""}
                isInvalid={!!errors.user_role_id}
                // isLoading={d_categories?.isLoading}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    User Role Id{" "}
                    {defaultValidation?.user_role_id?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="select your Blood Group"
                selectedKey={form?.user_role_id?.toString()}
                variant="bordered"
                onSelectionChange={(data) => {
                  handleChange("user_role_id", data ? data.toString() : "");
                }}
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>
              <Checkbox
                isSelected={Boolean(form?.status)}
                className="text-dark dark:text-light/70 font-medium"
                onValueChange={(data) => handleChange("status", data)}
              >
                <p className="text-dark dark:text-light/70 font-medium">Is Active?</p>
              </Checkbox>

              <div className="-mt-1">
                <label
                  className="font-medium text-dark/80 dark:text-light/80"
                  htmlFor="license_img"
                >
                  Signature{" "}
                  {defaultValidation?.signature?.is_required && (
                    <span className="text-danger">*</span>
                  )}
                </label>
                <div className="flex gap-x-2">
                  <input
                    accept="image/*"
                    className="text-dark/80 dark:text-light/80 w-full px-2 h-10 pt-1 border rounded-xl mt-1"
                    id="signature"
                    name="signature"
                    placeholder="Select a photo"
                    required={defaultValidation?.signature?.is_required}
                    type="file"
                    onChange={(event) =>
                      handleChange("signature", event.target?.files && event.target?.files[0])
                    }
                  />
                </div>
                <p className="text-danger text-xs">{errors.image ? errors.image : ""}</p>
              </div>

              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.additional_phone_no ? errors.additional_phone_no : ""}
                isInvalid={!!errors.additional_phone_no}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Additional Phone Number
                    {defaultValidation?.additional_phone_no?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Additional Phone Number"
                type="number"
                value={form?.additional_phone_no?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("additional_phone_no", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.dl_no ? errors.dl_no : ""}
                isInvalid={!!errors.dl_no}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    DL No
                    {defaultValidation?.dl_no?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter DL No"
                type="text"
                value={form?.dl_no?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("dl_no", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.office_address ? errors.office_address : ""}
                isInvalid={!!errors.office_address}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Office Address
                    {defaultValidation?.office_address?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Office Address"
                type="text"
                value={form?.office_address?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("office_address", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.department ? errors.department : ""}
                isInvalid={!!errors.department}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Department
                    {defaultValidation?.department?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Department"
                type="text"
                value={form?.department?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("department", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.designation ? errors.designation : ""}
                isInvalid={!!errors.designation}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Designation
                    {defaultValidation?.designation?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Designation"
                type="text"
                value={form?.designation?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("designation", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.emp_code ? errors.emp_code : ""}
                isInvalid={!!errors.emp_code}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Employ Code
                    {defaultValidation?.emp_code?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Employ Code"
                type="text"
                value={form?.emp_code?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("emp_code", data);
                }}
              />
              <div className="-mt-1">
                <label
                  className="font-medium text-dark/80 dark:text-light/80"
                  htmlFor="license_img"
                >
                  Employ Id Img{" "}
                  {defaultValidation?.emp_id_img?.is_required && (
                    <span className="text-danger">*</span>
                  )}
                </label>
                <div className="flex gap-x-2">
                  <input
                    accept="image/*"
                    className="text-dark/80 dark:text-light/80 w-full px-2 h-10 pt-1 border rounded-xl mt-1"
                    id="emp_id_img"
                    name="emp_id_img"
                    placeholder="Select a photo"
                    required={defaultValidation?.emp_id_img?.is_required}
                    type="file"
                    onChange={(event) =>
                      handleChange("emp_id_img", event.target?.files && event.target?.files[0])
                    }
                  />
                </div>
                <p className="text-danger text-xs">{errors.image ? errors.image : ""}</p>
              </div>

              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.mobile_verify ? errors.mobile_verify : ""}
                isInvalid={!!errors.mobile_verify}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Mobile Verify
                    {defaultValidation?.mobile_verify?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Mobile Verify"
                type="date"
                value={form?.mobile_verify?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("mobile_verify", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.email_verify ? errors.email_verify : ""}
                isInvalid={!!errors.email_verify}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Email Verify
                    {defaultValidation?.email_verify?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Email Verify"
                type="date"
                value={form?.email_verify?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("email_verify", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.document_verify ? errors.document_verify : ""}
                isInvalid={!!errors.document_verify}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Document Verify
                    {defaultValidation?.document_verify?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter  Document Verify"
                type="date"
                value={form?.document_verify?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("document_verify", data);
                }}
              />
             
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.joining_date ? errors.joining_date : ""}
                isInvalid={!!errors.joining_date}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Joining Date
                    {defaultValidation?.joining_date?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter  Joining Date"
                type="date"
                value={form?.joining_date?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("joining_date", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.exp_date ? errors.exp_date : ""}
                isInvalid={!!errors.exp_date}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Expiry Date
                    {defaultValidation?.exp_date?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter  exp_date"
                type="date"
                value={form?.exp_date?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("exp_date", data);
                }}
              />
              
            </div>
            <Textarea
                errorMessage={errors.comment ? errors.comment : ""}
                isInvalid={!!errors.comment}
                label={
                  <span className="font-semibold text-secondary dark:text-foreground">
                    Comment{" "}
                    {defaultValidation?.comment?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter your  Comment"
                type="text"
                className="text-secondary p-5 dark:text-light font-medium"
                value={form?.comment?.toString()}
                onValueChange={(data: any) => {
                  handleChange("comment", data);
                }}
                variant="bordered"
              />
          </CardBody>
        </Card>
        <Card id="login_credentials">
          <CardBody>
            <h4 className="text-base font-bold text-center">Login Credentials</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-5">
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.email ? errors.email : ""}
                isInvalid={!!errors.email}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Email
                    {defaultValidation?.email?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter Your email"
                type="email"
                value={form?.email?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("email", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.username ? errors.username : ""}
                isInvalid={!!errors.username}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Username
                    {defaultValidation?.username?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Enter  default username"
                type="text"
                value={form?.username?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("username", data);
                }}
              />
              <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.password ? errors.password : ""}
                isInvalid={!!errors.password}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Password
                    {defaultValidation?.password?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-dark dark:text-light/80 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-dark dark:text-light/80 pointer-events-none" />
                    )}
                  </button>
                }
                labelPlacement="outside"
                placeholder="Enter  default password"
                type={isVisible ? "text" : "password"}
                value={form?.password?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("password", data);
                }}
              />
               <Input
                className="text-dark dark:text-light font-medium"
                errorMessage={errors.password_confirmation ? errors.password_confirmation : ""}
                isInvalid={!!errors.password_confirmation}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Password Confirmation
                    {defaultValidation?.password_confirmation?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-dark dark:text-light/80 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-dark dark:text-light/80 pointer-events-none" />
                    )}
                  </button>
                }
                labelPlacement="outside"
                placeholder="Enter patron default password_confirmation"
                type={isVisible ? "text" : "password"}
                value={form?.password_confirmation?.toString()}
                variant="bordered"
                onValueChange={(data) => {
                  handleChange("password_confirmation", data);
                }}
              />
             
            </div>
          </CardBody>
        </Card>

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
            Create
          </Button>
        </div>
      </form>
    </section>
  );
};

export default UsersManage;
