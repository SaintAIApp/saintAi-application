import React, { useState, useRef, useEffect } from "react";
import ChatItem from "./ChatItem";
import { IoIosSend } from "react-icons/io";
import { BiConversation } from "react-icons/bi";
import logo from "../../assets/saintailogo.png";

import useFileService from "../../hooks/useFileService";




const ChatBox: React.FC<{
  isOpen: boolean;
  className?: string;
  closable?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ className = "", isOpen,setIsOpen }) => {
  const [chats, setChats] = useState<any[]>([]);
  const [chat, setChat] = useState("");
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResponseLoading, setIsResponseLoading] = useState(false);

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const {  sendMessageTrade, getAllFiles, getChatHistory } = useFileService();

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chats]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchData = async () => {
      const uploadId = localStorage.getItem("UPLOAD_ID");
      if (uploadId) {
        await fetchChatHistory(uploadId);
      }
      else{
        fetchUploadId();
      }
    };
    fetchData();
  }, []);

  const fetchUploadId = async () => {
    setIsLoading(true);
    try {
      const res = await getAllFiles();
      if (res.status === 200) {
        res.data?.data?.map((e:any)=>{
          if(e.name==="SAINT_AI"){
            localStorage.setItem("UPLOAD_ID",e._id);
          }
        }) 
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChatHistory = async (uploadId: string) => {
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
  };

  const handleSendMessage = async () => {
    if (chat.trim() === "") return;

    try {
      // if (!uploadId) {
      //   const fileResponse = await fetch(SaintSampleFile);
      //   const fileBlob = await fileResponse.blob();
      //   const formData = new FormData();
      //   formData.append("file", fileBlob);
      //   formData.append("name", "SAINT_AI");
      //   formData.append("featureId", import.meta.env.VITE_UPLOAD_DOC_FEATURE_ID);
      //   try {
      //     const res = await uploadFile(formData);
      //     uploadId = res.data?.data?._id;
      //     localStorage.setItem("UPLOAD_ID", uploadId!);
      //     localStorage.setItem("AGENT_ID", res.data?.data?._agentId);
      //   } catch (error:any) {
      //     notify(error.message,false);
      //     return;
      //   }
      //   // await fetchFile(uploadId!);
      // }

      setIsResponseLoading(true);
      setChats((prev) => [...prev, { user: chat, agent: "Processing..." }]);
      
      const res = await sendMessageTrade( chat);
      
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

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div
      className={`fixed inset-0  md:inset-auto md:right-10 md:bottom-10 md:w-[400px] md:h-[80vh] 
                  flex flex-col bg-dark shadow-2xl rounded-xl z-[10005] ${className}`}
      style={{
        border: "1.2px solid #333",
        visibility: isOpen ? "visible" : "hidden",
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-700 flex justify-between items-center">
        <img className="h-8 object-contain" src={logo} alt="S.AI.N.T Logo" />
        {/* {uploadData?.createdAt && <span className='text-sm text-slate-300'>Uploaded: {format(uploadData.createdAt)}</span>} */}
        {
          window.innerWidth<=768 && <button onClick={()=>{setIsOpen && setIsOpen(false)}} className="text-md text-white ">Close X</button>
        }
      </div>
      
      <div 
        ref={chatBodyRef}
        className="flex-grow overflow-y-auto px-4 py-2"
      >
        {isHistoryLoading && <div className='flex items-center justify-center h-full flex-col'><h1>Loading chat history...</h1></div>}
        {chats.length === 0 && !isHistoryLoading && (
          <div className='flex items-center justify-center h-full flex-col'>
            <BiConversation className='text-lg md:text-3xl'/>
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
            message={ chat.agent}
          />
          </div>
        ))}
      </div>
      
      <div className="flex-shrink-0 p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            disabled={isResponseLoading}
            placeholder="Type your message"
            type="text"
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !isResponseLoading) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-grow bg-black disabled:bg-gray-300 text-white border border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            disabled={isResponseLoading}
            onClick={handleSendMessage}
            className="flex-shrink-0 rounded-full flex items-center justify-center p-2 bg-primary disabled:bg-gray-300 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <IoIosSend fill='green' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;