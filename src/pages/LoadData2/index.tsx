import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import useFileService from "../../hooks/useFileService";
import { Upload } from "../../types/data";
import { notify } from "../../utils/notify";
import ChatComponent from "../ViewDocument";

import SidebarContent from "../../components/LoadDataMobileSideBar";
import { useAppSelector } from "../../redux/hooks";

import LoginPage from "../Auth/Login";
import Signup from "../Auth/SignUp";
import VerifyOtp from "../Auth/OTP";
import { jwtDecode } from "jwt-decode";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import Form from "./Form";
interface LoadDataProps {
  files: Upload[] | null;
  setFiles: React.Dispatch<React.SetStateAction<Upload[] | null>>;
  selectedFileId: string | null;
  setSelectedFileId: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoadData: React.FC<LoadDataProps> = ({
  files,
  setFiles,
  selectedFileId,
  setSelectedFileId,
}) => {
  const { uploadFile, getAllFiles, deleteFile } = useFileService();

  const [isMobile, setIsMobile] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  const [isFilesLoading, setIsFilesLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState<string>("lock");

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [fileSelectedDelete, setFileSeletedDelete] = useState<string | null>(
    null
  );
  const store = useAppSelector((state) => state);
  const { auth: authObject } = store;

  const handleCancelSubscription = async () => {
    console.log(fileSelectedDelete);
    if (!fileSelectedDelete || !files) {
      setIsDialogOpen(false);
      return;
    }
    try {
      const res = await deleteFile(fileSelectedDelete);
      if (res) {
        const updatedList = files?.filter((e) => {
          return e._id !== fileSelectedDelete;
        });
        setFiles(updatedList);
        notify("Deleted!", true);
        setSelectedFileId(null);
      }
    } catch (error) {}
    setIsDialogOpen(false);
  };

  const handleToggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const handleLoadData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !fileName) {
      alert("Please select a file and enter a file name");
      return;
    }
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", fileName);
      formData.append("featureId", import.meta.env.VITE_UPLOAD_DOC_FEATURE_ID);
      const response = await uploadFile(formData);
      const { userId, name, createdAt, fileUrl, _id, fileKey } =
        response.data.data;
      setFiles((prev) => {
        const prevFiles = prev || [];
        return [
          ...prevFiles,
          { _id, userId, name, fileKey, fileUrl, createdAt },
        ];
      });
      setSelectedFileId(response.data.data._id);
    } catch (error: any) {
      console.error("Error uploading file:", error);
      notify(error.message, false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFiles = async () => {
    setIsFilesLoading(true);
    try {
      const res = await getAllFiles();
      const filteredFiles = res.data.data.filter(
        (file: any) => file.name !== "SAINT_AI" && file.name !== "SAINT_AI_DOC"
      );
      setFiles(filteredFiles);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setIsFilesLoading(false);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const checkIfMobile = () => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  };

  useEffect(() => {
    fetchFiles();
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    if (selectedFileId && isMobile) setShowSideBar(false);
  }, [selectedFileId]);

  useEffect(()=>{
    console.log(selectedFileId)
  },[selectedFileId])

  useEffect(() => {
    const { user, token } = authObject;
    if (!token || (user && !user.isActive)) {
      setIsLoggedIn(false);
    } else {
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.expiresIn * 1000 < Date.now()) {
          alert("Session Expired, please login again");
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [authObject]);

  return (
    <section className=" ml-0 md:ml-10 h-full self-start overflow-hidden">
      {!isLoggedIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="text-center text-white flex flex-col items-center">
            {currentModal === "lock" ? (
              <div className="flex flex-col items-center space-y-3">
                <LockClosedIcon className=" h-12 w-12 " />
                <h1 className="my-3">Please login to access this page</h1>
                <button
                  className="bg-primary text-white px-3 py-1 rounded-md "
                  onClick={() => {
                    setCurrentModal("login");
                  }}
                >
                  Login
                </button>
              </div>
            ) : currentModal === "login" ? (
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                setCurrentModal={setCurrentModal}
              />
            ) : currentModal === "signup" ? (
              <Signup
                setIsLoggedIn={setIsLoggedIn}
                setCurrentModal={setCurrentModal}
              />
            ) : (
              <VerifyOtp
                setIsLoggedIn={setIsLoggedIn}
                setCurrentModal={setCurrentModal}
              />
            )}
          </div>
        </div>
      )}

      <div className="flex items-start  relative w-full h-full rounded-xl overflow-hidden md:bg-transparent">
        {isMobile && (
          <div
            onClick={handleToggleSideBar}
            className="absolute z-[40] top-5 left-5"
          >
            <FaChevronRight
              height={6}
              width={6}
              fill="white"
              className="h-6 w-6"
            />
          </div>
        )}

        {isMobile && showSideBar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleToggleSideBar}
          ></div>
        )}

        {isMobile ? (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: showSideBar ? 0 : "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-black  z-50 pt-20"
          >
            <SidebarContent
              files={files}
              isFilesLoading={isFilesLoading}
              onFileSelect={setSelectedFileId}
              selectedFileId={selectedFileId}
              setSelectedFileId={setSelectedFileId}
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              handleCancelSubscription={handleCancelSubscription}
              setFileSeletedDelete={setFileSeletedDelete}
            />
          </motion.div>
        ) : (
          <></>
        )}

        <div className="w-full  space-x-2 h-full relative flex">
          {/* LEFT */}
          { ((window.innerWidth<=768 && !selectedFileId) || window.innerWidth>768) && <div className="w-full md:w-1/2">
            {isLoading ? (
              <div className="h-full w-full  bg-[#000] bg-opacity-70 flex items-center justify-center flex-col">
                <img src="/loading.gif" alt="Loading" />
                <h1 className="text-left">{"Uploading File..."}</h1>
              </div>
            ) : (
              <Form
                fileName={fileName}
                file={file}
                setFileName={setFileName}
                handleFileSelect={handleFileSelect}
                handleLoadData={handleLoadData}
              />
            )}
          </div>}
          {/* RIGHT */}
       {( (window.innerWidth<=768 && selectedFileId) || window.innerWidth>768) &&    <div className="w-full md:w-1/2 overflow-hidden">
            <ChatComponent
              selectedFileId={selectedFileId}
              setShowSideBar={setShowSideBar}
              setSelectedFileId={setSelectedFileId}
            />
          </div>}
        </div>
      </div>
    </section>
  );
};

export default LoadData;
