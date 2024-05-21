import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { revealVariant, cubeVariant } from "../../constants/animations";
import Button from "../../components/Button";
import { ContactUsForm } from "../../components/ContactUsForm";
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
              className="text-4xl md:text-6xl mb-10 font-normal"
            >
              Have a <span className="text-purple_dark ">question</span>  or need <span className="text-purple_dark">help</span> ?
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
              
              Reach out to explore how <span className="text-primary">SaintAI</span>  can propel your AI journey forward
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
      <div className="my-3">
      <ContactUsForm/>
      </div>
      <div className="relative my-10 overflow-hidden border-[1.8px] p-10 py-12 rounded-3xl  border-purple_dark bg-purple bg-opacity-70 flex flex-col place-content-between   ">
        <h1 className=" text-3xl">Mine Pass Available now!</h1>
        {/* <p>
          Saint welcomes all to sign up and access cutting-edge AI technology
          while rewarding participation with cryptocurrency assets.
        </p> */}
      </div>
    </div>
  )
}

export default index