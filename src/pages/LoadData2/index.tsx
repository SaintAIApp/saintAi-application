import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FileDropzone from "../../components/FileUpload";
import { FaChevronRight } from "react-icons/fa";
import useFileService from "../../hooks/useFileService";
import { Link, useNavigate } from "react-router-dom";
import { Upload } from "../../types/data";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const Index = () => {
  const {uploadFile,getAllFiles} = useFileService()
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [file, setFile] = useState<File|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileUploadStage, setFileUploadStage] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  const [files,setFiles]=useState<Upload[]|null>(null);
  const [isFilesLoading,setIsFilesLoading]=useState(false);
  const handleToggleSideBar = () => {

    setShowSideBar(!showSideBar);
  };

  const handleLoadData = async (e:any) => {
    e.preventDefault()
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
      formData.append("featureId",import.meta.env.VITE_UPLOAD_DOC_FEATURE_ID)
      const response = await uploadFile(formData);
      setTimeout(()=>{
        setFileUploadStage("Analyzing the document...");
      },2000)
      setTimeout(()=>{
        setFileUploadStage("Redirecting...");
      },1000)
      navigate(`/upload/${response.data.data._id}`)
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
      setFileUploadStage("")
    }
  };
  const fetchFiles = async()=>{
    setIsFilesLoading(true);
    try {
      const res = await getAllFiles();
      setFiles(res.data.data);
    } catch (error) {
      
    }
    finally{
      setIsFilesLoading(false)
    }
  }
  const handleFileSelect = (selectedFile:File) => {
    setFile(selectedFile);
  };

  const checkIfMobile = () => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  };

  useEffect(() => {
    fetchFiles()
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <section className="h-[90vh] py-4 mb-56">
     
      <div className="flex relative w-full h-full rounded-xl overflow-hidden md:bg-transparent">
        {isMobile && (
          <>
            <div className="z-0 absolute h-64 w-64 bg-shape1 bottom-[-10%] right-[-20%]"></div>
            <div className="z-0 absolute h-64 w-64 bg-shape2 top-[-30%] left-10"></div>
          </>
        )}
        {isMobile && (
          <div onClick={handleToggleSideBar} className="absolute z-[40]  top-5 left-5">
            {/* <button onClick={handleToggleSideBar}> */}
              <FaChevronRight
                height={6}
                width={6}
                fill="white"
                className="h-6 w-6"
              />
            {/* </button> */}
          </div>
        )}

        {isMobile && showSideBar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleToggleSideBar}
          ></div>
        )}

        {isMobile && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: showSideBar ? 0 : "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-3/4 sm:w-1/4 h-full bg-purple z-50 pt-20"
          >
            <div className="relative w-full h-full overflow-hidden">
              <div className="z-0 absolute h-64 w-64 bg-shape1 bottom-[-10%] right-[-20%]"></div>
              <div className="z-0 absolute h-64 w-64 bg-shape2 top-[-30%] left-10"></div>
             
            <h1 className="text-2xl p-4">File Uploads</h1>{
              !isFilesLoading && files?.length==0 && <h1 className="px-4">No files found</h1>
            }
            <ul className="flex flex-col space-y-2">
                {
                  files?.map((e)=>{return <li className="px-4 ">
                    <Link to={"/upload/"+e._id} className="flex justify-between ">
                    <span> {e.name}</span>
                     <span><ChevronRightIcon height={15}/></span>
                    
                    </Link> 
                  </li>})
                }
            </ul>
            </div>
          </motion.div>
        )}

        {!isMobile && (
          <div
            id="sideBar"
            className="relative w-1/4 bg-purple bg-opacity-40 h-full overflow-hidden"
          >
            <div className="z-0 absolute h-64 w-64 bg-shape1 bottom-[-10%] right-[-20%]"></div>
            <div className="z-0 absolute h-64 w-64 bg-shape2 top-[-30%] left-10"></div>

            <h1 className="text-2xl p-4">File Uploads</h1>{
              !isFilesLoading && files?.length==0 && <h1 className="px-4">No files found</h1>
            }
            <ul className="flex flex-col space-y-2">
                {
                  files?.map((e)=>{return <li className="px-4 ">
                    <Link to={"/upload/"+e._id} className="flex justify-between ">
                    <span> {e.name}</span>
                     <span><ChevronRightIcon height={15}/></span>
                    
                    </Link> 
                  </li>})
                }
            </ul>
          </div>
        )}

        <div
          id="right"
          className="w-full relative md:w-3/4 space-y-1 md:space-y-2 lg:space-y-4 flex flex-col justify-center items-center px-10 md:px-32 lg:px-[10vw] py-5"
        >
          {isLoading && (
            <div className="h-full w-full absolute top-0 left-0 bg-[#000] bg-opacity-70 flex items-center justify-center flex-col">
              <img src="/loading.gif" alt="Loading" />
              <h1 className="text-center">{fileUploadStage}</h1>
            </div>
          )}
          <h1 className="text-3xl font-bold text-white">Load Data</h1>
          <form onSubmit={handleLoadData} encType={"multipart/form-data"}>

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
              onChange={(e) => {
                setFileName(e.target.value);
              }}
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
              onClick={handleLoadData}
              className="w-full py-2 bg-primary text-white rounded-md font-semibold"
            >
              Load Data
            </button>
           
          </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Index;
