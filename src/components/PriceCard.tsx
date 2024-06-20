import { useRef, useState } from "react";
import Button from "./Button";
import { motion, useInView } from "framer-motion";
import { SiTicktick } from "react-icons/si";
import usePaymentServices from "../hooks/usePayment";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { notify } from "../utils/notify";

type Props = {
  price: number;
  heading: string;
  benefits: string[];
  plan:string;
  planCode:string;
  className?: string;
};
const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};


export const PriceCard: React.FC<Props> = ({ price, heading, benefits, className = "", planCode,plan}) => {
  const [isRedirecting,setIsRedirecting] = useState(false);
  const {createCheckout} = usePaymentServices();
  const navigate = useNavigate();
  const token = useAppSelector((state)=>state.auth.token)
  const handleSubmit = async()=>{
    setIsRedirecting(true);
    try {
      if(!token)
      {
          navigate("/login");
          return;
      }
      const res = await createCheckout(planCode);
      if(res.status===200){
        notify("Redirecting",true);
        window.location.href = res.data.data;
        // navigate("/"+res.data.data)
      }
      console.log(res);
    } catch (error:any) {
      notify(error.message,false);
      console.log(error)
    }
    finally{
      setIsRedirecting(false);
    }
  }
  return (
    <div className={`border-[0.8px] border-purple_dark bg-opacity-40 bg-purple px-4 py-3 rounded-3xl md:w-60 lg:w-80 hover:shadow-inner hover:shadow-purple_dark duration-500 h-[28rem] ${className}`}>
      <h1 className="py-3 text-2xl">{plan}</h1>
      <h1 className="text-primary text-4xl font-bold mb-4">${price}/month</h1>
      <ul className="flex flex-col space-y-2">
      {
        benefits.map((item:string,index:number)=>{return <li key={index} className="flex items-center space-x-1">
         { <SiTicktick className={ ` ${item===""?"text-transparent":"text-primary"}  h-5 w-5 mr-2`}/>}
          {item}
        </li> })
      }
      </ul>
      <h1 className="text-4xl mb-10">{heading}</h1>
      {/* <h1 className={`mb-32 ${cropText?"line-clamp-3":""} `}>{description}</h1> */}
     { price>0 &&  <Button loading={isRedirecting} className="" text="Upgrade" variant="rounded" onClick={handleSubmit} />}
    </div>
  );
};



export const PriceCardWithAnimation = ({
  price, heading, benefits , planCode,plan,
  delay
}: {
  price: number;
  heading: string;
  benefits: string[];
  plan:string;
  planCode:string;
  className?: string;
  delay: any;

}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
 
  return (
    <motion.div
      ref={ref}
      variants={cardVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}

    >
      <PriceCard
        price={price}
        heading={heading}
        plan={plan}
        planCode={planCode}
        benefits={benefits}

      />
    </motion.div>
  );
};
