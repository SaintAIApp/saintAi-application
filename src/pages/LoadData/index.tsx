import { useState } from "react";
// import NavBar from "../common/NavBar";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
// import DropDown from "../../components/Select";
// import ChatBox from "../common/Chat/ChatBox";
const LoadData = () => {
  const [uploadFile, setUploadFile] = useState(true);
  const navigate = useNavigate();
  // const [isChatBoxOpen, setIsChatBoxOpen] = useState(true);
  // useEffect(() => {
  //   const isMobileDevice = () => {
  //     return window.innerWidth <= 768;
  //   };

  //   setIsChatBoxOpen(!isMobileDevice());
  // }, []);
//   const handleFileSelect = (val:string)=>{
//     setUploadFile(val==="Custom");
//   }
  return (
    <div className="bg-black">
      {/* <NavBar /> */}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <div className=" relative w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-purple overflow-hidden bg-opacity-70">
        <div className="absolute h-full w-full inset-0 flex z-0">
                            <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 opacity-90 bg-blur"></div>
                            <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 bg-blue-400 opacity-100 bg-blur"></div>
                            {/* <div className="absolute h-44 w-44 bg-shape1 top-[50px] right-0 z-0 bg-blue-400 opacity-100 bg-blur"></div> */}
                            <div className="absolute h-44 w-44 bg-shape1 top-[50px] right-0 z-0 bg-blue-400 opacity-100 bg-blur"></div>
                        </div>
          <form className="p-6 space-y-4 md:space-y-6 sm:p-8 z-10">
            <Link to="/">
              <div className="flex items-center z-10">
                <img className="w-12 h-12 mr-2" src={"/logo.png"} alt="logo" />
                <h1 className="text-primary text-3xl font-heading">S.AI.N.T</h1>
              </div>
            </Link>
            <h1 className="lg:text-lg text-md text-center font-bold text-white">
              Load Data
            </h1>
            <div>
              <p className="text-sm mb-3 font-bold">File Type:</p>
              {/* <DropDown list={["Custom","Default"]} label="Select file type" onChange={(val:string)=>handleFileSelect(val)}/> */}
              <select
                onChange={(val) => {
                  if (val.target.value == "personal") {
                    setUploadFile(true);
                  } else {
                    setUploadFile(false);
                  }
                }}
                className="bg-purple border border-purple_dark text-white sm:text-sm opacity-70 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
              >
                <option disabled>Select a file type</option>
                <option value="personal">Personal</option>
                <option value="default">Default</option>
              </select>
              {uploadFile && (
                <div>
                  <input
                    className={classNames({
                      // button colors
                      "file:bg-purple text-sm opacity-70 file:text-white hover:file:bg-purple_dark":
                        true,
                      // button shape and spacing
                      "file:rounded-lg text-sm file:rounded-tr-none file:rounded-br-none":
                        true,
                      "file:px-4 file:py-2 text-sm file:mr-4 file:border-none":
                        true,
                      // overall input styling
                      "hover:cursor-pointer w-full border rounded-lg text-white mt-4":
                        true,
                    })}
                    id="file_input"
                    type="file"
                  />
                </div>
              )}
            </div>
            <div className="text-sm ">
              <p className="mb-3 font-bold">Private User Key</p>
              <input
                className=" bg-purple  border border-purple_dark text-white sm:text-sm rounded-lg  outline-none block w-full p-2.5 "
                // style={{ border: "0.7px solid black" }}
                type="password"
                placeholder="Enter your private key"
              />
            </div>
            <div>
              <label className="text-sm">
                <input
                  className="mr-1"
                  type="checkbox"
                  //   checked={isChecked}
                  //   onChange={handleCheckboxChange}
                />
                I accept the terms and conditions
              </label>
            </div>{" "}
            <div>
              <button
                onClick={() => {
                  navigate("/activatesaint");
                }}
                type="submit"
                className="w-full text-white bg-primary  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Load
              </button>
            </div>
        {/* <Link
            to={"/activatesaint"}
            className="flex justify-between items-center mt-16"
        >
            <h1 className="mb-3 font-bold text-sm">Activate S.AI.N.T</h1>
            <div className=" ">
            <button
                type="button"
                // onClick={() => setIsChatBoxOpen(!isChatBoxOpen)}
                className="p-1 rounded-full shadow-md"
            >
                <img className="h-8 w-8" src="logo-circle.png" alt="" />
            </button>
            </div>
        </Link> */}
          </form>
          {/* <ChatBox className="" setIsOpen={setIsChatBoxOpen} isOpen={isChatBoxOpen} /> */}
        </div>
      </div>
    </div>
  );
};

export default LoadData;
