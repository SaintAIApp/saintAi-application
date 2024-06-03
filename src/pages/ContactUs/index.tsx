import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { revealVariant, cubeVariant } from "../../constants/animations";
import Button from "../../components/Button";
import { ContactUsForm } from "../../components/ContactUsForm";
import { useState,useEffect } from "react";

const index = () => {
  const navigate = useNavigate();
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
    <div>
      <div id="hero" className="relative flex w-full mb-32 py-10">
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
        </>
      </div>
      <div className="my-3">
        <ContactUsForm />
      </div>
      <div className="relative my-10 overflow-hidden border-[1.8px] p-10 py-12 rounded-3xl border-purple_dark bg-purple bg-opacity-70 flex flex-col place-content-between">
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
      </div>
    </div>
  );
};

export default index;


