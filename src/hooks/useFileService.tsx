
import useAxios from "./useAxios";
import { useCallback } from "react";
import useMineService from "./useMine";
import { detailMine } from "../redux/slices/mineSlice";
import { useDispatch } from "react-redux";

const useFileService = () => {
  const api = useAxios();
  const dispatch = useDispatch();
  const { getMineDetail } = useMineService();
  const uploadFile = useCallback(async (formData: FormData) => {
    try {
      console.log(formData);
      const res = await api.post("/upload", formData);
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  }, [api]);

  const getFile = useCallback(async (uploadId: string) => {
    try {
      const res = await api.get("/upload/" + uploadId);
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  }, [api]);

  const deleteFile = useCallback(async (uploadId: string) => {
    try {
      const res = await api.delete("/upload/" + uploadId);
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  }, [api]);

  const getAllFiles = useCallback(async () => {
    try {
      const res = await api.get("/upload/");
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  }, [api]);

  const getChatHistory = useCallback(async (uploadId: string) => {
    try {
      const res = await api.get("/upload/get-chat-history/" + uploadId);
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  }, [api]);

  const sendMessage = useCallback(async (uploadId: string, body: string) => {
    try {
      const res = await api.post("/upload/send-message/" + uploadId, {
        message: body,
      });
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  }, [api]);

  const sendMessageTrade = useCallback(async (body: string, userId: string) => {
    try {
      const res = await api.post("/upload/chat_with_trade_data", {
        user_msg: body,
        user_id: userId,
      });

      const mine = await getMineDetail(userId);
      dispatch(detailMine({ mine: mine.data.data }));
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  }, [api, getMineDetail, dispatch]);

  const getChatHistoryTrade = useCallback(async (user_id: string) => {
    try {
      const res = await api.post("/upload/get_chat_history_trade_data", {
        user_id,
      });
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  }, [api]);

  return {
    uploadFile,
    getFile,
    getAllFiles,
    getChatHistory,
    sendMessage,
    deleteFile,
    sendMessageTrade,
    getChatHistoryTrade,
  };
};

export default useFileService;
