import { PriceCardWithAnimation } from "../../components/PriceCard"

const index = () => {
  return (
    <section id="pricing" className="pt-8 mb-12">
    <div >
        <h1 className="text-center text-lg my-5 font-thin  z-10">
          Pricing
        </h1>
        <h1 className="text-3xl md:text-6xl font-thin text-center my-4  z-10">
          Explore plans
        </h1>
        {/* <h1 className="text-center font-thin my-5  z-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, laborum!
        </h1> */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 place-items-center my-4 z-10 ">
          <PriceCardWithAnimation
            delay={0.2}
            heading=""
            plan="Genesis"
            planCode="free"
            price={0}
            sol={0}
            benefits={["AI Mining", "Limited Mine Access", "Maximum 2 Mine hrs. / Day", "No Access to SaintAI Agents MIA & PIPA", "Power Pass AI Mining Upgrades Available at 0.017 SOL / hr.", "Access to Power Streak Mining Bonus of 100 $STT for all Power Pass AI Mining Upgrade Purchases"]}
          />
          <PriceCardWithAnimation
          sol={0.1233}
            delay={0.4}
            heading=""
            plan="Odysseus"
            planCode="proPlus"
            price={139.99}
            benefits={["Automated AI Mining", "Unlimited Mine Access", "Set and Forget, 24 hr. Automated AI Mining", "Unlimited Access to SaintAI Agents MIA & PIPA", "Unlimited Crypto Market & Stock Market Data Access", "Unlimited News Access", "Access to Power Streak Mining Bonus of 100 $STT"]}
          />
          <PriceCardWithAnimation
          sol={1}
            delay={0.6}
            heading=""
            plan="Medius"
            planCode="pro"
            price={16.99}
            benefits={["AI Mining", "Limited Mine Access", "Maximum 4 Mine hrs. / Day", "Access SaintAI Agents MIA & PIPA", "Unlimited Crypto Market & Stock Data Access", "Unlimited News Access", "Power Pass AI Mining Upgrades Available at 0.0177 SOL / hr.", "Access to Power Streak Mining Bonus of 100 $STT"]}
          />
        </div>
      </div>
    </section>
  )
}

export default index