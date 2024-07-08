import * as Dialog from "@radix-ui/react-dialog";
import { UserPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import {  FaUser } from "react-icons/fa6";


import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";
import { notify } from "../utils/notify";

export default ({ triggerButton }: { triggerButton: React.ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => {
    return state.auth.token;
  });
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
              {/* <li
                className={`flex w-full items-center space-x-3  bg-[#28282f]  p-2 rounded-lg`}
              >
                <Dialog.Close>
                  <a href="/#" className="flex items-center space-x-3">
                    <GoHome /> <span>Home</span>
                  </a>
                </Dialog.Close>
              </li>
              <li
                className={`flex w-full items-center space-x-3  bg-[#28282f]  p-2 rounded-lg`}
              >
                <Dialog.Close asChild>
                  <a href="/#network" className="flex items-center space-x-3">
                    <IoGlobeOutline /> <span>Network</span>
                  </a>
                </Dialog.Close>
              </li>
              <li
                className={`flex w-full items-center space-x-3  bg-[#28282f]  p-2 rounded-lg`}
              >
                <Dialog.Close asChild>
                  <a
                    className="flex items-center space-x-3"
                    href={"/#roadmaps"}
                  >
                    <GoProjectRoadmap /> <span>Roadmap</span>
                  </a>
                </Dialog.Close>
              </li>
              <li
                className={`flex w-full items-center space-x-3
               bg-[#28282f]  p-2 rounded-lg`}
              >
                <Dialog.Close asChild>
                  <a
                    className="flex items-center space-x-3"
                    href={"/#contactus"}
                  >
                    <FaMessage /> <span>Contact Us</span>
                  </a>
                </Dialog.Close>
              </li> */}
              {!token && (
                <li className="bg-[#28282f] flex p-2 rounded-lg">
                  <Dialog.Close
                    onClick={() => {
                      window.scrollTo({ top: 0 });
                      navigate("/login");
                    }}
                    className={`flex w-full items-center space-x-3 ${
                      location.pathname.includes("login")
                        ? "text-primary font-bold"
                        : ""
                    }`}
                  >
                    <FaUser />
                    <span>Login</span>
                  </Dialog.Close>
                </li>
              )}
              {!token && (
                <li className="bg-[#28282f] flex p-2 rounded-lg">
                  <Dialog.Close
                    onClick={() => {
                      window.scrollTo({ top: 0 });
                      navigate("/signup");
                    }}
                    className={`flex w-full items-center space-x-3 ${
                      location.pathname.includes("signup")
                        ? "text-primary font-bold"
                        : ""
                    }`}
                  >
                    <UserPlusIcon height={20} width={20} />
                    <span>Create an account</span>
                  </Dialog.Close>
                </li>
              )}
              {token && (<>
                <li className="bg-[#28282f] flex p-2 rounded-lg w-full">
                  <Dialog.Close
                    onClick={()=>{navigate("/profile")}}
                    className={`flex w-full items-center space-x-3 text-white`}
                    >
                    
                    <span className="w-full">Profile</span>
                  </Dialog.Close>
                </li>
                <li className="bg-[#28282f] flex p-2 rounded-lg w-full">
                  <Dialog.Close
                    onClick={()=>{navigate("/loaddata")}}
                    className={`flex w-full items-center space-x-3 text-white`}
                    >
                    
                    <span className="w-full">Custom Upload</span>
                  </Dialog.Close>
                </li>
                    </>

              )}
               {token && (
                <li className="bg-[#28282f] flex p-2 rounded-lg w-full">
                  <Dialog.Close
                    onClick={() => {
                      dispatch(logout());
                      notify("Logged out successfully",true);
                    }}
                    className={`flex w-full items-center space-x-3 text-red-400`}
                  >
                    {/* < IoLogOut height={20} width={20} /> */}
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
