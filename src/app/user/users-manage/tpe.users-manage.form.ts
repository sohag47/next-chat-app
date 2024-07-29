import { MouseEventHandler } from "react";

export type TUsersManage = {
    id?: number;
    first_name: string;
    middle_name: string;
    profile_img?: string;
    surname: string;
    gender: string;
    salutation: string;
    phone: number | string;
    dob: string;
    blood_group: string;
    nationality: string;
    present_address: string;
    permanent_address: string;
    mailing_address: string;
    student_class: string;
    profession: string;
    grade: string;
    //document
    nid_no: string;
    nid_img: string;
    birth_certificate_no: string;
    birth_certificate_img: string;
    passport_no: string;
    passport_img: string;
    student_id: string;
    student_id_img: string;
    //Other info
    user_role_id: number | string;
    status: number | string;
    signature: string;
    additional_phone_no: string;
    dl_no: string;
    office_address: string;
    department: string;
    designation: string;
    emp_code: string;
    emp_id_img: string;
    fathers_name: string;
    fathers_nid_no: string;
    mothers_name: string;
    mothers_nid_no: string;
    spouse_name: string;
    spouse_nid_no: string;
    emergency_contact_name: string;
    emergency_contact_no: string;
    emergency_contact_relation: string;
    nominee: string;
    mobile_verify: string;
    email_verify: string;
    document_verify: string;
    // verified_by: string;
    joining_date: string;
    exp_date: string;
    comment: string;
    //Login Credentials
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
    //Login Credentials End
    
  
  
    // not used in patron form
    
  };
  
  
  export type TPatronProps = {
    item?: TUsersManage;
    addToList: (newData: TUsersManage | any) => void;
    updateToList: (modifiedData: TUsersManage | any) => void;
    onClose: MouseEventHandler<HTMLButtonElement>;
    handleFormLoading: (isFormLoading: boolean) => void;
  };
  
  
  // export type TUsersManageDynamicFields = {
  //   id: number;
  //   group_id: number;
  //   category_id: number;
  //   param_id: number;
  //   sort_by: number;
  
  //   title: string;
  //   type: string;
  //   param: string;
  //   is_required: number | boolean;
  // }
  
  // export type TUsersManageDynamicSortedFields = {
  //   [key: string | number]: TUsersManageDynamicFields[]
  // }