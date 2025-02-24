import React, { useState } from "react";
import { motion } from "framer-motion";
import usePaymentServices from "../hooks/usePayment";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { notify } from "../utils/notify";

type PriceCardProps = {
  tier: string,
  price?: number;
  codename: string;
  benefits: string[];
  planCode: string;
  plan: string;
  sol: number;
  type: "light" | "dark";
};

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

export const PriceCard: React.FC<PriceCardProps> = ({
  tier,
  codename,
  benefits,
  plan,
  sol,
  type,
}) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { createCheckout } = usePaymentServices();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  const handleSubmit = async () => {
    setIsRedirecting(true);
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await createCheckout(plan);
      if (res.status === 200) {
        notify("Redirecting", true);
        window.location.href = res.data.data;
        // navigate("/"+res.data.data)
      }
      console.log(res);
    } catch (error: any) {
      notify(error.message, false);
      console.log(error);
    } finally {
      setIsRedirecting(false);
    }
  };
  const formatted = `$STT ${new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(sol)}`;
  return (
    <div
      className={`flex flex-col justify-between px-6 py-8 rounded-3xl ${type === "light" ? "bg-white text-black" : "bg-[#2a2a3e] text-white"
        } hover:shadow-lg hover:scale-105 transition-all duration-300 h-full`}
    >
      <div className="relative h-[520px]">
        <h2 className="text-md font-semibold mb-1 text-center">Tier {tier}</h2>
        <h3 className="text-2xl font-bold mb-1 text-center">{plan}</h3>
        <p className="text-[23px] font-bold text-purple_dark mb-2 text-center">{formatted}</p>
        <p className="text-center font-bold text-2xl border-t-[0.6px] pt-2">{codename}</p>
        <ul
          className={`pt-3 mt-3 space-y-2 ${type === "light" ? "border-gray-200" : "border-gray-100"
            } border-t-[0.6px]`}
        >
          {benefits.map((item, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm">
              <span className="text-primary">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {/* Container untuk tombol */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4">
          <button
            onClick={() => {
              handleSubmit();
            }}
            disabled={isRedirecting}
            className={`w-full max-w-[200px] py-2 px-4 rounded-full ${type === "light"
            ? "bg-[#fff] text-blue border-blue border-2"
            : "bg-blue border-blue border-2 text-white"
              } hover:opacity-90 transition-opacity duration-300 font-bold`}
          >
            Choose Tier
          </button>
        </div>
      </div>
    </div>
  );
};

type PriceCardWithAnimationProps = PriceCardProps & {
  delay: number;
};

export const PriceCardWithAnimation: React.FC<PriceCardWithAnimationProps> = ({
  type,
  price,
  tier,
  codename,
  benefits,
  planCode,
  plan,
  delay,
  sol,
}) => {
  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className="h-full"
    >
      <PriceCard
        tier={tier}
        codename={codename}
        type={type}
        sol={sol}
        price={price}
        plan={plan}
        planCode={planCode}
        benefits={benefits}
      />
    </motion.div>
  );
};
