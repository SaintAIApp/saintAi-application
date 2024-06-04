import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { revealVariant } from "../../constants/animations";
import Button from "../../components/Button";
import {MissionCard} from "../../components/MissionCard";

const index = () => {
  const navigate = useNavigate();

  const slideInVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div>
      <div id="hero" className="flex w-full mb-32 relative py-10">
        <div className="absolute top-0 h-full w-full left-0 inline-flex inset-0 justify-center">
          <div className="absolute h-64 w-64 bg-shape1 bottom-0 right-20"></div>
          <div className="absolute h-64 w-64 bg-shape2 top-96 left-10"></div>
        </div>
        <>
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
              Roadmap
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
              className="text-xl  relative mb-10 font-thin"
            >
              <span className=" text-green-400 ">SaintAi</span> is a
              community-driven AI blockchain software focused on creating a
              participation-based cryptocurrency through an adaptable generative
              AI service
            </motion.h1>

            <Button
              className="relative"
              variant="rounded"
              onClick={() => {
                navigate("/");
              }}
              text="Saint APP"
            />
          </div>
          {/* <motion.div
            id="right"
            className="absolute cube right-0"
            //@ts-ignore
            variants={cubeVariant}
            initial="initial"
            animate="animate"
          > */}
            <img className="h-0 w-0 md:h-72 md:w-72" src="/cube.png" alt="" />
          {/* </motion.div> */}
        </>
      </div>
      {/* PHASES */}
      <div className="flex flex-col space-y-10 my-3">
        <motion.div
          id="phase1"
          className="flex flex-col space-y-2 md:flex-row md:justify-between"
          initial="hidden"
          whileInView="visible"
          variants={slideInVariant}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="left">
            <h1 className="text-3xl">Phase 1</h1>
            <div className="text-lg">
              <h1 className="">S.AI.N.T-GUI Application Software</h1>
              <h1>Soft Launch on Social Media:</h1>
              <h1>Telegram X</h1>
              <h1>Launch SaintAI Foundation Model:</h1>
              <h1>Default Mode - MIA</h1>
              <h1>Personal Mode - PAM</h1>
            </div>
          </div>
          <div className="right">
            <MissionCard
              className={"lg:w-96"}
              number={""}
              heading={"Inovate"}
              description={
                "The Cryptocurrency Innovation: Construct a blockchain-based application program that generates digital currency via involved participation of CPU network"
              }
            />
          </div>
        </motion.div>

        <motion.div
          id="phase2"
          className="flex flex-col md:flex-row md:justify-between space-y-2 space-x-2"
          initial="hidden"
          whileInView="visible"
          variants={slideInVariant}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="left mx-2">
            <h1 className="text-3xl">Phase 2</h1>
            <div className="text-lg">
              <h1 className="">S.AI.N.T -GUI 2.0 DApp</h1>
              <h1>
                Establish partnerships to mint limited Saint Bond NFTs across
                multiple chains using $STT
              </h1>
              <h1>
                SaintAI 2.0 Network - A Foundation AI trained specifically off
                user data.
              </h1>
              <h1>The next phase of decentralized SLM power</h1>
              <h1>Release the 4 Saints Automated Investment Platform:</h1>
              <div className="my-2">
              <h1>SaintAI – Spot</h1>
              <h1>SaintAI – Option</h1>
              <h1>SaintAI – Bond</h1>
              <h1>SaintAI – Short</h1>

              </div>
              <h1>Establish St-Capital a peer to peer cryptocurrency funding platform for FinTech AI solution based projects using $STT</h1>
            </div>
          </div>
          <div className="right">
            <MissionCard
              className={"lg:w-96"}
              number={""}
              heading={"Develop"}
              description={
                "Develop a streamlined, highly affective, secure small language model generative AI with adaptable user interface suitable for specific SME user applications, Crypto market analysis, investing and FinTech."
              }
            />
          </div>
        </motion.div>

        <div className="relative overflow-hidden border-[1.8px] p-10 py-12 rounded-3xl border-purple_dark bg-purple bg-opacity-70 flex flex-col place-content-between">
          <h1 className="text-3xl">Mine Pass Available now!</h1>
          <p>
            Saint welcomes all to sign up and access cutting-edge AI technology
            while rewarding participation with cryptocurrency assets.
          </p>
        </div>
      </div>
    </div>
  );
};

export default index;
