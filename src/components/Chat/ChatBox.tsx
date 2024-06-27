import ChatItem from "./ChatItem";
import { useState } from "react";

import { IoIosSend } from "react-icons/io";

import logo from "../../assets/saintailogo.png";
const ChatBox = ({
  className = "",
  isOpen,

}: {
  isOpen: boolean;
  className?: string;
  closable?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  const [chats, setChats] = useState([
    {
      sender: "Mia",
      message:
        "Hello, welcome to S.AI.N.T. I am your streamlined AI providing Analytical Market intelligence. But you can call me Mia, your market intelligence analyst. How can I help you?",
    },
  ]);
  const [chat, setChat] = useState("");

  const isMobile = window.innerWidth <= 768;
  // console.log(activate)
  return (
    <div
      className={`
       fixed right-0 md:right-10 md:w-[400px] md:h-[80vh]
       flex flex-col justify-between bg-dark my-1 bottom-0 md:bottom-10  w-[100vw] h-[90vh]   shadow-2xl rounded-xl z-[65]   ${className}`}
      style={{
        border: "1.2px solid black",
        pointerEvents: "auto",
        visibility: isOpen ? "visible" : "hidden",
        opacity: isOpen ? 1 : 0,
      }}
    >
      <div className="flex flex-col h-full">
        <div id="header" className="px-3 flex py-3 justify-between ">
          <h1 className="text-3xl">
            <img className=" h-10 object-contain w-48" src={logo} />
          </h1>
        </div>
        <div
          id="body"
          className="px-3 justify-start w-full items-end overflow-y-auto max-h-[calc(100%-64px)]"
        >
          {chats.map((chat, index) => {
            return (
              <ChatItem
                key={index}
                sender={chat.sender}
                message={chat.message}
              />
            );
          })}
        </div>
      </div>
      <div
        id="footer"
        className="flex flex-col  space-y-2 md:space-y-0 md:flex-row rounded-bl-xl rounded-br-xl self-end space-x-1 py-3 items-center justify-between w-full bg-dark px-3 bottom-0 "
        style={{ borderTop: "0.8px solid black" }}
      >
        <input
          placeholder="Type your message"
          type="text"
          value={chat}
          onChange={(e) => {
            setChat(e.target.value);
          }}
          className=" bg-black rounded-full w-full py-2 px-4 md:w-[80%] outline-none"
          style={{ border: "0.8px solid #1e1e1e" }}
        />
        <button
          onClick={() => {
            chat !== "" &&
              setChats((prev) => [...prev, { sender: "Me", message: chat }]);
            setChat("");
          }}
          className="rounded-full flex items-center  justify-center py-2 px-4  w-full md:w-[20%] bg-[#54b584] text-white "
        >
          {isMobile && <span className="mr-2">Send Message</span>} <IoIosSend />
        </button>
      </div>
     
    </div>
  );
};

export default ChatBox;
