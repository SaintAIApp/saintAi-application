import { useRef } from "react";
import Button from "./Button";
import { motion, useInView } from "framer-motion";
type Props = {
  number: string;
  heading: string;
  description: string;
  className?: string;
  cropText?:boolean
};
const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};
export const MissionCard: React.FC<Props> = ({ number, heading, description, className = "",cropText=false}) => {
  return (
    <div className={`border-[0.8px] border-purple_dark bg-opacity-40 bg-purple px-4 py-3 rounded-3xl md:w-60 lg:w-80 hover:shadow-inner hover:shadow-purple_dark duration-500 ${className}`}>
      <h1 className="text-primary text-6xl font-bold mb-4">{number}</h1>
      <h1 className="text-4xl mb-10">{heading}</h1>
      <h1 className={`mb-32 ${cropText?"line-clamp-3":""} `}>{description}</h1>
      <Button className="" text="Saint App" variant="rounded" onClick={() => {}} />
    </div>
  );
};



export const MissionCardWithAnimation = ({
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
