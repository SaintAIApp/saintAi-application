import React, { useState, useRef, useEffect } from "react";
import ChatItem from "../../components/Chat/ChatItem";
import { IoIosSend } from "react-icons/io";
import { BiConversation } from "react-icons/bi";
import logo from "../../assets/saintailogo.png";
import TypewriterEffect from "../../components/TypeWriting";

import useFileService from "../../hooks/useFileService";
import { useAppSelector } from "../../redux/hooks";

const ChatComponent: React.FC<{
  isOpen: boolean;
  className?: string;
  closable?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ className = "", isOpen }) => {
  const user = useAppSelector((state) => state.auth.user);
  const [chats, setChats] = useState<any[]>([]);
  const [chat, setChat] = useState("");
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const chatBodyRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const { sendMessageTrade, getChatHistoryTrade } = useFileService();

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chats, errorMessage]);
  useEffect(() => {
    scrollToBottom();
  }, [chats]);
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchChatHistory();
    };
    fetchData();
  }, []);

  const fetchChatHistory = async () => {
    try {
      setIsHistoryLoading(true);
      const res = await getChatHistoryTrade(user?._id!);
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
    setErrorMessage("");
    try {
      setIsResponseLoading(true);
      setChats((prev) => [...prev, { user: chat, agent: "Processing..." }]);
      const res = await sendMessageTrade(chat, user?._id!);
      if (res.status === 200) {
        setChats((prev) => {
          const newChats = [...prev];
          newChats[newChats?.length - 1] = {
            user: chat,
            agent: res.data?.data,
          };
          return newChats;
        });
        setChat("");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error occurred while processing");
      setChats((prev) => prev.slice(0, -1)); // Remove the "Processing..." message
    } finally {
      setIsResponseLoading(false);
    }
  };

  return (
    <div
      className={` w-full inset-0  md:inset-auto md:right-10 md:bottom-10  md:h-[90vh] 
                  flex flex-col bg-dark shadow-2xl rounded-xl  ${className}`}
      style={{
        border: "1.2px solid #333",
        visibility: isOpen ? "visible" : "hidden",
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-700 flex justify-between items-center">
        <img className="h-8 object-contain" src={logo} alt="S.AI.N.T Logo" />
      </div>

      <div ref={chatBodyRef} className="flex-grow overflow-y-auto px-4 py-2">
        {isHistoryLoading && (
          <div className="flex items-center justify-center h-full flex-col">
            <h1>Loading chat history...</h1>
          </div>
        )}
        {chats?.length === 0 && !isHistoryLoading && (
          <div className="flex items-center justify-center h-full flex-col">
            <BiConversation className="text-lg md:text-3xl" />
            <h1>Start the conversation with SaintAI</h1>
          </div>
        )}
        {!isHistoryLoading &&
          chats?.map((chat, index) => (
            <div key={index}>
              <ChatItem isHistory={true} sender={"Me"} message={chat.user} />
              <ChatItem
                isHistory={true}
                sender={"SAINTAI"}
                message={chat.agent}
              />
            </div>
          ))}
        {errorMessage && (
          <div className="text-red-500">
            <TypewriterEffect text={errorMessage} />
          </div>
        )}
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
              if (e.key === "Enter" && !e.shiftKey && !isResponseLoading) {
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
            <IoIosSend fill="green" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;