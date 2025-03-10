import React, { useState, useRef, useEffect, useCallback } from "react";
import ChatItem from "../../components/Chat/ChatItem";
import { IoIosSend } from "react-icons/io";
import { BiConversation } from "react-icons/bi";
import logo from "../../assets/saintailogo.png";
import snakeGif from "../../assets/solver_hamilton.gif";

import TypewriterEffect from "../../components/TypeWriting";

import useFileService from "../../hooks/useFileService";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ChatButton from "../../components/ChatButton";
import { updateIsChatCommunity } from "../../redux/slices/widgetSlice";

const ChatComponent: React.FC<{
  isOpen: boolean;
  totalUnreadMessage: number;
  className?: string;
  closable?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ className = "", isOpen, totalUnreadMessage }) => {
  const user = useAppSelector((state) => state.auth.user);
  const [chats, setChats] = useState<any[]>([]);
  const [chat, setChat] = useState("");
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [popupSnake, setPopupSnake] = useState(false);
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

  const fetchChatHistory = useCallback(async () => {
    try {
      setIsHistoryLoading(true);
      const userId = user?._id;
      if (!userId) return;
      const res = await getChatHistoryTrade(userId);
      if (res.status === 200) {
        setChats(res.data.data);
      }
    } catch (error) {
      setChats([]);
      console.log(error);
    } finally {
      setIsHistoryLoading(false);
    }
  }, [getChatHistoryTrade, user]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchChatHistory();
    };
    fetchData();
  }, [fetchChatHistory]);

  const handleSendMessage = async () => {
    if (chat.trim() === "") return;
    setErrorMessage("");
    try {
      setIsResponseLoading(true);
      setChats((prev) => [...prev, { user: chat, agent: "Processing..." }]);
      const userId = user?._id;
      if (!userId) return;
      const res = await sendMessageTrade(chat, userId);
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
        if (res.data?.data === "Success running automate mining") {
          setPopupSnake(true)
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error occurred while processing");
      setChats((prev) => prev.slice(0, -1)); // Remove the "Processing..." message
    } finally {
      setIsResponseLoading(false);
    }
  };
  const dispatch = useAppDispatch();

  return (
    <div
      className={`flex flex-col flex-shrink-0 bg-[#000000]  rounded-xl  w-full  ${className} h-full md:h-full  md:mt-0`}
      style={{
        border: "1.2px solid #333",
        visibility: isOpen ? "visible" : "hidden",
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-700 flex justify-between items-center">
        <img className="h-8 object-contain" src={logo} alt="S.AI.N.T Logo" />

        <ChatButton
          onClick={() => dispatch(updateIsChatCommunity({ isChatCommunity: true }))}
          image="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-and-lines-1/2/11-512.png"
          alt="Halo Button"
          badge={totalUnreadMessage}
          position={{
            right: "5"
          }}
        />
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
            className="flex-grow bg-black disabled:bg-gray-300 text-white border border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#016FCB]"
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
      <dialog id="my_modal_1" className={`modal ${popupSnake === true ? "modal-open" : ""}  `}>
        <div className="bg-black border border-grey p-8 rounded-lg flex-col flex items-center justify-center">
          <img src={snakeGif} />
          <label className="font-bold mt-5">Success Automated Mining Running</label>
          <button className="px-6 py-1 rounded-md bg-primary text-white mt-4" onClick={() => setPopupSnake(false)}>Close</button>
        </div>
      </dialog>
    </div>
  );
};

export default ChatComponent;
