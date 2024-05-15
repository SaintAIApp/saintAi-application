import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
// import { ProtectedRoute } from "./protectedRoute";
import App from "../App";

// Lazy Loading all the pages
const LandingPage = lazy(() => import("../pages/Landing"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Loader = lazy(() => import("../components/Loader"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loader />}>
            <LandingPage />
          </Suspense>
        )
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ]
  }
]);
export default router;
