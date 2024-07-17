import React from "react";
import { motion } from "framer-motion";

type PriceCardProps = {
  price: number;
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
  price,
  benefits,

  plan,
  sol,
  type,
}) => {
  return (
    <div
      className={`flex flex-col justify-between px-6 py-8 rounded-3xl ${
        type === "light" ? "bg-white text-black" : "bg-[#2a2a3e] text-white"
      } hover:shadow-lg hover:scale-105 transition-all duration-300 h-full`}
    >
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-center">{plan}</h2>
        <h3 className="text-3xl font-bold mb-1 text-center">
          {price === 0 ? "Free" : `${price}`}
        </h3>
        <p className="text-sm text-gray-500 mb-4 text-center">per user, per month</p>
        <p className="text-sm font-semibold mb-1 text-center">OR</p>
        <p className="text-xl font-bold text-[#8e44ad] mb-6 text-center">{sol} SOL/month</p>
        <button className={`w-full py-2 px-4 rounded-full ${
          type === "light" ? "bg-[#fff] text-[#1465FA] border-[#1465FA] border-2" : "bg-[#1465FA] border-[#1465FA] border-2 text-white"
        } hover:opacity-90 transition-opacity duration-300 font-bold`}>
          Choose Plan
        </button>
        <ul className={`pt-3 mt-3 space-y-2 ${type==="light"? "border-gray-200":"border-gray-100"} border-t-[0.6px]`}>
          {benefits.map((item, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm">
              <span className="text-green-500">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
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