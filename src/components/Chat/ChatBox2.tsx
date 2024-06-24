// import { motion } from "framer-motion";
// import ChatItem from "./ChatItem";
// import { useState } from "react";

// const ChatBox = ({
//   className="",
//   isOpen,
//   setIsOpen,

// }: {
//   isOpen: boolean;
//   className?:string;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

// }) => {
//   const [chats,setChats] = useState([ {
//     sender: "Mia",
//     message:
//       "Hello, welcome to S.AI.N.T. I am your streamlined AI providing Analytical Market intelligence. But you can call me Mia, your market intelligence analyst. How can I help you?",
//   }])
//   const [chat,setChat] = useState("");
// //   const activate = location.href.includes("activatesaint");

// //   console.log(activate)
//   return (
//     <motion.div
//       variants={{
//         open: {
//           clipPath: "inset(0% 0% 0% 0% round 10px)",
//           transition: {
//             type: "spring",
//             bounce: 0,
//             duration: 0.2,
//             delayChildren: 0.3,
//             staggerChildren: 0.05,
//           },
//         },
//         closed: {
//           clipPath: "inset(10% 50% 90% 50% round 10px)",
//           transition: {
//             type: "spring",
//             bounce: 0,
//             duration: 0.2,
//           },
//         },
//       }}
//       initial="closed"
//       animate={isOpen ? "open" : "closed"}
//       className={`absolute flex flex-col justify-between bg-[#f8f8f8] my-1 bottom-16 right-5 md:right-10 w-[92vw] h-[90vh]  md:w-[400px] md:h-[80vh] shadow-2xl rounded-xl z-10 ${className}`}
//       style={{
//         border: "1.2px solid #e9e9e9",
//         pointerEvents: "auto",
//         visibility: isOpen ? "visible" : "hidden", 
//         opacity: isOpen ? 1 : 0, 
//       }}
//     >
//       <div className="flex flex-col h-full">
//         <div id="header" className="px-3 flex py-3 justify-between h-[10%]">
//           <h1 className="text-3xl"><img className=" h-16 object-cover w-48" src="logo.png"/></h1>
//           <button
//             onClick={() => {
//               setIsOpen(false);
//             }}
//           >
//             x
//           </button>
//         </div>
//         <div id="body" className="px-3 justify-start w-full items-end overflow-y-scroll h-[80%]">
//           {chats.map((chat, index) => {
//             return (
//               <ChatItem key={index} sender={chat.sender} message={chat.message} />
//             );
//           })}
//         </div>
//       </div>
//       <div
//         id="footer"
//         className="flex flex-col  space-y-2 md:space-y-0 md:flex-row rounded-bl-xl rounded-br-xl self-end space-x-1 py-3 items-center justify-between w-full bg-white px-3 h-[10%] bottom-0 "
//         style={{ borderTop: "0.8px solid #e7e7e7" }}
//       >
        
//         <input
//           placeholder="Type your message"
//           type="text"
//           value={chat}
//           onChange={(e)=>{setChat(e.target.value)}}
//           className=" bg-[#f7f7f7] rounded-full w-full py-2 px-4 md:w-[60%] outline-none"
//           style={{ border: "0.8px solid #e7e7e7" }}
//         />
//         <button onClick={()=>{chat!=="" && setChats((prev)=>[...prev,{sender:"Me",message:chat}]);setChat("")}} className="rounded-full  py-2 px-4  w-full md:w-[40%] bg-[#54b584] text-white ">
//           Send Message
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// export default ChatBox;
