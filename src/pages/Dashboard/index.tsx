import { useState } from "react";
import LoadData from "../LoadData2";
import Widgets from "../Widgets";

const Index = () => {
  const [dataType, setDataType] = useState<"generic" | "custom">("generic");

  const getButtonClass = (type: "generic" | "custom") => {
    return dataType === type
      ? "inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
      : "inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group";
  };

  const getIconClass = (type: "generic" | "custom") => {
    return dataType === type
      ? "w-4 h-4 me-2 text-blue-600 dark:text-blue-500"
      : "w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300";
  };

  return (
    <div>
      
      {dataType === "custom" && <LoadData getButtonClass={getButtonClass} getIconClass={getIconClass}  datatype={dataType} setDataType={setDataType} />}
      {dataType === "generic" && <Widgets  getButtonClass={getButtonClass} getIconClass={getIconClass} datatype={dataType} setDataType={setDataType} />}
    </div>
  );
};

export default Index;
