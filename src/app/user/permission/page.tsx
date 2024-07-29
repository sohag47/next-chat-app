"use client";

import {Icon} from "@iconify/react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Textarea,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  CardBody,
  Card,
  Breadcrumbs,
  BreadcrumbItem,
  Spinner,
  Avatar,
} from "@nextui-org/react";
import React, {useEffect, useState} from "react";

import {EAlert} from "@/enums/alert";
import {useAlert} from "@/hooks/useAlert";
import useForm, {IValidation} from "@/hooks/useForm";
import {type IDropdown} from "@/types/idropdown";
import {TPermissionProps, TPermission, TPermissionForm} from "./type.permission";
import {TResponse} from "@/types/api-response.type";
import FormSkeleton from "@/components/form.skeleton";
import Link from "next/link";
import {
  useAddAssignServiceMutation,
  useDropdownSearchUsersMutation,
  useGetServiceMutation,
} from "../store/mutation";
import useFormatDropdown from "@/hooks/useFormatDropdown";
import useCurd from "@/hooks/useCurd";

const FormAddPermission = () => {
  const Alert = useAlert();
  const [addAssignService, insert_item] = useAddAssignServiceMutation();
  const [dropdownSearchUsers, D_users] = useDropdownSearchUsersMutation();
  const [getService, D_services] = useGetServiceMutation();

  //
  const [users, setUsers] = useState<IDropdown[]>([]);
  const {listState, setListState, removeFromList} = useCurd<TPermission>([]);
  const defaultValues: TPermissionForm = {
    user_id: "",
    service_id: [],
  };

  const defaultValidation: IValidation = {
    user_id: {
      is_required: true,
      error_message: "User ID is a required field",
    },
    service_id: {
      is_required: true,
      error_message: "service_id is a required field",
    },
  };
  const fetchUsersDropdown = async (search_data: string) => {
    try {
      if (search_data?.length > 3) {
        // type minimum 3 characters
        const response = await dropdownSearchUsers({search: search_data}).unwrap();
        const {success, data} = response as TResponse;
        if (success && data?.length > 0) {
          let format_data: IDropdown[] = [];
          data?.map((item: any) => {
            format_data.push({
              value: item?.id,
              label: `${item?.salutation ? `${item?.salutation}.` : ""}${item?.first_name ?? ""} ${item?.middle_name ?? ""}`,
            });
          });
          console.log("format_data", format_data);
          // let format_data = useFormatDropdown(data, "id", "username", );
          setUsers(format_data);
        }
      }
    } catch (error: any) {
      Alert(EAlert.error, error?.message);
      console.log("error :>> ", error);
    }
  };
  const fetchServices = async () => {
    try {
      const response = await getService("").unwrap();
      const {success, data} = response as TResponse;
      if (success && data?.length > 0) {
        let new_data: any[] = [];
        data?.map((item: any) => {
          if (item?.name === "library") {
            new_data.push({...item, icon: "solar:document-add-bold-duotone"});
          } else if (item?.name === "ebook") {
            new_data.push({...item, icon: "solar:notebook-bold-duotone"});
          } else if (item?.name === "news") {
            new_data.push({...item, icon: "solar:notebook-bookmark-bold-duotone"});
          } else if (item?.name === "bag") {
            new_data.push({...item, icon: "solar:bag-2-bold-duotone"});
          } else if (item?.name === "visitor") {
            new_data.push({...item, icon: "solar:users-group-two-rounded-bold-duotone"});
          } else if (item?.name === "id_card") {
            new_data.push({...item, icon: "solar:user-id-bold-duotone"});
          } else if (item?.name === "document") {
            new_data.push({...item, icon: "solar:documents-bold-duotone"});
          } else if (item?.name === "document") {
            new_data.push({...item, icon: "solar:documents-bold-duotone"});
          } else if (item?.name === "institution") {
            new_data.push({...item, icon: "icon-park-twotone:school"});
          } else if (item?.name === "journal") {
            new_data.push({...item, icon: "bi:journal-richtext"});
          } else if (item?.name === "user") {
            new_data.push({...item, icon: "fa6-solid:users-gear"});
          }
        });
        setListState(new_data);
      }
    } catch (error: any) {
      Alert(EAlert.error, error?.message);
      console.log("error :>> ", error);
    }
  };

  const closeForm = () => {
    resetForm();
  };

  const onSubmit = async (FORM_DATA: TPermissionForm): Promise<void> => {
    console.log("FORM_DATA :>> ", FORM_DATA);
    try {
      const response = await addAssignService(FORM_DATA).unwrap();
      const {success, message, data} = response as TResponse;

      if (success) {
        Alert(EAlert.success, message);
      }
    } catch (error: any) {
      const {success, message, data} = error as TResponse;
      setErrors({...errors});
      Alert(EAlert.error, message);
    }
  };

  const {form, resetForm, errors, setErrors, handleChange, handleSubmit} = useForm<TPermissionForm>(
    {
      defaultValues,
      defaultValidation,
      onSubmit,
    },
  );

  useEffect(() => {
    fetchServices();
  }, []);

  if (insert_item.isLoading) {
    return <FormSkeleton />;
  }
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
          <BreadcrumbItem>Permission Form</BreadcrumbItem>
        </Breadcrumbs>
      </section>
      <Card className="h-fit">
        <CardBody className="gap-3 h-fit">
          <form onSubmit={handleSubmit}>
            <section>
              {/* FIXME Dropdown Search problem */}
              <Autocomplete
                isClearable
                className="text-dark dark:text-light font-medium w-fit"
                defaultItems={users}
                errorMessage={errors.user_id ? errors.user_id : ""}
                isInvalid={!!errors.user_id}
                isLoading={D_users?.isLoading}
                label={
                  <span className="text-dark dark:text-light font-medium">
                    User
                    {defaultValidation?.user_id?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                labelPlacement="outside"
                placeholder="Search User"
                selectedKey={form?.user_id?.toString()}
                variant="bordered"
                onInputChange={(data) => fetchUsersDropdown(data)}
                onSelectionChange={(data) => {
                  handleChange("user_id", data ? data.toString() : "");
                }}
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>
            </section>

            <section className="mt-3">
              <CheckboxGroup
                label={
                  <span className="text-dark dark:text-light font-medium">
                    Select Services (Multiple)
                    {defaultValidation?.service_id?.is_required && (
                      <span className="text-danger">*</span>
                    )}
                  </span>
                }
                defaultValue={[""]}
                errorMessage={errors.service_id ? errors.service_id : ""}
                isInvalid={!!errors.service_id}
                value={form?.service_id}
                onValueChange={(data) => {
                  handleChange("service_id", data);
                }}
              >
                {" "}
                {D_services?.isLoading ? (
                  <Spinner />
                ) : (
                  listState?.length > 0 &&
                  listState.map((service) => (
                    <Checkbox value={service.id} className="capitalize">
                      <div className="flex gap-3 items-center">
                        <Icon icon={`${service?.icon}`} className="w-10 h-10" />
                        <span>{`${service.name}`}</span>
                      </div>
                    </Checkbox>
                  ))
                )}
              </CheckboxGroup>
            </section>

            <div className="flex flex-wrap justify-start gap-3 mt-3" id="buttons">
              <Button
                radius="sm"
                color="warning"
                type="reset"
                variant="solid"
                onClick={closeForm}
                className="font-semibold"
              >
                <Icon height={24} icon="majesticons:close-line" width={24} />
                Cancel
              </Button>
              <Button
                className="font-semibold"
                color="primary"
                radius="sm"
                type="submit"
                variant="solid"
              >
                <Icon height={24} icon="ic:round-download-done" width={24} />
                Submit
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default FormAddPermission;
