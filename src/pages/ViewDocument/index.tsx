import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useFileService from '../../hooks/useFileService';
import { Upload } from '../../types/data';
import { IoIosSend } from 'react-icons/io';

const Index: React.FC = () => {
  const { uploadId } = useParams<string>();
  const [chats, setChats] = useState<any[]>([]);
  const [curChat, setCurChat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadData, setUploadData] = useState<Upload | null>(null);
  const { getFile, getChatHistory, sendMessage } = useFileService();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const fetchFile = async () => {
      setIsLoading(true);
      try {
        const res = await getFile(uploadId || '');
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
        const res = await getChatHistory(uploadId || "");
        if (res.status === 200) {
          console.log(res.data.data);
          setChats(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFile();
    fetchChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (curChat !== "") {
      try {
        const res = await sendMessage(uploadId || "", curChat);
        if (res.status === 200) {
          setChats((prev) => [...prev, { user: curChat, agent: res.data.data }]);
          setCurChat("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <header className="bg-gray-800 shadow-sm p-4">
        <h1 className="text-xl font-semibold text-white">File: {uploadData?.name}</h1>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 pb-24">
        {chats.map((chat, index) => (
          <div key={index} className="mb-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start justify-end">
                <div className="rounded-lg p-3 bg-slate-600 max-w-3/4">
                  <p className="text-sm font-semibold mb-1 text-white">You</p>
                  <div className="text-gray-200">{chat.user}</div>
                </div>
                <div className="flex-shrink-0 ml-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-600">
                    U
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary">
                    S
                  </div>
                </div>
                <div className="rounded-lg p-3 bg-primary max-w-3/4">
                  <p className="text-sm font-semibold mb-1 text-white">SAINTAI</p>
                  <div className="text-gray-200" dangerouslySetInnerHTML={{ __html: chat.agent }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
      
      <footer className="bg-gray-800 p-4 w-full fixed bottom-0 left-0 right-0">
        <div className="flex items-center max-w-screen-xl mx-auto">
          <input
            type="text"
            value={curChat}
            onChange={(e) => setCurChat(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <IoIosSend />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Index;