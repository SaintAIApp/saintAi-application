import React, { useMemo, useState } from "react";

import { useAppSelector } from "../redux/hooks";
import { Upload } from "../types/data";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { BiUpload } from "react-icons/bi";
import DeleteModal from "./DeleteChatModal";

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
        {selectedFileId && (
          <button
            onClick={() => {
              setSelectedFileId(null);
            }}
            className="border-[0.2px] border-slate-400 rounded-md px-2 py-1 text-sm flex items-center"
          >
            {"Upload "} &nbsp; <BiUpload />
          </button>
        )}
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

export default SidebarContent;
