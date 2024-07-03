import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FileDropzone from "../../components/FileUpload";
import { FaChevronRight } from "react-icons/fa";
import useFileService from "../../hooks/useFileService";
import { Upload } from "../../types/data";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { notify } from "../../utils/notify";
import ChatComponent from "../ViewDocument";

const FileUploadAndChat: React.FC = () => {
  const { uploadFile, getAllFiles } = useFileService();
  const [isMobile, setIsMobile] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileUploadStage, setFileUploadStage] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  const [files, setFiles] = useState<Upload[] | null>(null);
  const [isFilesLoading, setIsFilesLoading] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

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
      setTimeout(() => {
        setFileUploadStage("Redirecting...");
      }, 1000);
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
      setFiles(res.data.data);
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

  return (
    <section className="h-[80vh] min-h-[80vh] py-4">
      <div className="flex relative w-full h-full rounded-xl overflow-hidden md:bg-transparent">
        {isMobile && (
          <>
            <div className="z-0 absolute h-64 w-64 bg-shape1 bottom-[-10%] right-[-20%]"></div>
            <div className="z-0 absolute h-64 w-64 bg-shape2 top-[-30%] left-10"></div>
          </>
        )}
        {isMobile && (
          <div onClick={handleToggleSideBar} className="absolute z-[40] top-5 left-5">
            <FaChevronRight height={6} width={6} fill="white" className="h-6 w-6" />
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
          className="fixed top-0 left-0 w-3/4 sm:w-1/4 h-full bg-purple z-50 pt-20"
        >
          <SidebarContent 
            files={files} 
            isFilesLoading={isFilesLoading} 
            onFileSelect={setSelectedFileId} 
            selectedFileId={selectedFileId}
          />
        </motion.div>
      ) : (
        <div className="w-1/4 bg-purple bg-opacity-40 h-full overflow-hidden">
          <SidebarContent 
            files={files} 
            isFilesLoading={isFilesLoading} 
            onFileSelect={setSelectedFileId} 
            selectedFileId={selectedFileId}
          />
        </div>
      )}

        <div className="w-full md:w-3/4 h-full">
          {selectedFileId ? (
            <ChatComponent uploadId={selectedFileId} />
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center px-6 md:px-32 lg:px-[5vw] py-5">
              {isLoading && (
                <div className="h-full w-full absolute top-0 left-0 bg-[#000] bg-opacity-70 flex items-center justify-center flex-col">
                  <img src="/loading.gif" alt="Loading" />
                  <h1 className="text-center">{fileUploadStage}</h1>
                </div>
              )}
              <h1 className="text-3xl font-bold text-white">Load Data</h1>
              <form onSubmit={handleLoadData} encType="multipart/form-data">
                <div className="w-full">
                  <FileDropzone onFileSelect={handleFileSelect} />
                  {file && <h1 className="my-2">Uploaded: {file.name}</h1>}
                </div>
                <div className="self-start w-full">
                  <label htmlFor="key" className="block mb-2 text-sm font-bold">
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
                    className="w-full py-2 bg-primary text-white rounded-md font-semibold"
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

const SidebarContent: React.FC<{
  files: Upload[] | null;
  isFilesLoading: boolean;
  onFileSelect: (fileId: string) => void;
  selectedFileId: string | null;
}> = ({ files, isFilesLoading, onFileSelect, selectedFileId }) => (
  <div className="relative w-full h-full overflow-hidden">
    <div className="z-0 absolute h-64 w-64 bg-shape1 bottom-[-10%] right-[-20%]"></div>
    <div className="z-0 absolute h-64 w-64 bg-shape2 top-[-30%] left-10"></div>
    <h1 className="text-2xl p-4">File Uploads</h1>
    {!isFilesLoading && files?.length === 0 && <h1 className="px-4">No files found</h1>}
    <ul className="flex flex-col space-y-2">
      {files?.map((e, ind: number) => (
        <li key={ind} className="px-4">
          <button 
            onClick={() => onFileSelect(e._id)} 
            className={`flex justify-between w-full p-2 rounded-md transition-colors duration-200 ${
              selectedFileId === e._id 
                ? 'bg-primary text-white bg-opacity-50' 
                : 'hover:bg-gray-700'
            }`}
          >
            <span>{e.name}</span>
            <span><ChevronRightIcon height={15} /></span>
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default FileUploadAndChat;