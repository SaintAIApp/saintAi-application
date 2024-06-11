import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
// import { ProtectedRoute } from "./protectedRoute";
import App from "../App";
// import LoadData from "../pages/LoadData2";
import { ProtectedRoute } from "./ProtectedRoutes";
import ForgotPassword from "../pages/Auth/ForgotPassword";

// Lazy Loading all the pages
// const LandingPage = lazy(():any => import("../pages/Landing"));
const NotFound = lazy((): any => import("../pages/NotFound"));
const Loader = lazy((): any => import("../components/Loader"));

const Login = lazy((): any => import("../pages/Auth/Login"));
const SignUp = lazy((): any => import("../pages/Auth/SignUp"));
const LoadData = lazy((): any => import("../pages/LoadData2"));
const VerifyOTP = lazy((): any => import("../pages/Auth/OTP"));
const Pricing = lazy(()=>import("../pages/Pricing"))
const PaymentSuccess = lazy(
  (): any => import("../pages/Payment/PaymentSuccess")
);
const PaymentFailed = lazy((): any => import("../pages/Payment/PaymentFailed"));
const Profile = lazy(() => import("../pages/Profile"));

// const WidgetsPage = lazy(()=>import("../pages/Widgets"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
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
        path: "/login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Loader />}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "/loaddata",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <LoadData />
            </Suspense>
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
