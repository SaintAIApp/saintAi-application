import * as Dialog from "@radix-ui/react-dialog";
import {  XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMessage } from "react-icons/fa6";
import {  IoGlobeOutline } from "react-icons/io5";
import {  GoHome, GoProjectRoadmap } from "react-icons/go";

export default ({ triggerButton }: { triggerButton: React.ReactNode }) => {
  const navigate  = useNavigate();
  return (
      <Dialog.Root  >
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
              <li className="bg-[#28282f] flex p-2 rounded-lg">
                  <Dialog.Close onClick={()=>{window.scrollTo({top:0}); navigate("/")}} className={`flex w-full items-center space-x-3 ${location.pathname === "/" ? "text-primary font-bold" : ""}`}>
                    <GoHome/> <span className={``}>
                       Home
                      </span>
                  </Dialog.Close>
                </li>
                <li className="bg-[#28282f] flex p-2 rounded-lg">
                  <Dialog.Close onClick={()=>{window.scrollTo({top:0}); navigate("/network")}} className={`flex w-full items-center space-x-3 ${location.pathname.includes("network") ? "text-primary font-bold" : ""}`}>
                    <IoGlobeOutline/> <span>
                       Network
                      </span>
                  </Dialog.Close>
                </li>
                <li className="bg-[#28282f] flex p-2 rounded-lg">
                <Dialog.Close onClick={()=>{window.scrollTo({top:0}); navigate("/roadmaps")}} className={`flex w-full items-center space-x-3 ${location.pathname.includes("roadmaps") ? "text-primary font-bold" : ""}`}>
                    <GoProjectRoadmap/> <span>
                       Roadmap
                      </span>
                  </Dialog.Close>
                </li>
                <li className="bg-[#28282f] flex p-2 rounded-lg">
                <Dialog.Close onClick={()=>{window.scrollTo({top:0}); navigate("/contactus")}} className={`flex w-full items-center space-x-3 ${location.pathname.includes("contactus") ? "text-primary font-bold" : ""}`}>
                    <FaMessage/> <span>
                       Contact Us
                      </span>
                  </Dialog.Close>
                </li>
              </ul>
            </>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>


  );
};
