type IDashboard = {
  icon: string;
  // img: string | any;
  name: string;
  link: string;
}[];

export const dashboardData: IDashboard = [
  {
    icon: "solar:document-add-bold-duotone",
    // img: images.libmaster_library_1,
    name: "LIBRARY MANAGEMENT",
    link: "/library",
  },
  {
    icon: "solar:notebook-bold-duotone",
    // img: images.libmaster_library_2,
    name: "E-BOOK MANAGEMENT",
    link: "/e-book",
  },
  {
    icon: "solar:notebook-bookmark-bold-duotone",
    // img: images.libmaster_library_3,
    name: "NEWS MANAGEMENT",
    link: "/news",
  },
  {
    icon: "solar:bag-2-bold-duotone",
    // img: images.libmaster_library_4,
    name: "BAG MANAGEMENT",
    link: "/bag",
  },
  {
    icon: "solar:users-group-two-rounded-bold-duotone",
    // img: images.libmaster_library_5,
    name: "VISITOR MANAGEMENT",
    link: "/visitor",
  },
  {
    icon: "solar:documents-bold-duotone",
    // img: images.libmaster_library_6,
    name: "DOCUMENT MANAGEMENT",
    link: "/document",
  },
  {
    icon: "icon-park-twotone:school",
    // img: images.libmaster_library_7,
    name: "INSTITUTIONAL REPOSITORY",
    link: "/institution",
  },
  {
    icon: "bi:journal-richtext",
    // img: images.libmaster_library_8,
    name: "JOURNAL MANAGEMENT",
    link: "/journal",
  },
  {
    icon: "fa6-solid:users-gear",
    // img: images.libmaster_library_9,
    name: "USER MANAGEMENT",
    link: "/user",
  },
  {
    icon: "solar:user-id-bold-duotone",
    // img: images.libmaster_library_10,
    name: "ID MANAGEMENT",
    link: "/id",
  },
];
