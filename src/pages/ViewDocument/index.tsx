import React, { useEffect, useState, useRef } from "react";
import useFileService from "../../hooks/useFileService";

import { IoIosSend } from "react-icons/io";
import { BiConversation } from "react-icons/bi";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/saintailogo.png";

interface ChatComponentProps {
  setSelectedFileId?: any;
  setShowSideBar?: any;
  selectedFileId?: string | null;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  setSelectedFileId,
  setShowSideBar,
  selectedFileId,
}) => {
  const [chats, setChats] = useState<any[]>([]);
  const [curChat, setCurChat] = useState("");
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const { getFile, getChatHistory, sendMessage } = useFileService();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const fetchFile = async () => {
      if (!selectedFileId) return;
      setIsLoading(true);
      try {
        const res = await getFile(selectedFileId);
        if (res.status === 200) {
          // Handle file data if needed
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchChatHistory = async () => {
      if (!selectedFileId) return;
      try {
        setIsHistoryLoading(true);
        const res = await getChatHistory(selectedFileId);
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

    fetchFile();
    fetchChatHistory();
  }, [getChatHistory, getFile, selectedFileId]);

  useEffect(() => {
    scrollToBottom();
  }, []); // Scroll to bottom when component mounts

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // Small delay to ensure content is rendered
  };

  const handleSendMessage = async () => {
    if (!selectedFileId || curChat.trim() === "") return;
    try {
      setIsResponseLoading(true);
      setChats((prev) => [
        ...prev,
        { user: curChat, agent: "Processing..." },
      ]);
      scrollToBottom(); // Scroll after adding user message

      const res = await sendMessage(selectedFileId, curChat);

      if (res.status === 200) {
        setChats((prev) => {
          const newChats = [...prev];
          newChats[newChats.length - 1] = {
            user: curChat,
            agent: res.data.data,
          };
          return newChats;
        });
        setCurChat("");
        scrollToBottom(); // Scroll after adding AI response
      }
    } catch (error) {
      console.log(error);
      setChats((prev) => {
        const newChats = [...prev];
        newChats[newChats.length - 1] = {
          user: curChat,
          agent: "Error occurred while processing",
        };
        return newChats;
      });
      scrollToBottom(); // Scroll after adding error message
    } finally {
      setIsResponseLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div
      className={`inset-0 md:inset-auto md:bottom-10 w-full md:h-[90vh] md:mt-2
                    flex flex-col bg-transparent shadow-2xl rounded-xl ${selectedFileId ? "mt-20" : ""
        } md:mt-0`}
      style={{
        border: "1.2px solid #333",
      }}
    >
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => {
              setSelectedFileId(null);
              setShowSideBar(true);
            }}
            className="mr-2 block md:hidden"
          >
            <ChevronLeftIcon height={20} width={20} />
          </button>
          <img className="h-8 object-contain" src={logo} alt="S.AI.N.T Logo" />
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto px-4 py-2 md:pb-0 pb-20">
        {isHistoryLoading && (
          <div className="flex items-center justify-center h-full flex-col">
            <h1>Loading chat history...</h1>
          </div>
        )}
        {chats.length == 0 && !isHistoryLoading && (
          <div className="flex items-center justify-center h-full flex-col">
            <BiConversation className="text-lg md:text-3xl" />
            <h1>
              {selectedFileId
                ? "Start the conversation with SaintAI"
                : "Please upload a new file or select a file to start the conversation"}
            </h1>
          </div>
        )}
        {!isHistoryLoading &&
          chats.map((chat, index) => (
            <div key={index} className="mb-4">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start justify-end">
                  <div className="rounded-lg p-3 bg-black max-w-3/4">
                    <p className="text-sm font-semibold mb-1 text-white">You</p>
                    <div className="text-gray-200">{chat.user}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="rounded-lg p-3 bg-primary max-w-3/4 bg-opacity-50">
                    <p className="text-sm font-semibold mb-1 text-white">
                      SAINTAI
                    </p>
                    <div
                      className="text-gray-200"
                      dangerouslySetInnerHTML={{ __html: chat.agent }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 p-4 border-t border-gray-700 fixed bottom-0 bg-black w-full md:relative md:bg-transparent">
        <div className="flex items-center space-x-2">
          <input
            disabled={isResponseLoading || !selectedFileId}
            type="text"
            value={curChat}
            onChange={(e) => setCurChat(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isResponseLoading && selectedFileId) {
                handleSendMessage();
              }
            }}
            placeholder="Type your message..."
            className="flex-grow bg-black disabled:bg-gray-300 text-white border border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            disabled={isResponseLoading || !selectedFileId}
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