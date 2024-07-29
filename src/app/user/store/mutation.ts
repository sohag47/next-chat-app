
const USER_SERVICE = `${process.env.BASE_URL}/users`;

import APIHeader from "@/redux/APIHeader";

const apiTag = APIHeader.enhanceEndpoints({
  addTagTypes: ["User"],
});

export const UserMutation = apiTag.injectEndpoints({
  endpoints: (builder) => ({
    // Dropdown

    dropdownSearchUsers: builder.mutation({
      query: (data: any) => ({
        url: `${USER_SERVICE}/search`,
        method: "POST",
        body: data
      }),
    }),
    // end
    getUserProfile: builder.mutation({
      query: (uuid: any) => ({
        url: `${USER_SERVICE}/profile-by-uuid`,
        method: "POST",
        body: uuid
      }),
    }),


    getUserList: builder.mutation({
      query: (data) => ({
        url: `${USER_SERVICE}/list`,
        method: "GET",
      }),
    }),
    addUsersRegister: builder.mutation({
      query: (data: any) => ({
        url: `${USER_SERVICE}/register`,
        method: "POST",
        body: data,
      }),
    }),
    //salutation
    getsalutation: builder.mutation({
      query: (data) => ({
        url: `${USER_SERVICE}/salutation`,
        method: "GET",
      }),
    }),
    addsalutation: builder.mutation({
      query: (data: any) => ({
        url: `${USER_SERVICE}/salutation`,
        method: "POST",
        body: data,
      }),
    }),
    updatesalutation: builder.mutation({
      query: (data: any) => ({
        url: `${USER_SERVICE}/salutation/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deletesalutation: builder.mutation({
      query: (data) => ({
        url: `${USER_SERVICE}/salutation/${data}`,
        method: "DELETE",
      }),
    }),
    //login-access-allowed
    getLoginAccess: builder.mutation({
      query: (data) => ({
        url: `${USER_SERVICE}/login-access-allowed`,
        method: "GET",
      }),
    }),
    addLoginAccess: builder.mutation({
      query: (data: any) => ({
        url: `${USER_SERVICE}/login-access-allowed`,
        method: "POST",
        body: data,
      }),
    }),
    updateLoginAccess: builder.mutation({
      query: (data: any) => ({
        url: `${USER_SERVICE}/login-access-allowed/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteLoginAccess: builder.mutation({
      query: (data) => ({
        url: `${USER_SERVICE}/login-access-allowed/${data}`,
        method: "DELETE",
      }),
    }),
    // user-users/service-list
    getService: builder.mutation({
      query: () => ({
        url: `${USER_SERVICE}/service-list`,
        method: "GET",
      }),
    }),

    // permission
    addAssignService: builder.mutation({
      query: (data: any) => ({
        url: `${USER_SERVICE}/assign-service`,
        method: "POST",
        body: data,
      }),
    }),

  })
})


export const {
  //Dropdown
  useDropdownSearchUsersMutation,
  //end
  useGetServiceMutation,

  useGetUserProfileMutation,
  useAddUsersRegisterMutation,
  useGetUserListMutation,
  //salutation
  useGetsalutationMutation,
  useAddsalutationMutation,
  useUpdatesalutationMutation,
  useDeletesalutationMutation,

  useGetLoginAccessMutation,
  useAddLoginAccessMutation,
  useUpdateLoginAccessMutation,
  useDeleteLoginAccessMutation,
  //permission
  useAddAssignServiceMutation,
} = UserMutation;