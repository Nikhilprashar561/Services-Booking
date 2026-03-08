import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import AdminProfilePage from "../pages/AdminProfilePage";
import AdminRegister from "../pages/AdminRegister";
import Home from "../pages/Home";
import BookingDashboard from "../pages/BookingDashboard";
import BookingRequest from "../pages/BookingRequest";
import CustomerProfilePage from "../pages/CustomerProfilePage";
import CustomerRegister from "../pages/CustomerRegister";
import LocalProviderPage from "../pages/LocalProviderPage";
import LocalProviderRegister from "../pages/LocalProviderRegister";
import AdminLoginPage from "../pages/AdminLoginPage";
import LocalProviderLogin from "../pages/LocalProviderLogin";
import CustomerLogin from "../pages/CustomerLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "admin",
        element: <AdminProfilePage />,
      },
      {
        path: "admin-register",
        element: <AdminRegister />,
      },
      {
        path: "booking-dashboard",
        element: <BookingDashboard />,
      },
      {
        path: "booking-request",
        element: <BookingRequest />,
      },
      {
        path: "user-profile",
        element: <CustomerProfilePage />,
      },
      {
        path: "user-register",
        element: <CustomerRegister />,
      },
      {
        path: "localProvider-profile",
        element: <LocalProviderPage />,
      },
      {
        path: "localProvider-register",
        element: <LocalProviderRegister />,
      },
      {
        path: "admin-login",
        element: <AdminLoginPage />,
      },
      {
        path: "localProvider-login",
        element: <LocalProviderLogin />,
      },
      {
        path: "customer-login",
        element: <CustomerLogin />,
      },
    ],
  },
]);

export { router };
