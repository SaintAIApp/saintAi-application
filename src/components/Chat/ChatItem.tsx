
import TypewriterEffect from "../TypeWriting";

const ChatItem = ({ sender, message,isHistory }: { sender: string; message: string,isHistory?:boolean }) => {
  const isMe = sender === "Me";
  const alignmentClass = isMe ? "justify-end" : "justify-start";
  const bgColorClass = isMe ? "bg-primary text-white" : "bg-black";
  const senderClass = isMe ? "text-[#11391a] text-right" : "text-[#8d8d8d]";
  const messageClass = isMe ? "text-right" : "";

  return (
    <div className={`flex ${alignmentClass} mb-2`}>
      <div className={`${bgColorClass} rounded-xl px-3 py-2 max-w-[85%] ${!isMe?"min-w-[85%]":""}  md:max-w-[75%] break-words`}>
        {!isMe && <h1 className={`${senderClass} text-sm mb-1`}>{sender}</h1>}
        {isMe ? (
          <p 
            className={`${messageClass} whitespace-pre-wrap overflow-hidden`}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        ) : ( isHistory? <p 
          className={`${messageClass} whitespace-pre-wrap overflow-hidden`}
          dangerouslySetInnerHTML={{ __html: message }}
        />:
          <TypewriterEffect 
            text={message} 
            className={`${messageClass} whitespace-pre-wrap overflow-hidden`}
          />
        )}
      </div>
    </div>
  );
};

export default ChatItem;