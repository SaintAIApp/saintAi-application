import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { revealVariant, cubeVariant } from "../../constants/animations";
import Button from "../../components/Button";
import MissionCard from "../../components/MissionCard";
const index = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* HERO SECTION */}
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

            {/* <motion.h1
              variants={revealVariant}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                delay: 0.3,
              }}
              initial="hidden"
              animate="visible"
              className="text-primary text-5xl md:text-8xl mb-10 font-heading"
            >
              SaintAi
            </motion.h1> */}

            <motion.h1
              variants={revealVariant}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                delay: 0.6,
              }}
              initial="hidden"
              animate="visible"
              className="text-xl w-3/4 mb-10 font-thin"
            >
              <span className=" text-green-400 ">SaintAi</span> is a
              community-driven AI blockchain software focused on creating a
              participation-based cryptocurrency through an adaptable generative
              AI service
            </motion.h1>

            <Button
              variant="rounded"
              onClick={() => {
                navigate("/");
              }}
              text="Saint APP"
            />
          </div>
          <motion.div
            id="right"
            className="absolute cube right-0"
            //@ts-ignore
            variants={cubeVariant}
            initial="initial"
            animate="animate"
          >
            <img className="h-32 w-32 md:h-72 md:w-72" src="/cube.png" alt="" />
          </motion.div>
        </>
      </div>
      {/* PHASES */}
      <div className="flex flex-col space-y-10 my-3">
        <div className="flex justify-between">
          <div className="left text-2xl">
            <h1>Phase 1</h1>
            <h1>S.AI.N.T-GUI Application Software</h1>
            <h1>Soft Launch on Social Media:</h1>
            <h1>Telegram X</h1>
            <h1>Launch SaintAI Foundation Model:</h1>
            <h1>Default Mode - MIA</h1>
            <h1>Personal Mode - PAM</h1>
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
        </div>

        <div className="flex justify-between">
          <div className="left text-2xl">
            <h1>Phase 1</h1>
            <h1>S.AI.N.T-GUI Application Software</h1>
            <h1>Soft Launch on Social Media:</h1>
            <h1>Telegram X</h1>
            <h1>Launch SaintAI Foundation Model:</h1>
            <h1>Default Mode - MIA</h1>
            <h1>Personal Mode - PAM</h1>
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
        </div>

        <div className="relative overflow-hidden border-[1.8px] p-10 py-12 rounded-3xl  border-purple_dark bg-purple bg-opacity-70 flex flex-col place-content-between   ">
          <h1 className=" text-3xl">Mine Pass Available now!</h1>
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
