export const baseUrl = "https://services-booking-wn4a.onrender.com/";

const ApiSummary = {
  adminRegister: {
    url: "/admin/register",
    method: "post",
  },
  adminLogin: {
    url: "/admin/login",
    method: "post",
  },
  adminLogout: {
    url: "/admin/logout",
    method: "get",
  },
  customerRegister: {
    url: "/user/register",
    method: "post",
  },
  customerLogin: {
    url: "/user/login",
    method: "post",
  },
  customerAddress: {
    url: "/user/address",
    method: "put",
  },
  customerLogout: {
    url: "/user/logout",
    method: "get",
  },
  customerBookingRequest: {
    url: "/user/bookingRequest",
    method: "post",
  },
  customerReview: {
    url: "/user/review",
    method: "post",
  },
  localProviderRegister: {
    url: "/localProvider/register",
    method: "post",
  },
  localProviderLogin: {
    url: "/localProvider/login",
    method: "post",
  },
  localProviderAddress: {
    url: "/localProvider/address",
    method: "put",
  },
  localProviderLogout: {
    url: "/localProvider/logout",
    method: "get",
  },
  localProviderIsAccept: {
    url: "/localProvider/is-accept",
    method: "put",
  },
  localProviderFinalPost: {
    url: "/localProvider/final-post",
    method: "get",
  },
};

export { ApiSummary };
