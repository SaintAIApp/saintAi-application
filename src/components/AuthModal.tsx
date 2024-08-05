import { clsx } from "clsx";
import Login from "../pages/Auth/Login";
import VerifyOtp from "../pages/Auth/OTP";
import Signup from "../pages/Auth/SignUp";
import { useAppSelector } from "../redux/hooks";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setCurrentModal } from "../redux/slices/modalSlice";
import { LockClosedIcon } from "@heroicons/react/24/outline";


const AuthModal = ({ defaultModal }: {
  defaultModal?: "verifyOtp" | "login" | "signup" | "lock" | null;
}) => {
  const { currentModal } = useAppSelector((state) => state.authModal);
  const dispatch = useDispatch();
  // get query params from react-router-dom
  const { search } = useLocation();

  const validatedDefaultModal = useMemo(() => {
    const params = new URLSearchParams(search);
    const modal = params.get("m");
    if (modal && (modal === "login" || modal === "signup" || modal === "verifyOtp")) {
      return modal;
    } else {
      return defaultModal;
    }
  }, [search, defaultModal]);

  useEffect(() => {
    if (validatedDefaultModal) {
      dispatch(setCurrentModal(validatedDefaultModal));
    }
  }, [validatedDefaultModal, dispatch]);

  console.log("AuthModal -> currentModal", currentModal);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm",
        currentModal === null && "hidden"
      )}
    >
      <div className="-mt-12">
        {currentModal === "login" && (
          <Login />
        )}
        {currentModal === "signup" && (
          <Signup />
        )}
        {currentModal === "verifyOtp" && (
          <VerifyOtp />
        )}
        {currentModal === "lock" && (
          <div className="flex flex-col items-center space-y-3">
            <LockClosedIcon className=" h-12 w-12 " />
            <h1 className="my-3">Please login to access this page</h1>
            <button
              className="bg-primary text-white px-3 py-1 rounded-md "
              onClick={() => {
                dispatch(setCurrentModal("login"));
              }}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
