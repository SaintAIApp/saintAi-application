import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import MissionCard from "../../components/MissionCard";

import { motion, useInView } from "framer-motion";
import { revealVariant } from "../../constants/animations";
import { useRef } from "react";
// Define the animation variants for the mission cards
const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const Index = () => {
  const navigate = useNavigate();
  const MissionCardWithAnimation = ({
    number,
    heading,
    description,
    delay,
  }: {
    number: any;
    heading: string;
    description: string;
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
        <MissionCard
          cropText
          number={number}
          heading={heading}
          description={description}
        />
      </motion.div>
    );
  };

  return (
    <section className="relative">
      {/* Hero section  */}
      <div className=" z-0 absolute h-64 w-64 bg-shape1 bottom-0 right-20"></div>
      <div className=" z-0 absolute  h-64 w-64 bg-shape2 top-96 left-10"></div>
      
      {/* <div className="absolute h-44 w-44 bg-shape1 top-[-132px] left-0 bg-blur"></div> */}
      {/* <div className="absolute h-44 w-44 bg-shape1 top-[-250px] left-80 bg-blue-400 opacity-90 bg-blur"></div> */}
      {/* <div className="absolute h-44 w-44 bg-shape1 top-[50px] right-20 bg-blue-400 opacity-90 bg-blur"></div> */}
      
      <div id="hero" className="flex w-full justify-between mb-32 py-10">
        <div id="left">
          <motion.h1
            variants={revealVariant}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
              delay: 0,
            }}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl mb-10 font-thin"
          >
            AI-driven Web3 Crypto Mine
          </motion.h1>

          <motion.h1
            variants={revealVariant}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
              delay: 0.3,
            }}
            initial="hidden"
            animate="visible"
            className="text-primary text-5xl md:text-8xl mb-10 font-heading z-10  "
          >
            SaintAi
          </motion.h1>

          <motion.h1
            variants={revealVariant}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
              delay: 0.6,
            }}
            initial="hidden"
            animate="visible"
            className="text-3xl  mb-10 font-thin z-10"
          >
            Building an AI mining community on TON and Solana
          </motion.h1>
          <div className=" z-10">
            <Button
          

              className="relative"
              variant="rounded"
              onClick={() => {
                console.log("hello")
                navigate("/");
              }}
              text="Saint APP"
            />
          </div>
        </div>
        <img className="  top-20 right-0 h-0 w-0 md:h-72 md:w-72 z-0" src="/cube.png" alt="" />
        {/* <div
          id="right"
          className="absolute cube top-20 right-0 z-0"
          //@ts-ignore
          variants={cubeVariant}
          initial="initial"
          animate="animate"
        >
        </div> */}
      </div>

      {/* VISION SECTION */}
      <div id="vision">
        <h1 className="text-sm font-thin mb-5">Vision</h1>
        <h1 className="text-3xl sm:text-center md:text-6xl font-thin">
          Prioritize technology-driven participation that rewards output
        </h1>

        <Button
          className="my-20"
          variant="rounded"
          onClick={() => {}}
          text="Whitepaper"
        />
      </div>

      {/* MISSION AND GOALS SECTION */}
      <div className="my-16">
        <h1 className="text-center text-sm my-5 font-thin  z-10">
          Mission
        </h1>
        <h1 className="text-3xl md:text-6xl font-thin text-center my-4  z-10">
          Goals
        </h1>
        <h1 className="text-center font-thin my-5  z-10">
          As a streamlined generative AI and blockchain application service, our
          goals are:
        </h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-3  gap-4   place-items-stretch my-4  z-10">
          <MissionCardWithAnimation
            number="1"
            heading="Convert"
            description="To convert productive generative AI computing power into cryptocurrency mining"
            delay={0.2}
          />
          <MissionCardWithAnimation
            number="2"
            heading="Enhance"
            description="To enhance small to medium enterprise productivity through adaptable generative AI tools
            "
            delay={0.4}
          />
          <MissionCardWithAnimation
            number="3"
            heading="Provide"
            description="To provide egalitarian access to cryptocurrency and crypto market investing for all interested parties.
            "
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
};

export default Index;
