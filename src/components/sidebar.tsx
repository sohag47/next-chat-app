/* eslint-disable no-undef */
"use client";
import {Icon} from "@iconify/react";
import {
  Accordion,
  AccordionItem,
  AccordionItemIndicatorProps,
  Button,
  Chip,
  ScrollShadow,
  User,
} from "@nextui-org/react";
import Link from "next/link";
import {useEffect, useState} from "react";

import {default_sidebar, library_sidebar, user_sidebar,ebook_sidebar} from "@/assets/db/sidebar";
import {NavLink} from "@/components/nav-link";
import {useAppSelector} from "@/redux/selector";
import {useDispatch} from "react-redux";
import {logout} from "@/app/auth/store/action";
import useAuth from "@/hooks/useAuth";
import {useAlert} from "@/hooks/useAlert";
import {EAlert} from "@/enums/alert";
import {useRouter} from "next/navigation";

export default function RSidebar({sidebar}: {sidebar: string}) {
  const router = useRouter();
  const Alert = useAlert();
  const dispatch = useDispatch();
  const {removeAuthInfo} = useAuth();

  const {menuToggle} = useAppSelector((state) => state.counter);
  const [isMobile, setIsMobile] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const isDesktopView = window?.innerWidth >= 720;

    if (!initialized) {
      setIsMobile(!isDesktopView);
      setInitialized(true);
    }

    const handleResize = () => {
      const mobile = window.innerWidth < 720;

      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [initialized]);

  let sidebar_data = default_sidebar;

  if (sidebar === "library" && Array.isArray(library_sidebar)) {
    sidebar_data = library_sidebar;
  } else if (sidebar === "user" && Array.isArray(user_sidebar)) {
    sidebar_data = user_sidebar;
  }
   else if (sidebar === "e-book" && Array.isArray(ebook_sidebar)) {
    sidebar_data = ebook_sidebar;
  }

  return (
    <section className="z-40">
      {menuToggle && (
        <section
          className={`2xl:min-w-72 2xl:max-w-72 lg:min-w-60 lg:max-w-60 ${
            isMobile ? `absolute z-30` : ""
          }`}
        >
          <aside
            className={`bg-primary dark:bg-dark min-h-screen 2xl:min-w-72 2xl:max-w-72 lg:min-w-60 lg:max-w-60 fixed p-3 duration-300 ${
              menuToggle ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="md:pt-14 pt-20">
              <Button
                as={Link}
                className="w-full font-medium bg-foreground dark:bg-secondary text-light flex justify-start text-base"
                href="/"
                variant="bordered"
                radius="sm"
              >
                <Icon height={20} icon="akar-icons:arrow-back" width={20} />
                <p>Main Menu</p>
              </Button>
            </div>
            {
              <ScrollShadow className="w-full h-[78vh] overflow-auto my-3 pr-1">
                {sidebar_data?.map(
                  ({name, access_permission, icon, id, link, submenu, badge}, index) => {
                    return (
                      <div key={index} className="mt-2 w-full">
                        {submenu?.length
                          ? access_permission && (
                              <Accordion
                                className="text-base border-light/30 drop-shadow-2xl"
                                variant={"bordered"}
                              >
                                <AccordionItem
                                  key={id}
                                  aria-label={`${id}`}
                                  className="font-normal text-xs text-light"
                                  indicator={(props: AccordionItemIndicatorProps) => {
                                    const {isOpen} = props;
                                    return isOpen ? (
                                      <Icon
                                        className="!text-light w-5 h-5"
                                        height={20}
                                        icon="lucide:chevron-down"
                                        width={20}
                                      />
                                    ) : (
                                      <Icon
                                        className="!text-light w-5 h-5"
                                        height={20}
                                        icon="lucide:chevron-up"
                                        width={20}
                                      />
                                    );
                                  }}
                                  startContent={
                                    <Icon
                                      className="drop-shadow-2xl w-5 h-5"
                                      height={20}
                                      icon={icon}
                                      width={20}
                                    />
                                  }
                                  title={
                                    <div className="flex items-center">
                                      <h1 className="text-light capitalize text-sm drop-shadow-2xl">
                                        {name}
                                      </h1>
                                      {/* {badge && (
                                        <Chip size="sm" variant="flat" color="default">
                                          {badge}
                                        </Chip>
                                      )} */}
                                    </div>
                                  }
                                >
                                  {submenu &&
                                    submenu?.map(
                                      ({name, access_permission, link, badge}, index) => {
                                        return (
                                          access_permission && (
                                            <NavLink
                                              key={index}
                                              exact
                                              className="bg-light text-secondary dark:bg-secondary dark:text-light flex mt-1 gap-3 items-center w-full capitalize justify-start shadow drop-shadow mx-auto text-sm border-light/30"
                                              href={link}
                                            >
                                              <p className="whitespace-break-spaces py-3">
                                                {name}
                                                {badge && (
                                                  <Chip size="sm" variant="flat" color="danger">
                                                    {badge}
                                                  </Chip>
                                                )}
                                              </p>
                                            </NavLink>
                                          )
                                        );
                                      },
                                    )}
                                </AccordionItem>
                              </Accordion>
                            )
                          : access_permission && (
                              <div className="rounded-xl w-full">
                                <NavLink
                                  exact
                                  className="text-light flex gap-3 items-center w-full capitalize py-6 justify-start shadow drop-shadow mx-auto text-sm border-light/30"
                                  href={link}
                                >
                                  <Icon height={20} icon={icon} width={20} />
                                  <p>{name}</p>
                                </NavLink>
                              </div>
                            )}
                      </div>
                    );
                  },
                )}
              </ScrollShadow>
            }
          </aside>
        </section>
      )}
    </section>
  );
}
