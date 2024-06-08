import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
// import { ProtectedRoute } from "./protectedRoute";
import App from "../App";
import LoadData from "../pages/LoadData2";
import { ProtectedRoute } from "./ProtectedRoutes";
import ForgotPassword from "../pages/Auth/ForgotPassword";

// Lazy Loading all the pages
const LandingPage = lazy(():any => import("../pages/Landing"));
const NotFound = lazy(():any => import("../pages/NotFound"));
const Loader = lazy(():any => import("../components/Loader"));
const Roadmap = lazy(():any=> import("../pages/RoadMap"))
const ContactUs = lazy(():any=> import("../pages/ContactUs"))
const Network = lazy(():any=> import("../pages/Network"))
const Login = lazy(():any=>import ("../pages/Auth/Login"));
const SignUp = lazy(():any=>import("../pages/Auth/SignUp"));
const VerifyOTP = lazy(():any=>import("../pages/Auth/OTP"));

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
          <Suspense fallback={<Loader />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "/roadmaps",
        element: (
          <Suspense fallback={<Loader />}>
            <Roadmap/>
          </Suspense>
        ),
      },
      {
        path: "/contactus",
        element: (
          <Suspense fallback={<Loader />}>
            <ContactUs/>
          </Suspense>
        ),
      },
      {
        path: "/network",
        element: (
          <Suspense fallback={<Loader />}>
            <Network/>
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login/>
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Loader />}>
            <SignUp/>
          </Suspense>
        ),
      },
      {
        path: "/loaddata",
        element: (
          <ProtectedRoute>
          <Suspense fallback={<Loader />}>
            <LoadData/>
          </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path:"/verifyOTP", 
        element:(
          <Suspense fallback={<Loader/>}>
            <VerifyOTP/>

          </Suspense>
        )
      },
      {
        path:"/resetPassword", 
        element:(
          <Suspense fallback={<Loader/>}>
            <ForgotPassword/>
          </Suspense>
        )
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
export default router;
