const ChatItem = ({ sender, message }: { sender: string; message: string }) => {
  const isMe = sender === "Me";
  const alignmentClass = isMe ? "justify-end" : "justify-start";
  const bgColorClass = isMe ? "bg-primary text-white" : "bg-black";
  const senderClass = isMe ? "text-[#11391a] text-right" :"text-[#8d8d8d]"
  const messageClass = isMe ? "text-right" :""
  return (
    <div className={`flex ${alignmentClass} mb-2`}>
      <div className={`${bgColorClass} rounded-xl px-3 py-2  max-w-[85%] md:max-w-[75%]`}>
        <h1 className={`${senderClass}`}>{ sender!=="Me" && sender}</h1>
        <h1 className={`${messageClass}`}>{message}</h1>
      </div>
    </div>
  );
};

export default ChatItem;
