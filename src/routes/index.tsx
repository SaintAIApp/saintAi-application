import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
// import { ProtectedRoute } from "./protectedRoute";
import App from "../App";
import { ProtectedRoute } from "./ProtectedRoutes";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import SidebarLayout from "../layouts/SidebarLayout";
import DefaultLayout from "../layouts";
import LoadDataWrapper from "../components/LoadDataWrapper";

// Lazy Loading all the pages

const NotFound = lazy((): any => import("../pages/NotFound"));
const Loader = lazy((): any => import("../components/Loader"));
const VerifyOTP = lazy((): any => import("../pages/Auth/OTP"));
const WidgetsPage = lazy(()=>import("../pages/Widgets"));

const Pricing = lazy(()=>import("../pages/Pricing"))
const Mine = lazy(()=>import("../pages/Mine"))
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
          <SidebarLayout>
            <Suspense fallback={<Loader />}>
              <WidgetsPage />
            </Suspense>
          </SidebarLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <DefaultLayout>
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            </DefaultLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/pricing",
        element: (
          <DefaultLayout>
            <Suspense fallback={<Loader />}>
              <Pricing />
            </Suspense>
          </DefaultLayout>
        ),
      },
      {
        path: "/loaddata",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <LoadDataWrapper />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/mine",
        element: (
          <ProtectedRoute>
            <SidebarLayout>
              <Suspense fallback={<Loader />}>
                <Mine />
              </Suspense>
            </SidebarLayout>
          </ProtectedRoute>
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
export default router;
