import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import FileDropzone from "../../components/FileUpload";
import { FaChevronRight } from "react-icons/fa";
import useFileService from "../../hooks/useFileService";
import { Upload } from "../../types/data";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { notify } from "../../utils/notify";
import ChatComponent from "../ViewDocument";
import { useAppSelector } from "../../redux/hooks";
import { BiUpload } from "react-icons/bi";
import DeleteModal from "../../components/DeleteChatModal";

const FileUploadAndChat: React.FC = () => {
  const { uploadFile, getAllFiles, deleteFile } = useFileService();
  const [isMobile, setIsMobile] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileUploadStage, setFileUploadStage] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  const [files, setFiles] = useState<Upload[] | null>(null);
  const [isFilesLoading, setIsFilesLoading] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
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
          return [...prevFiles, { _id, userId, name, fileKey, fileUrl, createdAt }];
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
      const filteredFiles = res.data.data.filter((file:any) => 
        file.name !== "SAINT_AI" && file.name !== "SAINT_AI_DOC"
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

  return (
    <section className="h-[90vh] min-w-[95vw] max-w-[95vw] min-h-[90vh] py-4 mx-3">
      <div className="flex relative w-full h-full rounded-xl overflow-hidden md:bg-transparent">
        {isMobile && (
          <>
            <div className="z-0 absolute h-64 w-64 bg-shape1 bottom-[-10%] right-[-20%]"></div>
            <div className="z-0 absolute h-64 w-64 bg-shape2 top-[-30%] left-10"></div>
          </>
        )}
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
            className="fixed top-0 left-0 w-3/4 sm:w-1/4 h-full bg-purple z-50 pt-20"
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
          <div className="w-1/4 bg-purple bg-opacity-40 h-full overflow-hidden">
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
  setSelectedFileId: React.Dispatch<React.SetStateAction<string | null>>;
  isDialogOpen: boolean;
  setIsDialogOpen: any;
  handleCancelSubscription: any;
  setFileSeletedDelete: any;
}> = ({
  files,
  setFileSeletedDelete,
  isFilesLoading,
  onFileSelect,
  selectedFileId,
  setSelectedFileId,
  handleCancelSubscription,
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const plan = useAppSelector((state) => state.subscription.plan);
  console.log(plan);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categorizedFiles = useMemo(() => {
    if (!files) return null;
   
    interface CategorizedFiles {
      today: Upload[];
      yesterday: Upload[];
      lastWeek: Upload[];
      lastMonth: Upload[];
      lastYear: Upload[];
      older: Upload[];
      unknown: Upload[];
    }
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setDate(lastMonth.getDate() - 30);
    const lastYear = new Date(today);
    lastYear.setFullYear(lastYear.getFullYear() - 1);

    return files.reduce<CategorizedFiles>(
      (acc, file) => {
        const createdAt = file.createdAt ? new Date(file.createdAt) : null;

        if (!createdAt) {
          acc.unknown.push(file);
        } else if (createdAt >= today) {
          acc.today.push(file);
        } else if (createdAt >= yesterday) {
          acc.yesterday.push(file);
        } else if (createdAt >= lastWeek) {
          acc.lastWeek.push(file);
        } else if (createdAt >= lastMonth) {
          acc.lastMonth.push(file);
        } else if (createdAt >= lastYear) {
          acc.lastYear.push(file);
        } else {
          acc.older.push(file);
        }

        return acc;
      },
      {
        today: [],
        yesterday: [],
        lastWeek: [],
        lastMonth: [],
        lastYear: [],
        older: [],
        unknown: [],
      }
    );
  }, [files]);

  const renderCategory = (title: string, categoryFiles: Upload[]) => {
    if (categoryFiles.length === 0) return null;

    return (
      <li key={title} className="mb-4">
        <button
          onClick={() =>
            setExpandedCategory(expandedCategory === title ? null : title)
          }
          className="flex justify-between items-center w-full p-2 bg-gray-800 rounded-md"
        >
          <span>
            {title} ({categoryFiles.length})
          </span>
          <ChevronRightIcon
            className={`h-5 w-5 transform transition-transform ${
              expandedCategory === title ? "rotate-90" : ""
            }`}
          />
        </button>
        {expandedCategory === title && (
          <ul className="mt-2 ml-4 space-y-2">
            {categoryFiles.map((file) => (
              <li className="" key={file._id}>
                <button
                  onClick={() => onFileSelect(file._id)}
                  className={`flex justify-between items-center w-full p-2 rounded-md transition-colors duration-200 ${
                    selectedFileId === file._id
                      ? "bg-primary  text-white bg-opacity-80"
                      : "hover:bg-gray-700 bg-gray-600"
                  }`}
                >
                  <span>{file.name}</span>
                  <div className="flex items-center">
                    <DeleteModal
                      fileId={file._id}
                      setFileSeletedDelete={setFileSeletedDelete}
                      open={isDialogOpen}
                      onOpenChange={setIsDialogOpen}
                      onConfirm={handleCancelSubscription}
                    />
                    {/* <TrashIcon className="h-5 w-5 text-red-400"/> */}
                    <ChevronRightIcon className="h-5 w-5 " />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="z-0 absolute h-64 w-64 bg-shape1 bottom-[-10%] right-[-20%]"></div>
      <div className="z-0 absolute h-64 w-64 bg-shape2 top-[-30%] left-10"></div>
      <div className="flex items-center justify-between p-3">
        <h1 className="text-2xl">File Uploads</h1>
        {selectedFileId && <button
          onClick={() => {
            setSelectedFileId(null);
          }}
          className="border-[0.2px] border-slate-400 rounded-md px-2 py-1 text-sm flex items-center"
        >
          {"Upload "} &nbsp; <BiUpload />
        </button>}
      </div>
      {!isFilesLoading && (!files || files.length === 0) && (
        <h1 className="px-4">No files found</h1>
      )}
      {categorizedFiles && (
        <ul className="flex flex-col space-y-2 overflow-y-auto max-h-[calc(100%-200px)] px-4">
          {renderCategory("Today", categorizedFiles.today)}
          {renderCategory("Yesterday", categorizedFiles.yesterday)}
          {renderCategory("Last 7 days", categorizedFiles.lastWeek)}
          {renderCategory("Last 30 days", categorizedFiles.lastMonth)}
          {renderCategory("Last Year", categorizedFiles.lastYear)}
          {renderCategory("Older", categorizedFiles.older)}
          {renderCategory("Unknown date", categorizedFiles.unknown)}
        </ul>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm text-white p-4 rounded-t-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Current Plan:</span>
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
            {plan}
          </span>
        </div>

        {(plan === "pro" || plan === "proPlus") && files && (
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium">Usage Limit</span>
              <span className="text-xs font-bold">
                {files?.length} / {plan === "pro" ? 10 : 20}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${
                    (files?.length / (plan === "pro" ? 10 : 20)) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadAndChat;
