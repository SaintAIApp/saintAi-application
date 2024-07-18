import React, { useEffect, useState, useRef } from 'react';
import useFileService from '../../hooks/useFileService';
import { Upload } from '../../types/data';
import { IoIosSend } from 'react-icons/io';
import {format} from 'timeago.js'
import { BiConversation } from 'react-icons/bi';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

interface ChatComponentProps {
  uploadId: string;
  setSelectedFileId?:any;
  setShowSideBar?:any;
  selectedFileId?:any
}

const ChatComponent: React.FC<ChatComponentProps> = ({ uploadId,setSelectedFileId,setShowSideBar,selectedFileId }) => {
  const [chats, setChats] = useState<any[]>([]);
  const [curChat, setCurChat] = useState("");
  const [isHistoryLoading,setIsHistoryLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [uploadData, setUploadData] = useState<Upload | null>(null);
  const { getFile, getChatHistory, sendMessage } = useFileService();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const fetchFile = async () => {
      setIsLoading(true);
      try {
        const res = await getFile(uploadId);
        if (res.status === 200) {
          setUploadData(res.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchChatHistory = async () => {
      try {
        setIsHistoryLoading(true)
        const res = await getChatHistory(uploadId);
        if (res.status === 200) {
          setChats(res.data.data);
        }
      } catch (error) {
        setChats([]);
        console.log(error);
      }
      finally{
        setIsHistoryLoading(false);

      }
    };

    fetchFile();
    fetchChatHistory();
  }, [uploadId]);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (curChat !== "") {
      try {
        setIsResponseLoading(true);
        setChats((prev) => [...prev, { user: curChat, agent: "Processing..." }]);
        
        const res = await sendMessage(uploadId, curChat);
        
        if (res.status === 200) {
          setChats((prev) => {
            const newChats = [...prev];
            newChats[newChats.length - 1] = { user: curChat, agent: res.data.data };
            return newChats;
          });
          setCurChat("");
        }
      } catch (error) {
        console.log(error);
        setChats((prev) => {
          const newChats = [...prev];
          newChats[newChats.length - 1] = { user: curChat, agent: "Error occurred while processing" };
          return newChats;
        });
      } finally {
        setIsResponseLoading(false);
      }
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className={`flex max-h-[90vh] min-h-[90vh] rounded-lg flex-col h-full bg-dark ${selectedFileId && "mt-20"}  md:mt-0`}>

      <header className="bg-dark shadow-sm items-center p-4 flex justify-between">
        <h1 className="text-xl font-semibold text-white flex items-center">  {window.innerWidth<=700 && <button onClick={()=>{setSelectedFileId(null);setShowSideBar(true)}}> <ChevronLeftIcon height={20} width={20}/> </button>  } File: {uploadData?.name}</h1>
        {uploadData?.createdAt && <h1 className='text-sm text-slate-300'>Uploaded:{format(uploadData?.createdAt)}</h1>}
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 pb-24">
        {
          isHistoryLoading && <div className='flex items-center justify-center h-full flex-col '><h1>Loading chat history...</h1>   </div>
        }
        {
          chats.length==0 && !isHistoryLoading && <div className='flex items-center justify-center h-full flex-col'><BiConversation className='text-lg md:text-3xl'/> <h1>Start the conversation with SaintAI</h1>   </div>
        }
        {!isHistoryLoading && chats.map((chat, index) => (
          <div key={index} className="mb-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start justify-end">
                <div className="rounded-lg p-3 bg-black max-w-3/4">
                  <p className="text-sm font-semibold mb-1 text-white">You</p>
                  <div className="text-gray-200">{chat.user}</div>
                </div>
                <div className="flex-shrink-0 ml-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black">
                    U
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary bg-opacity-50">
                    S
                  </div>
                </div>
                <div className="rounded-lg p-3 bg-primary max-w-3/4 bg-opacity-50">
                  <p className="text-sm font-semibold mb-1 text-white">SAINTAI</p>
                  <div className="text-gray-200" dangerouslySetInnerHTML={{ __html: chat.agent }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
      
      <footer className="bg-dark p-4 w-full">
        <div className="flex items-center max-w-screen-xl mx-auto">
          <input
            disabled={isResponseLoading}
            type="text"
            value={curChat}
            onChange={(e) => setCurChat(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isResponseLoading) {
                handleSendMessage();
              }
            }}
            placeholder="Type your message..."
            className="flex-1 bg-black disabled:bg-gray-300 text-white border border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            disabled={isResponseLoading}
            onClick={handleSendMessage}
            className="bg-primary disabled:bg-gray-300 text-white px-4 py-3 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <IoIosSend fill='green' />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatComponent;