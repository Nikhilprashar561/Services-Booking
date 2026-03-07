import express from "express";
import {
  adminDeatils,
  allBookingListDeatils,
  allCustomerDeatils,
  allLocalProviderDeatils,
  findCustomerByCategory,
  findCustomerCurrentBookingRequest,
  findCustomerServicesHistory,
  findLocalProviderCurrentBookingRequest,
  findLocalProviderServicesHistory,
  localProviderByCategory,
} from "../controller/getApi.js";

const getApiRouter = express.Router();

getApiRouter.route("/adminDetails").get(adminDeatils);

getApiRouter.route("/allLocalProvider").get(allLocalProviderDeatils);
getApiRouter.route("/allCustomer").get(allCustomerDeatils);
getApiRouter.route("/allBookingList").get(allBookingListDeatils);
getApiRouter.route("/localProviderByCategory").get(localProviderByCategory);
getApiRouter.route("/findCustomerByCategory").get(findCustomerByCategory);
getApiRouter
  .route("/findLocalProviderCurrentBooking")
  .get(findLocalProviderCurrentBookingRequest);
getApiRouter
  .route("/findCustomerCurrentBooking")
  .get(findCustomerCurrentBookingRequest);
getApiRouter
  .route("/findCustomerBookingHistory")
  .get(findCustomerServicesHistory);
getApiRouter
  .route("/findLocalBookingHistory")
  .get(findLocalProviderServicesHistory);

export { getApiRouter };
