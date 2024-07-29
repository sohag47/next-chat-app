"use client";
import images from "@/app/images";
import {MailIcon} from "@/assets/icons/mail-icon";
import {EAlert} from "@/enums/alert";
import {useAlert} from "@/hooks/useAlert";
import {TResponse} from "@/types/api-response.type";
import {Icon} from "@iconify/react";
import {Button, Card, CardBody, CardHeader, Chip, Image as NextUIImage} from "@nextui-org/react";
import Image from "next/image";
import {useEffect, useState} from "react";

import RSkeleton from "@/components/skeleton";
import {TUserProfile} from "./type.user-profile";
import {useGetUserProfileMutation} from "../../store/mutation";

const Profile = ({params}: {params: {id: string}}) => {
  const Alert = useAlert();

  // redux hooks
  const [getUserProfile, record_details] = useGetUserProfileMutation();

  // local state
  const [userInfo, setUserInfo] = useState<TUserProfile | null>(null);

  const handleFetchData = async (uuid: string) => {
    try {
      const response = await getUserProfile({uuid}).unwrap();
      const {success, data} = response as TResponse;

      if (success) {
        console.log(data);
        setUserInfo(data);
      }
    } catch (error: any) {
      const {errors, message} = error as TResponse;
      Alert(EAlert.error, message);
    }
  };

  useEffect(() => {
    handleFetchData(params?.id);
  }, [params?.id]);

  if (record_details?.isLoading) {
    return <RSkeleton numberOfSkeletons={10} />;
  }
  return (
    <section>
      <div className="border-b shadow-md relative md:min-h-40 md:p-0 p-3 flex justify-center">
        <div className="flex md:flex-nowrap flex-wrap items-start gap-6 md:justify-center md:absolute top-3 w-11/12 mx-auto">
          <div className="border-4 border-primary min-w-64">
            <NextUIImage
              src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
              alt="profile"
              width={250}
              height={300}
              radius="none"
              isZoomed
            />
          </div>
          <div>
            <h1 className="font-bold text-dark text-xl mt-2">
              Name:{" "}
              {`${userInfo?.salutation ? `${userInfo?.salutation}.` : ""} ${userInfo?.first_name ?? ""}
                ${userInfo?.middle_name ?? ""} ${userInfo?.surname ?? ""}`}
            </h1>
            <div className="flex flex-wrap xl:gap-5 gap-3 items-center mt-5">
              <Chip
                size="lg"
                startContent={<Icon icon="solar:phone-bold-duotone" width="20" height="20" />}
                variant="flat"
                color="default"
                radius="sm"
              >
                <p className="text-base">{userInfo?.phone ?? ""}</p>
              </Chip>
              <Chip
                startContent={<MailIcon width="20" height="20" />}
                variant="flat"
                color="default"
                radius="sm"
                size="lg"
              >
                <p className="text-base">{userInfo?.email ?? ""}</p>
              </Chip>
            </div>
            <div className="flex gap-2 flex-wrap md:mt-20 mt-3">
              <Button
                size="sm"
                color="primary"
                variant="ghost"
                startContent={<Icon icon="ion:swap-vertical" className="w-5 h-5" />}
              >
                Upgrade Membership
              </Button>
              <Button
                size="sm"
                color="primary"
                variant="ghost"
                startContent={<Icon icon="ion:location-outline" className="w-5 h-5" />}
              >
                Change Address
              </Button>
              <Button
                size="sm"
                color="primary"
                variant="ghost"
                startContent={<Icon icon="ion:call-outline" className="w-5 h-5" />}
              >
                Change Phone Number
              </Button>
              <Button
                size="sm"
                color="primary"
                variant="ghost"
                startContent={<Icon icon="ion:card-outline" className="w-5 h-5" />}
              >
                Lost/ Damage/ Renew Card
              </Button>
              <Button
                size="sm"
                color="primary"
                variant="ghost"
                startContent={<Icon icon="ion:key-outline" className="w-5 h-5" />}
              >
                Change Password
              </Button>
              {/* <Chip
                size="lg"
                startContent={
                  <div className="flex items-center gap-0">
                    <Icon icon="lets-icons:arrow-top" width="20" height="20" />
                    <Icon icon="lets-icons:arrow-top" width="20" height="20" rotate="180deg" />
                  </div>
                }
                variant="bordered"
                color="primary"
                radius="sm"
              >
                <p className="text-base">Upgrade Membership</p>
              </Chip>
              <Chip
                startContent={
                  <Icon icon="solar:map-point-wave-bold-duotone" width="24" height="24" />
                }
                variant="bordered"
                color="primary"
                radius="sm"
                size="lg"
              >
                <p className="text-base">Change Address</p>
              </Chip>
              <Chip
                startContent={<Icon icon="solar:phone-bold-duotone" width="24" height="24" />}
                variant="bordered"
                color="primary"
                radius="sm"
                size="lg"
              >
                <p className="text-base">Change Phone Number</p>
              </Chip>
              <Chip
                startContent={<Icon icon="solar:user-id-broken" width="24" height="24" />}
                variant="bordered"
                color="primary"
                radius="sm"
                size="lg"
              >
                <p className="text-base">Lost/ Damage/ Renew Card</p>
              </Chip> */}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:mt-32 md:mt-52 mt-10 text-center">
        <h1 className="font-bold text-dark text-xl mt-2">User Profile</h1>
        {/* <div className="flex justify-center">
          <Image src={images.profile_line} alt="profile line image" />
        </div> */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-3 gap-3 items-center w-11/12 mx-auto">
          <Card shadow="sm" className="w-full min-h-80 md:mt-0 mt-3">
            <CardHeader>
              <h3 className="font-bold text-secondary">Personal Information</h3>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Name</p>
                  <p className="text-dark">
                    :{" "}
                    {`${userInfo?.salutation ? `${userInfo?.salutation}.` : ""} ${userInfo?.first_name ?? ""}
                ${userInfo?.middle_name ?? ""} ${userInfo?.surname ?? ""}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">NID No</p>
                  <p className="text-dark">:{userInfo?.additional_info?.nid_no ?? ""} </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Birth Certificate No</p>
                  <p className="text-dark">
                    :{userInfo?.additional_info?.birth_certificate_no ?? ""}{" "}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Passport No</p>
                  <p className="text-dark">: {userInfo?.additional_info?.nid_no ?? ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Student ID</p>
                  <p className="text-dark">:{userInfo?.additional_info?.passport_no ?? ""} </p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Phone Number</p>
                  <p className="text-dark">:{userInfo?.phone ?? ""} </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Gender</p>
                  <p className="text-dark">: {userInfo?.gender ?? ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Date Of Birth</p>
                  <p className="text-dark">: {userInfo?.dob ?? ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Blood Group</p>
                  <p className="text-dark">:{userInfo?.additional_info?.blood_group ?? ""} </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Nationality</p>
                  <p className="text-dark">:{userInfo?.additional_info?.nationality ?? ""} </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Present Address</p>
                  <p className="text-dark">:{userInfo?.additional_info?.present_address ?? ""} </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Permanent Address</p>
                  <p className="text-dark">
                    :{userInfo?.additional_info?.permanent_address ?? ""}{" "}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Mailing Address</p>
                  <p className="text-dark">: {userInfo?.additional_info?.mailing_address ?? ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Student Class</p>
                  <p className="text-dark">: {userInfo?.additional_info?.student_class ?? ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Profession</p>
                  <p className="text-dark">: {userInfo?.additional_info?.profession ?? ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Grade</p>
                  <p className="text-dark">:{userInfo?.additional_info?.grade ?? ""} </p>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card shadow="sm" className="w-full min-h-80 md:mt-0 mt-3">
            <CardHeader>
              <h3 className="font-bold text-secondary">Family and Other Information</h3>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Father Name</p>
                  <p className="text-dark">:{userInfo?.additional_info?.fathers_name ?? ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Fathers NID No</p>
                  <p className="text-dark">:{userInfo?.additional_info?.fathers_nid_no ?? ""} </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Mother Name</p>
                  <p className="text-dark">:{userInfo?.additional_info?.mothers_name ?? ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Mothers NID No</p>
                  <p className="text-dark">:{userInfo?.additional_info?.mothers_nid_no ?? ""} </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Spouse Name</p>
                  <p className="text-dark">:{userInfo?.additional_info?.spouse_name ?? ""} </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Spouse NID No</p>
                  <p className="text-dark">:{userInfo?.additional_info?.spouse_nid_no ?? ""} </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Emergency Contact Name</p>
                  <p className="text-dark">
                    : {userInfo?.additional_info?.emergency_contact_name ?? ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Emergency Contact No</p>
                  <p className="text-dark">
                    :{userInfo?.additional_info?.emergency_contact_no ?? ""}{" "}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Emergency Contact Relation</p>
                  <p className="text-dark">
                    :{userInfo?.additional_info?.emergency_contact_relation ?? ""}{" "}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Nominee</p>
                  <p className="text-dark">:{userInfo?.additional_info?.nominee ?? ""} </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">User Role Id</p>
                  <p className="text-dark">:{userInfo?.user_role_id ?? ""} </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Additional Phone Number</p>
                  <p className="text-dark">
                    :{userInfo?.additional_info?.additional_phone_no ?? ""}{" "}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Office Address</p>
                  <p className="text-dark">:{userInfo?.additional_info?.office_address ?? ""} </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Department</p>
                  <p className="text-dark">: {userInfo?.additional_info?.department ?? ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-dark min-w-32">Designation</p>
                  <p className="text-dark">: {userInfo?.additional_info?.designation ?? ""}</p>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card shadow="sm" className="w-full min-h-80 md:mt-0 mt-3">
            <CardHeader>
              <h3 className="font-bold text-secondary">Services</h3>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-1">
              
                {userInfo?.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    
                    <p className="text-dark">{`  ${index + 1}`} : {service.name}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Profile;
