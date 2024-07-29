export type TAdditionalInfo = {
  fathers_name: string;
  mothers_name: string;
  additional_phone_no: string;
  birth_certificate_img: string;
  birth_certificate_no: string;
  blood_group: string;
  comment: string;
  department: string;
  dl_img: string;
  dl_no: string;
  document_verify: string;
  email_verify: string;
  emergency_contact_name: string;
  emergency_contact_no: string;
  emergency_contact_relation: string;
  emp_code: string;
  emp_id_img: string;
  exp_date: string;
  fathers_nid_no: string;
  grade: string;
  institution_name: string;
  joining_date: string;
  mailing_address: string;
  mobile_verify: string;
  designation: string;
  mothers_nid_no: string;
  nationality: string;
  nid_img: string;
  nid_no: string;
  office_address: string;
  passport_img: any;
  passport_no: string;
  permanent_address: string;
  present_address: string;
  present_professionaddress: string;
  profile_img: any;
  signature: any;
  spouse_name: string;
  spouse_nid_no: string;
  student_class: string;
  student_id: string;
  student_id_img: string;
  nominee: string;
  profession: string;
}
export type TServices = {
  name: string;
  service: string;
}
export type TUserProfile = {
    id?: number;
    first_name: string;
    middle_name: string;
    // profile_img?: string;
    surname: string;
    gender: string;
    salutation: string;
    phone: number | string;
    dob: string;
    services:TServices;
    //document
  
    
    additional_info: TAdditionalInfo;
    //Other info
    user_role_id: number | string;
    status: number | string;
    
    // verified_by: string;
   
  
   
    //Login Credentials
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
  }