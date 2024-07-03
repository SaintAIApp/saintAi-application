
import useAxios from "./useAxios";
const useFileService = () => {
  const api = useAxios();
  const uploadFile = async (formData:FormData) => {
      try {
        console.log(formData)
        const res = await api.post("/upload",formData);
        return res;
      } catch (error: any) {
        throw new Error(error.response?.data?.message||"Something went wrong")
      }
  };
  const getFile = async (uploadId:string) => {
    try {
      const res = await api.get("/upload/"+uploadId);
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message||"Something went wrong")
    }
    };
    const getAllFiles = async () => {
      try {
        const res = await api.get("/upload/");
        return res;
      } catch (error: any) {
        throw new Error(error.response?.data?.message||"Something went wrong")
      }
    };
    const getChatHistory = async (uploadId:string) => {
      try {
        const res = await api.get("/upload/get-chat-history/"+uploadId);
        return res;
      } catch (error: any) {
        throw new Error(error.response?.data?.message||"Something went wrong")
      }
    };
    const sendMessage = async (uploadId:string,body:string) => {
      try {
        const res = await api.post("/upload/send-message/"+uploadId,{message:body});
        return res;
      } catch (error: any) {
        throw new Error(error.response?.data?.message||"Something went wrong")
      }
    };


  
  return { uploadFile,getFile,getAllFiles,getChatHistory,sendMessage};
};
export default useFileService;
