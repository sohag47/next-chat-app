"use client";
import {EyeIcon} from "@/assets/icons/eye-icon";
import RTable from "@/components/table";
import {ETable} from "@/enums/tableMode";
import {IColumn} from "@/types/table";
import {Icon} from "@iconify/react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import useCurd from "@/hooks/useCurd";
import FormAddrole from "./form.role";
import {PlusIcon} from "@/assets/icons/plus-icon";
import {EditIcon} from "@/assets/icons/edit-icon";
import {DeleteIcon} from "@/assets/icons/delete-icon";
import {TRole} from "./type.role";
import {useAlert} from "@/hooks/useAlert";
import {useDeleteEventsMutation, useGetEventsMutation} from "@/app/library/store/mutation";
import {useDelete} from "@/hooks/useDelete";
import {TResponse} from "@/types/api-response.type";
import {EAlert} from "@/enums/alert";
import RSkeleton from "@/components/skeleton";
import moment from "moment";

const roleList = () => {
  const Alert = useAlert();
  const [pagination, setPagination] = useState([]);
  // const [getEvents, get_Events] = useGetEventsMutation();
  // const [deleteEvents, delete_Events] = useDeleteEventsMutation();

  const [isFormLoading, setFormLoading] = useState(false);
  const handleFormLoading = () => {
    setFormLoading((prev) => !prev);
  };
  const router = useRouter(); // next router

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [item, setItem] = useState<TRole>();

  const addItem = () => {
    setItem(undefined);
    onOpen();
  };

  const editItem = (tableRow: TRole) => {
    setItem({...tableRow});
    onOpen();
  };

  // use curd
  const {listState, setListState, addToList, updateToList, removeFromList} = useCurd<TRole>([]);
  // const {deletePopup} = useDelete(deleteEvents, removeFromList, "Delete", "id");

  // table columns
  const columns: IColumn[] = [
    {uid: "id", name: "ID", sortable: true},
    {uid: "sl", name: "SL"},
    {uid: "role_name", name: "Role Name", sortable: false},
    {uid: "actions", name: "Actions"},
  ];
  // render table
  const useRenderCell = () => {
    return React.useCallback(
      (tableData: TRole, columnKey: React.Key, index: number) => {
        const cellValue = tableData[columnKey as keyof TRole];

        switch (columnKey) {
          case "sl":
            return <span>{index + 1}</span>;

          case "actions":
            return (
              <div className="relative flex items-center gap-2">
                <Tooltip color="warning" content="Edit">
                  <Button
                    onClick={() => {
                      editItem(tableData);
                    }}
                    isIconOnly
                    aria-label="view-item"
                    color="warning"
                  >
                    <EditIcon className="w-6 h-6 text-light" />
                  </Button>
                </Tooltip>
                <Tooltip color="danger" content="Delete">
                  <Button
                    // onClick={() => deletePopup(tableData)}
                    isIconOnly
                    aria-label="view-item"
                    color="danger"
                  >
                    <DeleteIcon className="w-6 h-6 text-light" />
                  </Button>
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

  const add_new_button = (
    <Button
      className="dark:bg-secondary bg-primary text-light"
      endContent={<PlusIcon />}
      size="sm"
      onPress={addItem}
    >
      Add New
    </Button>
  );
  // const handleFetchData = async (PAGE_ID: any) => {
  //   try {
  //     const response = await getEvents(PAGE_ID).unwrap();
  //     const {success, data} = response as TResponse;
  //     if (success) {
  //       setListState(data?.data);
  //     }
  //   } catch (error: any) {
  //     Alert(EAlert.error, error?.message);
  //     console.log("error :>> ", error);
  //   }
  // };

  // useEffect(() => {
  //   handleFetchData(1);
  // }, []);

  // if (delete_Events?.isLoading) {
  //   return <RSkeleton numberOfSkeletons={3} />;
  // }

  return (
    <section>
      <div className="flex flex-wrap gap-3 items-center">
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

            <BreadcrumbItem>Role List</BreadcrumbItem>
          </Breadcrumbs>
        </header>
      </div>

      <div className="mt-3">
        <Card shadow="sm">
          <CardBody>
            <RTable
              TITLE={"Role List"}
              columns={columns ?? []}
              useRenderCell={useRenderCell}
              fetchData={listState ?? []}
              sortableColumn={true}
              INITIAL_VISIBLE_COLUMNS={["sl", "role_name", "actions"]}
              CUSTOM_BUTTON={add_new_button}
              SELECTION_MODE={ETable.none}
              // PAGINATION={pagination}
              // PAGE_ID={handleFetchData}
            />
          </CardBody>
        </Card>
      </div>

      <section id="form_modal">
        <Modal isOpen={isOpen} size={"xl"} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Create Role</ModalHeader>
                <ModalBody>
                  <FormAddrole
                    addToList={addToList}
                    item={item}
                    updateToList={updateToList}
                    onClose={onClose}
                    handleFormLoading={handleFormLoading}
                  />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </section>
    </section>
  );
};

export default roleList;
