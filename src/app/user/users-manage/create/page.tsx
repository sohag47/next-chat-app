"use client";
import {Icon} from "@iconify/react";
import {BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import FormAddUsersManage from "../form.users-manage";

const AddUsersManage: React.FC = () => {
  return (
    <section>
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <header>
          <Breadcrumbs
            className="text-dark dark:text-light font-medium"
            radius="sm"
            underline="hover"
            variant="solid"
          >
            <BreadcrumbItem>
              <Link href="/admin">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>Add User</BreadcrumbItem>
          </Breadcrumbs>
        </header>
        <h4 className="text-base font-bold">Create a new User</h4>
        <Button size="sm" color="default" as={Link} href="/user/users-manage">
          <Icon icon="solar:arrow-left-bold" width={20} height={20} />
          Go to User list
        </Button>
      </div>

      <div className="mt-3">
        <Card shadow="sm">
          <CardBody>
            <FormAddUsersManage />
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default AddUsersManage;
