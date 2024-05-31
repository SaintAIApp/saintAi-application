import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
// import { ProtectedRoute } from "./protectedRoute";
import App from "../App";
import LoadData from "../pages/LoadData";

// Lazy Loading all the pages
const LandingPage = lazy(():any => import("../pages/Landing"));
const NotFound = lazy(():any => import("../pages/NotFound"));
const Loader = lazy(():any => import("../components/Loader"));
const Roadmap = lazy(():any=> import("../pages/RoadMap"))
const ContactUs = lazy(():any=> import("../pages/ContactUs"))
const Network = lazy(():any=> import("../pages/Network"))
const Login = lazy(():any=>import ("../pages/Auth/Login"))
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
        path: "/loaddata",
        element: (
          <Suspense fallback={<Loader />}>
            <LoadData/>
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
