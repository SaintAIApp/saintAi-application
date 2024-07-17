import { useNavigate } from "react-router-dom"
import logoCircle from "../assets/saintlogocircle.png"
import { Upload } from "../types/data";
import { useMemo, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import DeleteModal from "./DeleteChatModal";
const SideBar = ({files,setFileSeletedDelete,handleCancelSubscription,selectedFileId,setSelectedFileId}:{
    files?:Upload[] | null;
    setFileSeletedDelete?:any,
    handleCancelSubscription?:any,
    setSelectedFileId?:any,
    selectedFileId?:string|null
}) => {
    const navigate = useNavigate();
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

    const [isDialogOpen, setIsDialogOpen] = useState(false);

  
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
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev:any):any => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
    setSelectedFileId(null)
  };

  const renderCategory = (title: string, categoryFiles: Upload[]) => {
    if (categoryFiles.length === 0) return null;

    return (
      <li key={title} className="mb-4">
        <button
          onClick={() => toggleCategory(title)}
          className="flex justify-between items-center w-full p-2 bg-gray-800 rounded-md"
        >
          <span>{title} ({categoryFiles.length})</span>
          <ChevronRightIcon
            className={`h-5 w-5 transform transition-transform ${
              expandedCategories.has(title) ? "rotate-90" : ""
            }`}
          />
        </button>
        {expandedCategories.has(title) && (
          <ul className="mt-2 ml-4 space-y-2">
            {categoryFiles.map((file) => (
              <li className="" key={file._id}>
                <button
                  onClick={() => setSelectedFileId(file._id)}
                  className={`flex justify-between items-center w-full p-2 rounded-md transition-colors duration-200 ${
                    selectedFileId === file._id
                      ? "bg-primary text-white bg-opacity-80"
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
                    <ChevronRightIcon className="h-5 w-5" />
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
    <div id="sideBar" className="md:w-60  lg:w-72 pt-10 flex flex-col justify-between">
    <div>
      <div className="flex items-center space-x-2">
        <div id="left">
          <img className="w-8" src={logoCircle} alt="Logo" />
        </div>
        <div id="right" className="flex flex-col justify-center">
          <h1>SaintAI</h1>
          <h1 className="text-slate-600">Dashboard</h1>
        </div>
      </div>
      <ul className="flex flex-col space-y-2 mt-2">
      <li onClick={() => { navigate("/") }} className={`cursor-pointer py-2 rounded-full flex px-2 space-x-2 ${window.location.pathname === "/" ? "bg-[#333333]" : ""}`}>
        <img src="/icons/generic.svg" className="mr-2" alt="Generic" /> Generic
      </li>
      {files?<li className="cursor-pointer">
        <div
          onClick={() => toggleCategory("Personal")}
          className={`py-2 rounded-full flex justify-between px-2 space-x-2 ${window.location.pathname === "/loaddata" ? "bg-[#333333]" : ""}`}
        >
          <div className="flex items-center">
            <img src="/icons/personal.svg" className="mr-2" alt="Personal" /> Personal
          </div>
          <ChevronRightIcon
            className={`h-5 w-5 transform transition-transform ${
              expandedCategories.has("Personal") ? "rotate-90" : ""
            }`}
          />
        </div>
        {expandedCategories.has("Personal") && categorizedFiles && (
          <ul className="mt-2 ml-4 space-y-2">
            {renderCategory("Today", categorizedFiles.today)}
            {renderCategory("Yesterday", categorizedFiles.yesterday)}
            {renderCategory("Last 7 days", categorizedFiles.lastWeek)}
            {renderCategory("Last 30 days", categorizedFiles.lastMonth)}
            {renderCategory("Last Year", categorizedFiles.lastYear)}
            {renderCategory("Older", categorizedFiles.older)}
            {renderCategory("Unknown date", categorizedFiles.unknown)}
          </ul>
        )}
      </li>:  <li onClick={() => { navigate("/loaddata") }} className={`cursor-pointer py-2 rounded-full flex px-2 space-x-2 ${window.location.pathname === "/loaddata" ? "bg-[#333333]" : ""}`}>
        <img src="/icons/personal.svg" className="mr-2" alt="Personal" /> Personal
      </li>}
      <li onClick={() => { navigate("/") }} className={`cursor-pointer py-2 rounded-full flex px-2 space-x-2 ${window.location.pathname === "/mine" ? "bg-[#333333]" : ""}`}>
        <img src="/icons/mine.svg" className="mr-2" alt="Mine" /> Mine
      </li>
    </ul>
    </div>
    <div className="">
      <button onClick={() => { navigate("/profile") }} className="text-center w-full p-2 rounded-full bg-[#333333]">
        Profile
      </button>
    </div>
  </div>
  )
}

export default SideBar