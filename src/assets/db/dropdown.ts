export const dropdownTriggers = [
  {
    img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    name: "Tony Reichert",
    description: "tonyreichert@gmail.com",
  },
];

const handleLogout = () => {
  console.log("Logout");
};

export const dropdownItems = [
  {item: "My Profile", link: "/profile"},
  {item: handleLogout, name: "Logout"},
];

const dropdownData = {
  dropdownTriggers,
  dropdownItems,
};

export default dropdownData;
