"use client";
import {EyeIcon} from "@/assets/icons/eye-icon";
import RTable from "@/components/table";
import {ETable} from "@/enums/tableMode";
import {IColumn} from "@/types/table";
import {Icon} from "@iconify/react";
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {TPatronList} from "./type.users-manage.list";
import useCurd from "@/hooks/useCurd";
// import {useGetPatronMutation} from "../../store/mutation";
import {useAlert} from "@/hooks/useAlert";
import {EAlert} from "@/enums/alert";
import {TError, TResponse} from "@/types/api-response.type";
import { useGetUserListMutation } from "../store/mutation";
// import {PatronStatusEnum} from "../../enums/enum.patron-status";

const usersmanageliste = () => {
  const router = useRouter();
  const Alert = useAlert();

  // redux component
  const [getUserList, record_list] = useGetUserListMutation();

  // local state
  const {listState, setListState, removeFromList} = useCurd<TPatronList>([]);
  const [pagination, setPagination] = useState([]);

  // table columns
  const columns: IColumn[] = [
    {uid: "id", name: "ID", sortable: true},
    {uid: "sl", name: "SL"},
    {uid: "name", name: "Name", sortable: false},
    {uid: "email", name: "Email", sortable: false},
    {uid: "phone", name: "Phone", sortable: false},
    {uid: "gender", name: "Gender", sortable: false},
    {uid: "dob", name: "Date of Birth", sortable: false},
    {uid: "member_card_no", name: "Member Card", sortable: false},
    {uid: "status", name: "Status", sortable: false},
    {uid: "actions", name: "Actions"},
  ];
  // render table
  const useRenderCell = () => {
    return React.useCallback(
      (tableData: TPatronList, columnKey: React.Key, index: number) => {
        const cellValue = tableData[columnKey as keyof TPatronList];

        switch (columnKey) {
          case "sl":
            return <span>{index + 1}</span>;
          case "name":
            return (
              <div className="flex gap-3 items-center">
                <Avatar
                  size="sm"
                  src={
                    tableData?.profile_img && `${process.env.ASSET_URL}${tableData?.profile_img}`
                  }
                  alt="Patron Images"
                />
                <span>
                  {`${tableData?.salutation ? `${tableData?.salutation}.` : ""} ${tableData?.first_name ?? ""}
                  ${tableData?.middle_name ?? ""}`}
                </span>
              </div>
            );
          case "member_card_no":
            return <span>{tableData?.member_card_no ?? "N/A"}</span>;
          // case "status":
          //   return (
          //     <Chip className="capitalize" color="primary" variant="flat" size="sm">
          //       {PatronStatusEnum[tableData.status]}
          //     </Chip>
          //   );
          case "actions":
            return (
              <div className="relative flex items-center gap-2">
                <Tooltip color="warning" content="Profile">
                  <Link href={`/user/users-manage/${tableData?.uuid}`}>
                    <Button isIconOnly aria-label="view-item" color="warning">
                      <EyeIcon className="w-6 h-6 text-light" />
                    </Button>
                  </Link>
                </Tooltip>
              </div>
            );
          default:
            return cellValue;
        }
      },
      [listState],
    );
  };

  const handleFetchData = async (PAGE_ID: any) => {
    try {
      const response = await getUserList(PAGE_ID).unwrap();
      const {success, data} = response as TResponse;
      if (success) {
        setPagination(data);
        setListState(data?.data);
      }
    } catch (error: any) {
      Alert(EAlert.error, error?.message);
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    handleFetchData(1);
  }, []);

 

  return (
    <section>
      

      <div className="">
        <Card shadow="sm">
          <CardBody>
          <div className=" flex-wrap pb-3 items-center grid justify-items-end">
        <Button size="sm" color="default" as={Link} href="/user/users-manage/create">
          <Icon icon="solar:arrow-left-bold" width={20} height={20} />
          Add Users Manage
        </Button>
      </div>
            <RTable
              TITLE={"Patron List"}
              columns={columns ?? []}
              useRenderCell={useRenderCell}
              fetchData={listState ?? []}
              sortableColumn={true}
              INITIAL_VISIBLE_COLUMNS={[
                "sl",
                "name",
                "email",
                "phone",
                "gender",
                "dob",
                "member_card_no",
                "status",
                "actions",
              ]}
              // CUSTOM_BUTTON={add_new_button}
              SELECTION_MODE={ETable.none}
              PAGINATION={pagination}
              PAGE_ID={handleFetchData}
            />
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default usersmanageliste;
