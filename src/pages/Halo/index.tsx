
import { useCallback, useEffect, useRef, useState } from "react";
import "./index.css";
import socket from "../../services/socket";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IoIosSend } from "react-icons/io";
import { updateTotalUnreadMessage } from "../../redux/slices/widgetSlice";
import { debounce } from "lodash";
type User = {
  userId: string;
  username: string;
};
const Halo = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState(""); 
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);

  const [unreadCount, setUnreadCount] = useState(0);
  const handleStopTyping = debounce(() => {
    if (user?._id) {
      socket.emit("stopTyping", { userId: user._id, groupId: "dkashkdjs" });
      setIsTyping(false);
    }
  }, 2000);

  const handleTyping = useCallback(() => {
    if (user?._id) {
      socket.emit("typing", { userId: user._id, groupId: "dkashkdjs", username: user.username });
      setIsTyping(true);
      handleStopTyping();
    }
  }, [user, handleStopTyping]);

  useEffect(() => {
    const markAsRead = (messageId: string) => {
      if (user?._id) {
        socket.emit("readMessage", { messageId, userId: user._id, username: user.username });
      }
    };

    const groupId = "dkashkdjs";

    socket.emit("joinGroup", groupId);


    socket.emit("getMessages", groupId, (fetchedMessages: any[]) => {
      setMessages(fetchedMessages);
      if (isWindowFocused) {
        const unreadMessages = fetchedMessages.filter(message =>
          !message.readBy?.includes(user?._id) && message.sender !== user?._id
        );
        setUnreadCount(unreadMessages.length);
        dispatch(updateTotalUnreadMessage({ totalUnreadMessage: unreadMessages.length }));

        if (isWindowFocused) {
          unreadMessages.forEach((message) => {
            markAsRead(message._id);
          });
        }
      }
    });

    socket.on("typing", (typingUser) => {
      console.log(typingUser);
      if (typingUser.userId !== user?._id) {
        setTypingUser(typingUser?.username || "Someone"); 
      }
    });


    socket.on("stopTyping", () => {
      setTypingUser(null); 
    });


    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
      setIsTyping(false);
      setTypingUser(null);
      if (isWindowFocused && message.sender !== user?._id) {
        markAsRead(message._id);
      }

      if (message.sender !== user?._id && !message.readBy?.includes(user?._id)) {
        setUnreadCount(prev => prev + 1);
        dispatch(updateTotalUnreadMessage({ totalUnreadMessage: unreadCount + 1 }));
      }

      if (isWindowFocused && message.sender !== user?._id) {
        markAsRead(message._id);
        setUnreadCount(prev => prev - 1);
        dispatch(updateTotalUnreadMessage({ totalUnreadMessage: unreadCount - 1 }));
      }
    });

    const handleFocus = () => {
      setIsWindowFocused(true);
      if (messages.some(message => !message.readBy?.includes(user?._id) && message.sender !== user?._id)) {
        messages.forEach((message) => {
          if (!message.readBy?.includes(user?._id) && message.sender !== user?._id) {
            markAsRead(message._id);
          }
        });
        setUnreadCount(0);
        dispatch(updateTotalUnreadMessage({ totalUnreadMessage: 0 }));
      }
    };
    const handleBlur = () => setIsWindowFocused(false);

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      socket.off("newMessage");
      socket.off("typing");
      socket.off("stopTyping");
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };

  }, [isWindowFocused, user, isTyping, dispatch, unreadCount]);


  const sendMessage = () => {
    if (newMessage.trim() && user) {
      socket.emit("sendMessage", {
        content: newMessage,
        sender: user._id,
        senderName: user.username,
        groupId: "dkashkdjs",
      });
      setNewMessage(""); 
      setIsTyping(false);
      setTypingUser(null);
    }
  };
  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);

    if (e.target.value) {
      if (!isTyping) {
        setIsTyping(true);
        handleTyping();
      }
    } else {
      setIsTyping(false); 
      socket.emit("stopTyping", { userId: user?._id, groupId: "dkashkdjs" });
    }
  };
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };
  return (
    <section className="overflow-x-hidden   flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 ">
      <div className="w-full h-full rounded-lg flex flex-col">
        <div className="h-[55vh] overflow-y-auto" ref={chatBodyRef}>
          {messages.map((message) => (
            <div
              key={message._id}
              className={`flex items-start gap-2.5 ${message.sender === user?._id ? "justify-end" : "justify-start"
                }`}
            >
              <div className="h-8 w-8 rounded-full bg-primary p-3 flex items-center justify-center">
                <label className="text-white uppercase">{message.senderName ? message.senderName.slice(0, 2) : "NA"}</label>
              </div>


              {message.sender === user?._id ? (
                <div className="flex flex-col gap-1 w-auto max-w-[320px]">
                  <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      You
                    </span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <p className="text-sm font-normal text-gray-900 dark:text-white">
                      {message.content}
                    </p>
                  </div>
                  <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                    {message.readByUser && message.readByUser.length > 0 ? (
                      message.readByUser.map((item: User) => (
                        <div className="avatar">
                          <div className="w-45 rounded-full p-1 bg-blue flex items-center justify-center" key={item.userId}>
                            <label className="text-white uppercase text-md">
                              {item.username ? item.username.slice(0, 2) : "NA"}
                            </label>
                          </div>
                        </div>
                      ))
                    ) : (
                      <span>No one has read</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1 w-auto max-w-[320px]">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {message.senderName}
                    </span>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                      <p className="text-sm font-normal text-gray-900 dark:text-white">
                        {message.content}
                    </p>
                  </div>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Delivered
                  </span>
                </div>
              )}
              <div
                id="dropdownDots"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
              >
            </div>
          </div>
          ))}
        </div>
        <div className="h-8">
          {typingUser && (
            <div className="text-sm text-primary  bottom-[220px] flex justify-center">
              {typingUser} is typing...
            </div>
          )}
        </div>
        <div className="border-t border-gray-700 p-4 flex gap-3 flex-col">
          <div className="gap-3 flex  items-center">
            <div className="w-full">
              <textarea
                value={newMessage}
                onChange={handleChangeMessage}
                placeholder="Type your message"
                className="bg-transparent text-black dark:text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#016FCB]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                style={{ width: "100%", overflow: "hidden", wordWrap: "break-word", maxHeight: "150px", overflowY: "auto" }}
                rows={1}
                onInput={(e) => {
                  const target = e.currentTarget as HTMLTextAreaElement; // Cast to HTMLTextAreaElement
                  target.style.height = "auto"; // Reset the height to auto
                  target.style.height = `${target.scrollHeight}px`; // Set the height to the scroll height
                }}
              />

            </div>

            <button
              onClick={sendMessage}
              className="flex-shrink-0 rounded-full flex items-center px-4 justify-center p-2 bg-primary disabled:bg-gray-300 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <IoIosSend fill="green" className="text-xl" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Halo;
