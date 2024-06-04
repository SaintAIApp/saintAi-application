import { useState } from "react";
import classNames from "classnames";
import { Link,  } from "react-router-dom";
const LoadData = () => {
  const [uploadFile, setUploadFile] = useState(true);
  // const navigate = useNavigate();
  const [privateKey, setPrivateKey] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  const handleLoadFile = (e:any)=>{
      try {
        e.preventDefault()
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        
      }
      finally{
        // setIsLoading(false);
      }
  }
  return (
    <div className="mb-4">
      <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
        <div className=" relative w-full rounded-3xl shadow-lg md:mt-0 sm:max-w-md xl:p-0 form border-purple_dark border-[0.7px] overflow-hidden bg-purple bg-opacity-70">
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
                      "file:bg-purple text-sm opacity-70 file:text-white hover:file:bg-purple_dark":
                        true,
                      "file:rounded-lg text-sm file:rounded-tr-none file:rounded-br-none":
                        true,
                      "file:px-4 file:py-2 text-sm file:mr-4 file:border-none":
                        true,
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
               type="password"
               placeholder="Enter your private key"
                value={privateKey}
                onChange={(e) => {
                  setPrivateKey(e.target.value);
                }}
                className=" bg-purple relative  border border-purple_dark text-white sm:text-sm rounded-lg  outline-none  w-full p-2.5 "
              />
            </div>
            <div className="relative">
              <label className="text-sm">
                <input
                  className="mr-1"
                  type="checkbox"
                    checked={termsAccepted}
                    onChange={(e)=>{setTermsAccepted(e.target.checked)}}
                />
                I accept the terms and conditions
              </label>
            </div>{" "}
            <div className="relative">
              <button
                disabled={isLoading || !termsAccepted}
                onClick={handleLoadFile}
                type="submit"
                className="w-full text-white bg-primary  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-slate-500"
              >
               {isLoading?"Loading...":"Load"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoadData;
