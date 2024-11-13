import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { ProtectedRoute } from "./protectedRoute";
import App from "../App";
import SidebarLayout from "../layouts/SidebarLayout";
import ForgotPassword from "../pages/Auth/ForgotPassword";

import LoadDataWrapper from "../components/LoadDataWrapper";

// Lazy Loading all the pages

const NotFound = lazy(() => import("../pages/NotFound"));
const Loader = lazy(() => import("../components/Loader"));
const VerifyOTP = lazy((): any => import("../pages/Auth/OTP"));
const WidgetsPage = lazy(() => import("../pages/Widgets"));

const Pricing = lazy(() => import("../pages/Pricing"));
const Mine = lazy(() => import("../pages/Mine"));
const PaymentSuccess = lazy(
  (): any => import("../pages/Payment/PaymentSuccess")
);
const PaymentFailed = lazy((): any => import("../pages/Payment/PaymentFailed"));
const Profile = lazy(() => import("../pages/Profile"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <SidebarLayout withChat chatOptions={{ chatOpenDefault: true, chatClassName: "pt-[10px] pb-2" }}>
            <Suspense fallback={<Loader />}>
              <WidgetsPage />
            </Suspense>
          </SidebarLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <SidebarLayout protectedRoute>
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          </SidebarLayout>
        ),
      },
      {
        path: "/pricing",
        element: (
          <Suspense fallback={<Loader />}>
            <Pricing />
          </Suspense>
        ),
      },
      {
        path: "/loaddata",
        element: (
          <Suspense fallback={<Loader />}>
            <LoadDataWrapper />
          </Suspense>
        ),
      },
      {
        path: "/mine",
        element: (
          <SidebarLayout withChat chatOptions={{ chatOpenDefault: true, chatClassName: "pt-[15px] pb-2" }}>
            <Suspense fallback={<Loader />}>
              <Mine />
            </Suspense>
          </SidebarLayout>
        ),
      },
      {
        path: "/verifyOTP",
        element: (
          <Suspense fallback={<Loader />}>
            <VerifyOTP />
          </Suspense>
        ),
      },
      {
        path: "/resetPassword",
        element: (
          <Suspense fallback={<Loader />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: "/payment/success",
        element: (
          <Suspense fallback={<Loader />}>
            <PaymentSuccess />
          </Suspense>
        ),
      },
      {
        path: "/payment/failed",
        element: (
          <Suspense fallback={<Loader />}>
            <PaymentFailed />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

// https://github.com/ArnaudBarre/eslint-plugin-react-refresh/issues/25
export const Routes = () => {
  return <RouterProvider router={router} />;
};
