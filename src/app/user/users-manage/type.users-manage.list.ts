export type TPatronList = {
    id?: number;
    uuid: string;
    salutation: string;
    first_name: string;
    middle_name: string;
    email: string;
    phone: string;
    status: number;
    gender: string;
    dob: string;
    member_card_no: string;
    profile_img: string;
  };
  export type TPatronSearch = {
    id?: number;
    patron_category?: string;
    name?: string;
    email?: string;
    contact_no?: string;
  };
  