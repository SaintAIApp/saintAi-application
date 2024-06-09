import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import {MissionCard,MissionCardWithAnimation} from "../../components/MissionCard";
import logo from "../../assets/saintailogo.png"
import { motion } from "framer-motion";
import { revealVariant } from "../../constants/animations";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { ContactUsForm } from "../../components/ContactUsForm";
import { PriceCardWithAnimation } from "../../components/PriceCard";
// Define the animation variants for the mission cards

const slideInVariant = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
};
const Index = () => {
  const navigate = useNavigate();
  const {token} = useAppSelector((state)=>state.auth);
  const [time,setTime] = useState({days:"00",sec:"00",mins:"00",hrs:"00"});
  useEffect(() => {
    const interval = setInterval(() => {
      const curDate = new Date();
      const releaseDate = new Date("27 July 2024");

      const timeDifference = releaseDate.getTime()  - curDate.getTime();

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);

        setTime({
          days: String(days).padStart(2, '0'),
          hrs: String(hours).padStart(2, '0'),
          mins: String(minutes).padStart(2, '0'),
          sec: String(seconds).padStart(2, '0')
        });
      } else {
        // If the release date is in the past, clear the interval and set time to zero
        clearInterval(interval);
        setTime({ days: "00", hrs: "00", mins: "00", sec: "00" });
      }
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);
  

  return (
    <section>

    <section id="home" className="relative pt-10">
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
            <img className="h-20 " src={logo}/>
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
                token?
                navigate("/loaddata"):navigate("/login")
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
        <h1 className="text-lg font-thin mb-5">Vision</h1>
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
        <h1 className="text-center text-lg my-5 font-thin  z-10">
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

    <section id="network" className="pt-10">
      <div id="hero" className="flex flex-col space-y-5">
        <h1 className="font-thin text-lg">Endless Scaling</h1>
        <h1 className="text-4xl">A little bit about the</h1>
        <h1 className="text-4xl text-purple_dark">Network</h1>
        <ul className="flex  flex-col items-start space-y-2 md:space-y-0 md:flex-row md:space-x-4 ">
          <li className="rounded-full w-full md:w-fit  relative px-4 py-2 border border-white overflow-hidden min-w-32 text-center">
            <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 opacity-90  bg-blur"></div>
            <span>Accesible</span>
          </li>
          <li className="rounded-full  w-full md:w-fit relative px-4 py-2 border border-white overflow-hidden min-w-32 text-center">
            <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 opacity-90  bg-blur"></div>
            <span>Blockchain</span>
          </li>
          <li className="rounded-full  w-full md:w-fit relative px-4 py-2 border border-white overflow-hidden min-w-32 text-center">
            <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 opacity-90  bg-blur"></div>
            <span>Mining</span>
          </li>
        </ul>
      </div>
      <div className="my-5 flex flex-col space-y-5">
        <h1 className="text-sm font-thin">Egalitarian</h1>
        <div className=" flex flex-col md:flex-row md:justify-between">
          <h1 className="text-3xl ">
            <span className="text-primary"> SaintAI </span> promotes solo mining
          </h1>
          <Button
            className="w-fit my-2 md:my-0"
            variant="rounded"
            text="Saint App"
          />
        </div>
        <ul className="flex md:flex-row flex-col space-y-2 md:space-x-5 w-full">
          <li className=" w-full md:w-1/4">
            <div className="">
              <h1 className=" border-b-[2.7px] border-slate-600 py-2">
                User Purpose
              </h1>
              <p className="text-sm font-thin py-2">
                Participates in the peer-to-peer network and stores a copy of
                the Blockchain. Validates transactions and creates new blocks
              </p>
            </div>
          </li>
          <li className=" w-full md:w-1/4">
            <div>
              <h1 className=" border-b-[2.7px] border-slate-600 py-2">
                User Requirments
              </h1>
              <p className="text-sm py-2 font-thin">
                Requires only software to connect to the network.
              </p>
            </div>
          </li>
          <li className=" w-full md:w-1/4">
            <div>
              <h1 className=" border-b-[2.7px] border-slate-600 py-2">
                User Incentive
              </h1>
              <p className="text-sm font-thin py-2">
                Has direct financial incentive for running a node. Earns rewards
                in the form of newly mined cryptocurrency.
              </p>
            </div>
          </li>
          <li className=" w-full md:w-1/4">
            <div>
              <h1 className=" border-b-[2.7px] border-slate-600 py-2">
                Decentralized
              </h1>
              <p className="text-sm font-thin py-2">
                Can be run by anyone, leading to a more decentralized network.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex flex-col space-y-16 md:space-y-24">

        <div className="flex md:flex-row flex-col-reverse justify-between ">
          <div id="left">
            <h1 className="text-3xl py-5 ">
              Secure on Chain Application Software
            </h1>
            <p className="text-lg text-slate-300">
              <span className="text-primary">SaintAI</span> employs proof of
              analysis (PoA) mining for distributed consensus. Its
              ASIC-resistant algorithm allows mining with consumer-grade
              hardware and the Saint software. While CPUs and GPUs can mine,
              CPUs are more efficient.
            </p>
          </div>
            <img
              className="h-0 w-0 md:h-52 md:w-52 object-contain"
              src="./cube1.png"
            />
        </div>

        <div className="flex w-full justify-between md:flex-row flex-col-reverse">
          <div id="left" className="">
            <h1 className="text-3xl">
              <span className="text-primary">Saint</span> Secure Backbone
            </h1>
            <p className="text-lg text-slate-300">
              Data privacy and security are crucial; no customer data is shared
              or trained on. External use involves representational data, with
              local or virtual private SLMs.
            </p>
          </div>

            <img
              className="h-0 w-0 md:h-52 md:w-52 object-contain"
              src="./cube2.png"
            />
        </div>

        <div className="flex w-full justify-between md:flex-row flex-col-reverse ">
          <div id="left">
            <h1 className=" text-primary text-3xl">Go Green</h1>
            <p className="text-lg text-slate-300">
              Uses much less energy than traditional mining due to transformer
              model rather than intensive computation.
            </p>
          </div>
          
            <img
              className="h-0 w-0 md:h-52 md:w-52 object-contain"
              src="./cube3.png"
            />
        </div>
      </div>
    </section>

    <section id="roadmaps">
      <div id="hero" className="flex w-full pt-32 relative py-10">
        <div className="absolute top-0 h-full w-full left-0 inline-flex inset-0 justify-center">
          <div className="absolute h-64 w-64 bg-shape1 bottom-0 right-20"></div>
          <div className="absolute h-64 w-64 bg-shape2 top-96 left-10"></div>
        </div>

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
    </section>
    <section>
    <div className="my-16">
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

    <section id="contactus">
      <div id="hero" className="relative flex w-full mb-32 pt-32 py-10">
        <div className="absolute top-0 h-full w-full left-0 inline-flex inset-0 justify-center">
          <div className="absolute h-64 w-64 bg-shape1 bottom-0 right-20"></div>
          <div className="absolute h-64 w-64 bg-shape2 top-96 left-10"></div>
        </div>

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
              className="text-4xl md:text-6xl mb-10 font-normal"
            >
              Have a <span className="text-purple_dark">question</span> or need <span className="text-purple_dark">help</span>?
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
              className="text-xl relative mb-10 font-thin"
            >
              Reach out to explore how <span className="text-primary">SaintAI</span> can propel your AI journey forward
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

      </div>
      <div className="my-3">
        <ContactUsForm />
      </div>
      <div className="relative  my-10 overflow-hidden border-[1.8px] p-10 py-12 rounded-3xl border-purple_dark bg-purple bg-opacity-70 flex flex-col place-content-between">
        <h1 className="text-3xl">Mine Pass Available now!</h1>
        <h1 className="py-4 text-slate-400 text-xl">{`Mine opens in: ${time.days} : ${time.hrs} : ${time.mins} : ${time.sec}`}</h1>
        <Button
        className="w-fit"
              variant="rounded"
              onClick={() => {
                navigate("/");
              }}
              text="Saint APP"
            />
          <img className="absolute h-80 w-80  bottom-[-70%] md:top-[10%] left-1/2  md:right-0 rotate-45" src="/cube.png"/>
      </div>
    </section>
    
    </section>
  );
};

export default Index;
