import { XMarkIcon } from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { useNavigate } from "react-router-dom";

import { BiDollar, BiLogIn, BiUserPlus } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";
import { setCurrentModal } from "../redux/slices/modalSlice";
import { notify } from "../utils/notify";
import { setGameModalList } from "../redux/slices/widgetSlice";

const NavMenu = ({ triggerButton }: { triggerButton: React.ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => {
    return state.auth.token;
  });
  const onClickPlay2Earn = () => {
    dispatch(setGameModalList({ isGameModalList: true }));
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>{triggerButton}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed  inset-0  bg-[#0008] animate-overlayShow" />
        <Dialog.Content className=" z-[100] text-white border-[2px] border-slate-800   bg-[#1b1b22] fixed top-0 left-0 transform w-full h-full  shadow-custom2 p-6 animate-contentShow">
          <Dialog.Title className="flex text-white text-2xl justify-between py-3">
            Menu
            <Dialog.Close>
              <XMarkIcon className="h-5 w-5" />
            </Dialog.Close>
          </Dialog.Title>

          <>
            <ul className="flex flex-col space-y-3 ">
              {!token && (
                <>
                  <li className="bg-[#28282f] flex p-2 rounded-lg">
                    <Dialog.Close
                      onClick={() => {
                        window.scrollTo({ top: 0 });
                        dispatch(setCurrentModal("login"));
                      }}
                      className={`flex w-full items-center space-x-3 ${location.pathname.includes("login")
                        ? "text-primary font-bold"
                        : ""
                        }`}
                    >
                      <BiLogIn className="text-2xl" />
                      <span>Login</span>
                    </Dialog.Close>
                  </li>
                  <li className="bg-[#28282f] flex p-2 rounded-lg">
                    <Dialog.Close
                      onClick={() => {
                        window.scrollTo({ top: 0 });
                        dispatch(setCurrentModal("signup"));
                      }}
                      className={`flex w-full items-center space-x-3 ${location.pathname.includes("signup")
                        ? "text-primary font-bold"
                        : ""
                        }`}
                    >
                      <BiUserPlus className="text-2xl" />
                      <span>Create an account</span>
                    </Dialog.Close>
                  </li>
                  <li className="bg-[#28282f] flex p-2 rounded-lg w-full">
                    <Dialog.Close
                      onClick={() => {
                        navigate("/pricing");
                      }}
                      className={`flex w-full items-center space-x-3 `}
                    >
                      <BiDollar className="h-8" />
                      <span>Pricing</span>
                    </Dialog.Close>
                  </li>
                </>
              )}

              {token && (
                <>
                  <li className="bg-[#28282f] flex p-2 rounded-lg w-full">
                    <Dialog.Close
                      onClick={() => {
                        navigate("/");
                      }}
                      className={`flex w-full items-center space-x-3 `}
                    >
                      <span className="w-full">Generic</span>
                    </Dialog.Close>
                  </li>
                  <li className="bg-[#28282f] flex p-2 rounded-lg w-full">
                    <Dialog.Close
                      onClick={() => {
                        navigate("/profile");
                      }}
                      className={`flex w-full items-center space-x-3 text-white`}
                    >
                      <span className="w-full">Profile</span>
                    </Dialog.Close>
                  </li>
                  <li className="bg-[#28282f] flex p-2 rounded-lg w-full">
                    <Dialog.Close
                      onClick={() => {
                        navigate("/loaddata");
                      }}
                      className={`flex w-full items-center space-x-3 text-white`}
                    >
                      <span className="w-full">Custom Upload</span>
                    </Dialog.Close>
                  </li>
                  <li className="bg-[#28282f] flex p-2 rounded-lg w-full">
                    <Dialog.Close
                      onClick={() => {
                        navigate("/pricing");
                      }}
                      className={`flex w-full items-center space-x-3 `}
                    >
                      <span className="w-full">Pricing</span>
                    </Dialog.Close>
                  </li>
                  <li className="bg-[#28282f] flex p-2 rounded-lg w-full">
                    <Dialog.Close
                      onClick={() => {
                        navigate("/mine");
                      }}
                      className={`flex w-full items-center space-x-3 `}
                    >
                      <span className="w-full">Mining</span>
                    </Dialog.Close>
                  </li>
                  <li className="bg-[#28282f] flex p-2 rounded-lg w-full">
                    <Dialog.Close
                      onClick={() => onClickPlay2Earn()}
                      className={`flex w-full items-center space-x-3 `}>
                      <span className="w-full">Play 2 Earn</span>
                    </Dialog.Close>
                  </li>
                </>
              )}
              {token && (
                <li className="bg-[#28282f] flex p-2 rounded-lg w-full">
                  <Dialog.Close
                    onClick={() => {
                      dispatch(logout());
                      notify("Logged out successfully", true);
                    }}
                    className={`flex w-full items-center space-x-3 text-purple`}
                  >
                    <span className="w-full">Logout</span>
                  </Dialog.Close>
                </li>
              )}
            </ul>
          </>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NavMenu;
