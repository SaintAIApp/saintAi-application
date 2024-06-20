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
        <h1 className="text-center font-thin my-5  z-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, laborum!
        </h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-3  gap-4   place-items-stretch my-4  z-10">
              <PriceCardWithAnimation
              delay={0.2}
              heading=""
              plan="Free"
              planCode="free"
              price={0}
              benefits={["Free Food","Free Coffee"]}
              />
                <PriceCardWithAnimation
              delay={0.4}
              heading=""
              plan="Pro Plus"
              planCode="proPlus"
              price={20}
              benefits={["Free Food","Free Coffee","Free Food","Free Coffee","Free Food","Free Coffee"]}

              />
                <PriceCardWithAnimation
              delay={0.6}
              heading=""
              plan="Pro"
              planCode="pro"
              price={7}
              benefits={["Free Food","Free Coffee","Free Food","Free Coffee","",""]}

              />
        </div>
      </div>
    </section>
  )
}

export default index