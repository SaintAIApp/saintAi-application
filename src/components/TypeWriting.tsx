import  { useState, useEffect } from "react";

const TypewriterEffect = ({ text, speed = 10, className = "" }:{
    text:string,
    speed?:number,
    className?:string
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prevText) => prevText + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: displayedText }} />;
};

export default TypewriterEffect;