
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
                return "bg-primary text-black font-bold rounded-full px-8 py-3";
            default:
                return "";
        }
      }
  let varientClassName=getButtonClassName(variant);
  
  
  return (
    <div>
        <button onClick={onClick} className={`${varientClassName} ${className} z-50`}>{text}</button>
    </div>
  )
}

export default Button