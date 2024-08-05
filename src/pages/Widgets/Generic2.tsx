import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useLocation } from "react-router-dom";
import SaintSampleFile from "../../assets/saintai.pdf";
import logoCircle from "../../assets/saintailogo.png";
import ChatItem from "../../components/Chat/ChatItem";
import { Column } from "../../components/Column";
import Loader from "../../components/Loader";
import useFileService from "../../hooks/useFileService";
import useFinanceService from "../../hooks/useFinance";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateCurCategory } from "../../redux/slices/widgetSlice";
import { notify } from "../../utils/notify";

interface ChatMessage {
  user: string;
  agent: string;
}

const Generic2: React.FC = () => {
  const dispatch = useAppDispatch();
  const { widget } = useAppSelector((state) => state);
  const curCategory = widget.curCategory;
  const location = useLocation();
  const [list, setList] = useState<any[]>([]);
  const { getStocksData, getCryptoData, getNewsData } = useFinanceService();
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

  // Chat state
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [chat, setChat] = useState<string>("");
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(false);
  const [isResponseLoading, setIsResponseLoading] = useState<boolean>(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { uploadFile, sendMessage, getAllFiles, getChatHistory } = useFileService();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id: string): number => list.findIndex((task) => task._id === id);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    setList((e) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(e, originalPos, newPos);
    });
  };

  const fetchCategoryData = useCallback(async (category: string) => {
    try {
      setIsDataLoading(true);
      let res;
      switch (category) {
        case "stocks":
          res = await getStocksData();
          break;
        case "crypto":
          res = await getCryptoData();
          break;
        case "news":
          res = await getNewsData();
          break;
        default:
          dispatch(
            updateCurCategory({
              curCategory: "stocks",
              genericType: "generic1",
            })
          );
          res = await getStocksData();
      }
      if (res) {
        setList(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDataLoading(false);
    }
  }, [dispatch, getCryptoData, getNewsData, getStocksData]);

  const fetchUploadId = useCallback(async () => {
    try {
      const res = await getAllFiles();
      if (res.status === 200) {
        res.data?.data?.forEach((e: { name: string; _id: string }) => {
          if (e.name === "SAINT_AI") {
            localStorage.setItem("UPLOAD_ID", e._id);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [getAllFiles]);

  const fetchChatHistory = useCallback(async (uploadId: string) => {
    try {
      setIsHistoryLoading(true);
      const res = await getChatHistory(uploadId);
      if (res.status === 200) {
        setChats(res.data.data);
      }
    } catch (error) {
      setChats([]);
      console.log(error);
    } finally {
      setIsHistoryLoading(false);
    }
  }, [getChatHistory]);

  const handleSendMessage = async () => {
    if (chat.trim() === "") return;

    let uploadId = localStorage.getItem("UPLOAD_ID");
    try {
      if (!uploadId) {
        const fileResponse = await fetch(SaintSampleFile);
        const fileBlob = await fileResponse.blob();
        const formData = new FormData();
        formData.append("file", fileBlob);
        formData.append("name", "SAINT_AI");
        formData.append("featureId", import.meta.env.VITE_UPLOAD_DOC_FEATURE_ID);
        try {
          const res = await uploadFile(formData);
          uploadId = res.data?.data?._id;
          if (uploadId) {
            localStorage.setItem("UPLOAD_ID", uploadId);
            localStorage.setItem("AGENT_ID", res.data?.data?._agentId);
          }
        } catch (error: any) {
          notify(error.message, false);
          return;
        }
      }

      if (!uploadId) {
        notify("Failed to get upload ID", false);
        return;
      }

      setIsResponseLoading(true);
      setChats((prev) => [...prev, { user: chat, agent: "Processing..." }]);

      const res = await sendMessage(uploadId, chat);

      if (res.status === 200) {
        setChats((prev) => {
          const newChats = [...prev];
          newChats[newChats.length - 1] = { user: chat, agent: res.data.data };
          return newChats;
        });
        setChat("");
      }
    } catch (error) {
      console.log(error);
      setChats((prev) => {
        const newChats = [...prev];
        newChats[newChats.length - 1] = { user: chat, agent: "Error occurred while processing" };
        return newChats;
      });
    } finally {
      setIsResponseLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    if (category !== null) {
      fetchCategoryData(category);
    } else {
      fetchCategoryData(curCategory);
    }

    const fetchData = async () => {
      const uploadId = localStorage.getItem("UPLOAD_ID");
      if (uploadId) {
        await fetchChatHistory(uploadId);
      } else {
        await fetchUploadId();
      }
    };
    fetchData();
  }, [curCategory, fetchCategoryData, fetchChatHistory, fetchUploadId, location.search]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <section className="overflow-x-hidden">
      {isDataLoading ? (
        <Loader />
      ) : (
        <div className="flex ">
          <div className="left w-1/2">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
            >
              <Column
                curCategory={curCategory}
                list={list}
              />
            </DndContext>
          </div>
          <div className="right self-end h-[75vh] mb-10   rounded-tl-md fixed right-0 top-0 bottom-0 w-1/2 bg-dark flex flex-col">
            <div className="flex flex-col h-full overflow-hidden">
              <div className="top px-3 flex py-3 justify-between">
                <img
                  className="h-8 object-contain md:h-8"
                  src={logoCircle}
                  alt="S.AI.N.T Logo"
                />
              </div>
              <div
                ref={chatBodyRef}
                className="flex-grow overflow-y-auto px-4 py-2"
              >
                {isHistoryLoading && <div className='flex items-center justify-center h-full flex-col'><h1>Loading chat history...</h1></div>}
                {chats.length === 0 && !isHistoryLoading && (
                  <div className='flex items-center justify-center h-full flex-col'>
                    <h1>Start the conversation with SaintAI</h1>
                  </div>
                )}
                {!isHistoryLoading && chats.map((chat, index) => (
                  <div key={index}>
                    <ChatItem
                      sender={"Me"}
                      message={chat.user}
                    />
                    <ChatItem
                      sender={"SAINTAI"}
                      message={chat.agent}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-[#292929] py-2 px-4 fixed bottom-0 w-full">
            <div className="flex items-center justify-center">
              <input
                ref={inputRef}
                disabled={isResponseLoading}
                value={chat}
                onChange={(e) => setChat(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !isResponseLoading) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="bg-black py-1 outline-none rounded-full px-3 flex-grow mr-1 z-30"
                placeholder="Type your message here..."
              />
              <button
                onClick={handleSendMessage}
                disabled={isResponseLoading}
                className="bg-primary rounded-full text-white px-4 py-1 flex items-center justify-center"
              >
                <IoIosSend fill='green' />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Generic2;