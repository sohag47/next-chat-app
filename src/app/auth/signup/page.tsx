"use client";

import FormSkeleton from "@/components/form.skeleton";
import useForm, {IValidation} from "@/hooks/useForm";
import {useAppSelector} from "@/redux/selector";
import {setAuth, setIsLoggedIn, setLoading, shareableSelector} from "@/redux/shared/action";
import {Icon} from "@iconify/react";
import {Button, Input} from "@nextui-org/react";
import React from "react";
import {useDispatch} from "react-redux";

export default function Signup({socket}: any) {
  const dispatch = useDispatch();
  const {isLoading} = useAppSelector(shareableSelector);
  type TUser = {
    userName: string;
    roomId: number | string;
  };
  const defaultValues: TUser = {
    userName: "",
    roomId: "",
  };

  const defaultValidation: IValidation = {
    userName: {
      is_required: true,
      error_message: "userName is a required field",
    },
    roomId: {
      is_required: true,
      error_message: "roomId is a required field",
    },
  };

  const closeForm = () => {
    resetForm();
  };

  const onSubmit = (FORM_DATA: TUser) => {
    console.log("FORM_DATA :>> ", FORM_DATA);
    socket.emit("join_room", FORM_DATA.roomId);
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setAuth({user: FORM_DATA, isLoggedIn: true}));
    }, 4000);
  };

  const {form, resetForm, errors, setErrors, handleChange, handleSubmit} = useForm<TUser>({
    defaultValues,
    defaultValidation,
    onSubmit,
  });

  if (isLoading) {
    return <FormSkeleton />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <Input
          className="text-dark dark:text-light font-medium"
          errorMessage={errors.userName ? errors.userName : ""}
          isInvalid={!!errors.userName}
          label={
            <span className="text-dark dark:text-light font-medium">
              Username
              {defaultValidation?.userName?.is_required && <span className="text-danger">*</span>}
            </span>
          }
          labelPlacement="outside"
          placeholder="Enter Username"
          type="text"
          value={form?.userName?.toString()}
          variant="bordered"
          onValueChange={(data: any) => {
            handleChange("userName", data);
          }}
        />

        <Input
          className="text-dark dark:text-light font-medium"
          errorMessage={errors.roomId ? errors.roomId : ""}
          isInvalid={!!errors.roomId}
          label={
            <span className="text-dark dark:text-light font-medium">
              RoomId
              {defaultValidation?.roomId?.is_required && <span className="text-danger">*</span>}
            </span>
          }
          labelPlacement="outside"
          placeholder="Enter  Secrete Key"
          type="text"
          value={form?.roomId?.toString()}
          variant="bordered"
          onValueChange={(data: any) => {
            handleChange("roomId", data);
          }}
        />
      </div>

      <div className="flex flex-wrap justify-end gap-3 mt-3" id="buttons">
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
        <Button className="font-semibold" color="primary" radius="sm" type="submit" variant="solid">
          <Icon height={24} icon="ic:round-download-done" width={24} />
          Submit
        </Button>
      </div>
    </form>
  );
}
