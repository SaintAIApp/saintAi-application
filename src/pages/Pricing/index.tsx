import React from "react";
import { PriceCardWithAnimation } from "../../components/PriceCard";

const Index: React.FC = () => {
  return (
    <section id="pricing" className="pt-8 mb-12 bg-[#1a1a2e] text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-light text-center my-8">
          Upgrade to premium
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
            sol={1}
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
            price={139}
            sol={0.1233}
            benefits={[
              "100 Social Profiles",
              "100 Scheduled Posts Per Profile",
              "400+ Templates",
              "Calendar View",
              "24/7 VIP Support"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Index;