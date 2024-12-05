
import { useCallback, useEffect, useState } from "react";
import "./index.css";
import socket from "../../services/socket";
import { useAppSelector } from "../../redux/hooks";
import { IoIosSend } from "react-icons/io";
type User = {
  userId: string;
  username: string;
};
const Halo = () => {
  const { user } = useAppSelector((state) => state.auth); // Ambil data user dari state auth
  const [messages, setMessages] = useState<any[]>([]); // State untuk pesan
  const [newMessage, setNewMessage] = useState(""); // State untuk pesan baru
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const handleTyping = useCallback(() => {
    if (user?._id) {
      socket.emit("typing", { userId: user._id, groupId: "dkashkdjs" });
    }
  }, [user]);
  useEffect(() => {
    const markAsRead = (messageId: string) => {
      if (user?._id) {
        socket.emit("readMessage", { messageId, userId: user._id, username: user.username });
      }
    };

    const groupId = "dkashkdjs";

    // Join ke grup
    socket.emit("joinGroup", groupId);

    // Fetch existing messages ketika bergabung ke grup
    socket.emit("getMessages", groupId, (fetchedMessages: any[]) => {
      setMessages(fetchedMessages);
      if (isWindowFocused) {
        fetchedMessages.forEach((message) => {
          if (!message.readBy?.includes(user?._id) && message.sender !== user?._id) {
            markAsRead(message._id);
          }
        });
      }
    });

    socket.on("typing", (typingUser) => {
      if (typingUser.userId !== user?._id) {
        setTypingUser(user?.username || "Someone"); // Tampilkan indikator typing
      }
    });

    // Terima event 'stopTyping' saat user berhenti mengetik
    socket.on("stopTyping", () => {
      setTypingUser(null); // Hapus nama pengguna yang sedang mengetik
    });

    // Terima pesan baru secara real-time
    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
      setIsTyping(false);
      setTypingUser(null);
      if (isWindowFocused && message.sender !== user?._id) {
        markAsRead(message._id);
      }
    });

    const handleFocus = () => setIsWindowFocused(true);
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

  }, [isWindowFocused, user, isTyping]);

  // Fungsi untuk mengirim pesan baru
  const sendMessage = () => {
    if (newMessage.trim() && user) {
      socket.emit("sendMessage", {
        content: newMessage,
        sender: user._id,
        senderName: user.username,
        groupId: "dkashkdjs",
      });
      setNewMessage(""); // Reset input setelah mengirim pesan
      setIsTyping(false);
      setTypingUser(null);
    }
  };
  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    if (e.target.value) {
      if (!isTyping) {
        setIsTyping(true);
        handleTyping();
      }
    } else {
      setIsTyping(false); // Jika input kosong, set typing ke false
      socket.emit("stopTyping", { userId: user?._id, groupId: "dkashkdjs" });
    }
  };
  console.log(messages);
  return (
    <section className="overflow-x-hidden   flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 p-4 ml-0 md:ml-10 pt-[35px] h-screen">
      <div className="border border-[#fff] w-full h-[85vh] rounded-lg flex flex-col">
        <div className="max-h-[85vh] h-[85vh] overflow-auto p-5">
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
                  <div className="flex space-x-2">
                    {message.readByUser && message.readByUser.length > 0 ? (
                      message.readByUser.map((item: User) => (
                        <div className="h-3 w-3 rounded-full bg-blue p-3 flex items-center justify-center" key={item.userId}>
                          <label className="text-white uppercase text-sm">
                            {item.username ? item.username.slice(0, 2) : "NA"}
                          </label>
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
              <button
                id="dropdownMenuIconButton"
                data-dropdown-toggle="dropdownDots"
                data-dropdown-placement="bottom-start"
                className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                type="button"
              >
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 4 15"
                >
                  <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </button>
              <div
                id="dropdownDots"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Reply
                    </a>
                </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Forward
                    </a>
                </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Copy
                    </a>
                </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Report
                    </a>
                </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Delete
                    </a>
                </li>
              </ul>
            </div>
          </div>
          ))}
        </div>

        <div className="border-t border-gray-300 p-4 flex gap-3">
          {typingUser && (
            <div className="text-sm text-gray-500 dark:text-gray-400 p-2">
              {typingUser} is typing...
            </div>
          )}

          <input
            value={newMessage}
            onChange={handleChangeMessage}
            placeholder="Type your message"
            className="flex-grow bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#016FCB]"
          />
          <button
            onClick={sendMessage}
            className="flex-shrink-0 rounded-full flex items-center px-4 justify-center p-2 bg-primary disabled:bg-gray-300 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <IoIosSend fill="green" className="text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Halo;
