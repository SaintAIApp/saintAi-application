import { useRef, useState } from "react";
import Button from "./Button";
import { motion, useInView } from "framer-motion";
import { SiTicktick } from "react-icons/si";
import usePaymentServices from "../hooks/usePayment";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { notify } from "../utils/notify";
import PaymentModeModal from "./PaymentModeModal";

type Props = {
  price: number;
  heading: string;
  benefits: string[];
  plan:string;
  planCode:string;
  className?: string;
  sol?:number
};
const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};


export const PriceCard: React.FC<Props> = ({ price, benefits, className = "", planCode,plan,sol}) => {

  const [isRedirecting,setIsRedirecting] = useState(false);
  const {createCheckout} = usePaymentServices();
  const navigate = useNavigate();
  const token = useAppSelector((state)=>state.auth.token)

  const createCoinbaseCheckout = async ()=>{
    notify("Coinbase payment not supported yet",false);
  }
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
    <div className={`flex flex-col justify-between border-[0.8px] border-purple_dark bg-opacity-40 bg-purple px-6 py-6 rounded-3xl md:w-64 lg:w-80 hover:shadow-lg hover:shadow-purple_dark hover:scale-105 transition-all duration-300 h-full ${className}`}>
      <div>
        <h1 className="py-3 text-2xl font-semibold">{plan}</h1>
        <h1 className="text-primary text-2xl font-bold mb-3">${price}/month</h1>
        <h1 className="text-slate-600 text-xl font-bold mb-3">OR</h1>
        <h1 className="text-primary text-2xl font-bold mb-3">{sol} SOL/month</h1>
        <ul className="flex flex-col space-y-3">
          {benefits.map((item: string, index: number) => (
            <li key={index} className="flex items-start space-x-2">
              <SiTicktick className={`${item === "" ? "text-transparent" : "text-primary"} h-5 w-5 mt-1 flex-shrink-0`} />
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        {price > 0 && (
          <PaymentModeModal createCoinbaseCheckout={createCoinbaseCheckout} createStripeCheckout={handleSubmit} triggerButton={
            <Button
              loading={isRedirecting}
              className="w-full"
              text="Upgrade"
              variant="rounded"
              // onClick={handleSubmit}
              />

          }>

            </PaymentModeModal>
        )}
      </div>
    </div>
  );
};

export const PriceCardWithAnimation = ({
  price,
  heading,
  benefits,
  planCode,
  plan,
  delay,
  sol
}: Props & { delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      variants={cardVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
      className="h-full"
    >
      <PriceCard
        sol={sol}
        price={price}
        heading={heading}
        plan={plan}
        planCode={planCode}
        benefits={benefits}
      />
    </motion.div>
  );
};