
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane,FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" relative border-[1.8px] p-10 rounded-3xl  border-purple_dark bg-purple bg-opacity-70 grid grid-cols-1 md:grid-cols-3 place-content-between ">
      
       <div className="absolute rounded-3xl overflow-hidden h-full w-full inset-0 flex">
          <div className="absolute  h-44 w-44 bg-shape1 top-[0px] left-0 z-0 opacity-90 bg-blur"></div>
          <div className="absolute h-44 w-44  bg-shape1 top-[0px] left-0 z-0 bg-blue-400 opacity-100 bg-blur"></div>
          <div className="absolute h-44 w-44  bg-shape1 top-[50px] right-0 z-0 bg-blue-400 opacity-100 bg-blur"></div>
          <div className="absolute h-44 w-44  bg-shape1 top-[50px] right-0 z-0 bg-blue-400 opacity-100 bg-blur"></div>
        </div>
      <div className="px-0 z-[20]">
        <h1 className="text-primary text-3xl ">SaintAI</h1>
      </div>
      <div className="md:px-5">
        <h1 className="text-lg font-bold">About</h1>
        <p className="font-thin text-sm">
          S.AI.N.T-GUI is a community-driven AI blockchain software focused on
          creating a participation-based cryptocurrency through an adaptable
          generative AI service.
        </p>
      </div>
      <div className="md:px-5">
        {" "}
        <h1 className=" font-bold">Social Media</h1>
        <ul>
          <li className=" flex space-x-1 items-center"> <span className=" font-semibold"> Twitter</span><FaXTwitter/> </li>
          <li className=" flex space-x-1 items-center"> <span className="font-semibold"> Telegram</span> <FaTelegramPlane/> </li>
          <li className="flex space-x-1 items-center"> <span className="font-semibold"> Github</span> <FaGithub/> </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
