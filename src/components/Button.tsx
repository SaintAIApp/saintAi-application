import { GoArrowRight } from "react-icons/go";

type Props = {
    text:string;
    onClick?: ()=>void;
    className?:string;
    variant:"rounded"|"primary"
}
const Button:React.FC<Props> = ({text,onClick,className,variant}:Props) => {
    const getButtonClassName = (variant:string):string=>{
        switch(variant){
            case "primary":
                return "";
            case "rounded":
                return "bg-primary text-black font-bold rounded-full px-2 pr-5 py-2";
            default:
                return "";
        }
      }
  let varientClassName=getButtonClassName(variant);
  
  
  return (
    <div>
        <button onClick={onClick} className={`${varientClassName} flex  space-x-3 items-center ${className} z-50`}> {variant=="rounded" && <span className="p-3 rounded-full bg-white"> <GoArrowRight  height={12} width={12}/></span>} <span>{text}</span></button>
    </div>
  )
}

export default Button