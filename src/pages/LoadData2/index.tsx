import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FileDropzone from "../../components/FileUpload";
import { FaChevronRight } from "react-icons/fa";
import useFileService from "../../hooks/useFileService";
import { Upload } from "../../types/data";
import { notify } from "../../utils/notify";
import ChatComponent from "../ViewDocument";

import SidebarContent from "../../components/LoadDataMobileSideBar";
interface LoadDataProps {
  files: Upload[] | null;
  setFiles: React.Dispatch<React.SetStateAction<Upload[] | null>>;
  selectedFileId: string | null;
  setSelectedFileId: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoadData: React.FC<LoadDataProps> = ({ files, setFiles, selectedFileId, setSelectedFileId }) => {
  const { uploadFile, getAllFiles, deleteFile } = useFileService();

  const [isMobile, setIsMobile] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileUploadStage, setFileUploadStage] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  // const [files, setFiles] = useState<Upload[] | null>(null);
  const [isFilesLoading, setIsFilesLoading] = useState(false);
  // const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [fileSelectedDelete, setFileSeletedDelete] = useState<string | null>(
    null
  );
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
    setFileUploadStage("Uploading File...");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", fileName);
      formData.append("featureId", import.meta.env.VITE_UPLOAD_DOC_FEATURE_ID);
      const response = await uploadFile(formData);
      setTimeout(() => {
        setFileUploadStage("Analyzing the document...");
      }, 2000);
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
      setFileUploadStage("");
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

  return (
    <section className=" h-full self-start overflow-hidden">
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
            className="fixed top-0 left-0 w-3/4 sm:w-1/4 h-full bg-black  z-50 pt-20"
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

        <div className="w-full md:w-3/4 h-full relative">
          {selectedFileId ? (
            <ChatComponent
              selectedFileId={selectedFileId}
              setShowSideBar={setShowSideBar}
              uploadId={selectedFileId}
              setSelectedFileId={setSelectedFileId}
            />
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center px-6 md:px-32 lg:px-[5vw] py-5">
              {isLoading && (
                <div className="h-full w-full absolute top-0 left-0 bg-[#000] bg-opacity-70 flex items-center justify-center flex-col">
                  <img src="/loading.gif" alt="Loading" />
                  <h1 className="text-center">{fileUploadStage}</h1>
                </div>
              )}
              <h1 className="text-3xl font-bold text-white my-5">Load Data</h1>
              <form onSubmit={handleLoadData} encType="multipart/form-data">
                <div className="w-full">
                  <FileDropzone onFileSelect={handleFileSelect} />
                  {file && <h1 className="my-2">Uploaded: {file.name}</h1>}
                </div>
                <div className="self-start w-full">
                  <label
                    htmlFor="key"
                    className="block mb-2 text-sm mt-2 font-bold"
                  >
                    File name
                  </label>
                  <input
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-black border font-semibold sm:text-sm rounded-lg outline-none block w-full p-2.5 text-white border-slate-500"
                    placeholder="Enter file name"
                  />
                </div>
                <div className="w-full self-start my-2">
                  <button
                    type="submit"
                    className="w-full py-2 bg-primary text-white rounded-md font-semibold relative"
                  >
                    Load Data
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoadData;
