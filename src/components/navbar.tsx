"use client";
import {Icon} from "@iconify/react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import {useDispatch} from "react-redux";

import images from "@/app/images";
import counterSlice from "@/app/library/store/counterSlice";
import {useAppSelector} from "@/redux/selector";
import Image from "next/image";
import {ThemeSwitcher} from "./theme-switcher";
import {logout} from "@/app/auth/store/action";
import {useEffect, useState} from "react";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {useAlert} from "@/hooks/useAlert";
import useAuth from "@/hooks/useAuth";
import {EAlert} from "@/enums/alert";
import {useRouter} from "next/navigation";
import {setSelfLibraryInfo, shareableSelector} from "@/redux/shared/action";
import Link from "next/link";
import {DeleteIcon} from "@/assets/icons/delete-icon";
import {EditIcon} from "@/assets/icons/edit-icon";
import {EyeIcon} from "@/assets/icons/eye-icon";

const Navbar = ({service, info}: {service: string; info: string}) => {
  const router = useRouter();
  const Alert = useAlert();
  const dispatch = useDispatch();
  const {removeAuthInfo, setAuthState} = useAuth();

  const {setMenuToggle} = counterSlice.actions;

  const [selected, setSelected] = useLocalStorage("self_library");
  const {menuToggle} = useAppSelector((state) => state.counter);
  const {user, is_loggedIn} = useAppSelector((state) => state.authSlice);
  const {auth} = useAppSelector(shareableSelector);
  const handleSidebar = () => {
    dispatch(setMenuToggle(!menuToggle));
  };

  const signOut = () => {
    dispatch(logout());
    removeAuthInfo();
    Alert(EAlert.success, "Logout Successfully");
    router.push("/auth/login");
  };

  useEffect(() => {
    if (!auth?.id) {
      dispatch(setSelfLibraryInfo(selected));
    }
  }, [selected, auth]);

  useEffect(() => {
    if (is_loggedIn === false) {
      setAuthState();
    }
  }, [is_loggedIn]);

  return (
    <section className="bg-primary dark:bg-dark fixed w-full z-50">
      <div className="flex flex-wrap justify-between items-center font-medium text-light p-3 text-base">
        <div className="flex items-center gap-3">
          <Image src={images.libmaster_logo} alt="libmaster-logo" width={180} height={35} />
          <Button
            isIconOnly
            className="text-light"
            size="sm"
            variant="light"
            onClick={handleSidebar}
          >
            <Icon height={20} icon="ic:round-menu" width={20} />
          </Button>
        </div>
        <p className="text-base">
          <span>{auth?.library?.name ?? ""}</span>(<span>{auth?.library?.code ?? ""}</span>) |
          <span>{auth?.library?.thana ? ` ${auth?.library?.thana},` : ""}</span>
          <span>{auth?.library?.district ? `${auth?.library?.district},` : ""}</span>
          <span>{auth?.library?.division ? `${auth?.library?.division}` : ""}</span>
        </p>

        <div className="">
          <div className="flex gap-3 items-center justify-between">
            <ThemeSwitcher />
            <Dropdown
              placement="bottom-start"
              className="bg-background border-1 border-default-200"
            >
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: "/images/library-dashboard-missile.png",
                    fallback: "/images/library-dashboard-missile.png",
                  }}
                  className="transition-transform text-light"
                  name={auth?.name ?? ""}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="bordered" color="primary">
                <DropdownSection title="Actions" showDivider>
                  <DropdownItem
                    as={Link}
                    key="profile"
                    href={`/library/patrons/0`}
                    description="Show Your Details Profile"
                    startContent={<EyeIcon className="w-5 h-5" />}
                  >
                    My Profile
                  </DropdownItem>
                  <DropdownItem
                    key="password"
                    description="Change Your Current Password"
                    startContent={<EditIcon className="w-5 h-5" />}
                  >
                    Change Password
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Danger zone">
                  <DropdownItem
                    onClick={signOut}
                    key="logout"
                    color="danger"
                    variant="bordered"
                    className="text-danger"
                    description="Logout this session"
                    startContent={<DeleteIcon className="w-5 h-5" />}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
