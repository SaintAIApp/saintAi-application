import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FileDropzone from "../../components/FileUpload";
import { FaChevronRight } from "react-icons/fa";

const Index = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [file, setFile] = useState<null | File>(null);
  const [uploadFile, setUploadFile] = useState(true);
  const [privateKey, setPrivateKey] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  const handleChange = (file: File) => {
    setFile(file);
  };

  const handleToggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const checkIfMobile = () => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  };

  useEffect(() => {
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <section className="h-[90vh] py-4">
      <div className="flex relative w-full h-full border-[0.7px] rounded-xl border-purple overflow-hidden md:bg-transparent">
        {isMobile && (
          <>
            <div className="z-0 absolute h-64 w-64 bg-shape1 bottom-[-10%] right-[-20%]"></div>
            <div className="z-0 absolute h-64 w-64 bg-shape2 top-[-30%] left-10"></div>
          </>
        )}
        {isMobile && (
          <div className="absolute top-5 left-5">
            <button onClick={handleToggleSideBar}>
              <FaChevronRight height={6} width={6} fill="white" className="h-6 w-6" />
            </button>
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
            className="fixed top-0 left-0 w-3/4 sm:w-1/4 h-full bg-purple  z-50"
          >
            <div className="relative w-full h-full overflow-hidden">
              <div className="z-0 absolute h-64 w-64 bg-shape1 bottom-[-10%] right-[-20%]"></div>
              <div className="z-0 absolute h-64 w-64 bg-shape2 top-[-30%] left-10"></div>
              <h1 className="text-2xl p-4">File Uploads</h1>
            </div>
          </motion.div>
        )}

        {!isMobile &&  <div
          id="sideBar"
          className="relative w-1/4 bg-purple bg-opacity-40 h-full overflow-hidden"
        >
          <div className=" z-0 absolute h-64 w-64 bg-shape1 bottom-[-10%] right-[-20%]"></div>
          <div className=" z-0 absolute  h-64 w-64 bg-shape2 top-[-30%] left-10"></div>

          <h1 className=" text-2xl p-4">File Uploads</h1>
        </div>}

        <div
          id="right"
          className="w-full  md:w-3/4 space-y-1 md:space-y-2 lg:space-y-4 flex flex-col justify-center items-center px-10 md:px-32 lg:px-[10vw] py-5"
        >
          <h1 className="text-3xl font-bold text-white">Load Data</h1>
          {uploadFile && (
            <div className="w-full">
              <FileDropzone />
            </div>
          )}
          <div className="w-full">
            <p className="text-sm mb-3 font-bold">File Type:</p>
            <select
              onChange={(val) => {
                if (val.target.value === "personal") {
                  setUploadFile(true);
                } else {
                  setUploadFile(false);
                }
              }}
              className="bg-black border border-white text-white sm:text-sm opacity-70 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            >
              <option disabled>Select a file type</option>
              <option value="personal">Personal</option>
              <option value="default">Default</option>
            </select>
          </div>
          <div className="self-start w-full">
            <label htmlFor="key" className="block mb-2 text-sm font-bold">
              Private Key
            </label>
            <input
              value={privateKey}
              onChange={(e) => {
                setPrivateKey(e.target.value);
              }}
              type="key"
              name="key"
              id="key"
              className="bg-black border font-semibold sm:text-sm rounded-lg outline-none block w-full p-2.5 text-white border-white"
              placeholder="******"
            />
          </div>
          <div className="self-start">
            <label className="text-sm">
              <input
                className="mr-1"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                }}
              />
              I accept the terms and conditions
            </label>
          </div>
          <div className="w-full self-start">
            <button className="w-full py-2 bg-primary text-white rounded-md font-semibold">
              Load Data
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
