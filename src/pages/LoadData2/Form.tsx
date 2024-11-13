
import FileDropzone from "../../components/FileUpload";
const Form = ({handleLoadData,handleFileSelect,file,setFileName,fileName}:{
    handleLoadData:(e: React.FormEvent) => Promise<void>,
    handleFileSelect:(selectedFile: File) => void
    file:File | null,
    setFileName:React.Dispatch<React.SetStateAction<string>>,
    fileName:string

}) => {
  return (
    <div className='border mt-0.5 px-6 py-2 rounded-xl border-[#333] h-full pb-[20px]'>
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
                    className="bg-black border font-semibold sm:text-sm rounded-lg outline-none block w-full p-2.5 text-white border-[#333]"
                    placeholder="Enter file name"
                  />
                </div>
                <div className="w-full self-start my-2">
                  <button
                    type="submit"
            className="w-full py-2 bg-[#333] text-white rounded-md font-semibold relative"
                  >
                    Load Data
                  </button>
                </div>
              </form>
    </div>
  );
};

export default Form;