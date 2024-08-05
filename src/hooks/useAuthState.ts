import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setIsLoggedIn } from "../redux/slices/authSlice";
import { setCurrentModal } from "../redux/slices/modalSlice";
import { redirect } from "react-router-dom";

export function useAuthStateCheck(protectedRoute: boolean = false): boolean {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  console.log("running useAuthStateCheck");

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { user, token } = auth;
    if (!token) {
      dispatch(setIsLoggedIn(false));
      if (protectedRoute) {
        redirect("/login");
      } else dispatch(setCurrentModal("lock"));
    } else {
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.expiresIn * 1000 < Date.now()) {
          alert("Session Expired, please login again");
          dispatch(setIsLoggedIn(false));
          if (protectedRoute) {
            redirect("/login");
          } else dispatch(setCurrentModal("lock"));
        }
      } catch (error) {
        console.error(error);
      }
      dispatch(setIsLoggedIn(true));
      dispatch(setCurrentModal(null));
    }
    if ((user && !user.isActive)) {
      if (protectedRoute) {
        redirect("/verifyOTP");
      } else dispatch(setCurrentModal("verifyOtp"));
    }
    setReady(true);
  }, [auth, dispatch, protectedRoute]);
  return ready;
}