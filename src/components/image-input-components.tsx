import {CameraIcon} from "@/assets/icons/camera-icon";
import {Avatar} from "@nextui-org/react";
type IImageInputProps = {
  name: string;
  errors: any;
  form: any;
  handleChange: (name: string, value: any) => void;
};
export const ImageInputComponents = (props: IImageInputProps) => {
  return (
    <div className="-mt-10 flex justify-end">
      <label className="font-medium text-dark/80 dark:text-light/80" htmlFor="photo">
        <Avatar
          color={errors[`${name}`] ? "danger" : "default"}
          size="sm"
          isBordered
          showFallback
          src={form?.profile_img ? URL.createObjectURL(form?.profile_img) : ""}
          fallback={
            <CameraIcon
              className="animate-pulse w-5 h-5 text-default-500"
              fill="currentColor"
              size={20}
            />
          }
          className="w-20 h-20 text-large"
        />
        Profile Image{" "}
        {/* {defaultValidation?.profile_img?.is_required && <span className="text-danger">*</span>} */}
        {/* <p className="text-danger text-xs -ml-10">{errors.profile_img ? errors.profile_img : ""}</p> */}
      </label>
      <div className="flex gap-x-2">
        <input
          accept="image/*"
          className="text-dark/80 hidden dark:text-light/80 w-full px-2 h-10 pt-1 border rounded-xl mt-1"
          id="photo"
          name="profile_img"
          type="file"
          onChange={(event) =>
            handleChange("profile_img", event.target?.files && event.target?.files[0])
          }
        />
      </div>
    </div>
  );
};
