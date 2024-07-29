"use client";

import {useLocalStorage} from "@/hooks/useLocalStorage";
import {BreadcrumbItem, Breadcrumbs, Card, CardBody, Tab, Tabs} from "@nextui-org/react";
import Link from "next/link";
import {usePathname, useSearchParams, useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import ListUsersManage from "./list.users-manage";
import { useTabWithRouter } from "@/hooks/useTabWithRouter";


export default function UsersManage() {

  // const {selected, onTabChange} = useTabWithRouter(
  //   "pending",
  //   "/user/users-manage",
  // );

  return (
    <>
      <section id="header">
        <Breadcrumbs
          className="text-secondary dark:text-primary font-medium"
          underline={"hover"}
          variant={"solid"}
        >
          <BreadcrumbItem>
            <Link href="/">Main Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href="/user">User Dashboard</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Users List</BreadcrumbItem>
        </Breadcrumbs>
      </section>
      <section className="gap-10">
        <ListUsersManage />
        {/* <Tabs
          size="sm"
          color="primary"
          variant="bordered"
          selectedKey={selected}
          onSelectionChange={onTabChange}
          aria-label="User Manage Request Options"
        >
          <Tab key="pending" title="Pending">
            <ListUsersManage />
          </Tab>
          <Tab key="accepted" title="Accepted">
            <ListUsersManage />
          </Tab>
          <Tab key="Rejected" title="Rejected">
            <ListUsersManage />
          </Tab>
        </Tabs> */}
      </section>
    </>
  );
}
