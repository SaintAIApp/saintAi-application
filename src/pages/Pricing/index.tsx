import React from "react";
import { PriceCardWithAnimation } from "../../components/PriceCard";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="pt-8  bg-[#1a1a2e] text-white h-auto min-h-screen pb-8">
      <button onClick={()=>{navigate("/")}} className=" absolute top-10 right-10 flex items-center"> Close <XCircleIcon className=" h-7 w-7"/>  </button>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl mt-12 md:mt-0 md:text-5xl font-light text-center my-8">
        Choose Between SaintAI’s Genesis,Medius or the Odysseus Mine Pass Access Key Plan
        </h1>
        
        <div className="flex justify-center mb-8">
          <div className="bg-[#2a2a3e] rounded-full p-1">
            <button className="px-4 py-2 rounded-full bg-[#8e44ad] text-white">Monthly</button>
            <button className="px-4 py-2 rounded-full text-gray-400">Yearly</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <PriceCardWithAnimation
            type="light"
            delay={0.2}
            plan="Genesis"
            planCode="free"
            price={0}
            sol={0}
            benefits={[
              "SaintAI Genesis - AI Mining Pass",
              "Limited AI Mine access",
              "Maximum 2 Mine hrs. / day",
              "No access to SaintAI agents MIA & PIPA",
              "Power Pass AI Mining upgrades available @ 0.017 SOL / hr.",
              "Access to power streak mining bonus of 100 $STT for all Power Pass AI Mining upgrade purchases"
            ]}
          />
          <PriceCardWithAnimation
            type="dark"
            delay={0.4}
            plan="Medius"
            planCode="pro"
            price={16.99}
            sol={0.1233}
            benefits={[
              "SaintAI Medius - AI Mining Pass",
              "Limited AI Mine access",
              "Maximum 4 Mine hrs. / day",
              "Access to SaintAI agents MIA",
              "Unlimited Crypto Market, Forex & Stock data access",
              "Unlimited News Access",
              "Power Pass AI Mining upgrades available @ 0.0177 SOL / hr.",
              "Access to power streak mining bonus of 100 $STT"
            ]}
          />
          <PriceCardWithAnimation
            type="light"
            delay={0.6}
            plan="Odysseus"
            planCode="proPlus"
            price={139.99}
            sol={1}
            benefits={[
              "Automated AI Mining",
              "Unlimited mine access",
              "Set and Forget, 24 hr. Automated AI Mining",
              "Unlimited Access to SaintAI Agents MIA & PIPA",
              "Unlimited Crypto Market & Stock Market Data Access",
              "Access to Power Streak Mining Bonus of 100 $STT",

            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Index;