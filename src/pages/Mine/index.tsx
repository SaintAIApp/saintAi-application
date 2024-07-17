import { useState } from "react";
import ChatBox from "../../components/Chat/ChatBox";
import { Navigate } from "react-router-dom";
import logoCircle from "../../assets/saintlogocircle.png";
import { useAppSelector } from "../../redux/hooks";

import SideBar from "../../components/SideBar";

const Mine = () => {
  const store = useAppSelector((state) => state);
  const { auth: authObject } = store;

  const [isChatBoxOpen, setIsChatBoxOpen] = useState(true);

  const { user, token } = authObject;

  if (!token || (user && !user.isActive)) {
    return <Navigate to={"/"} />;
  }
  return (
    <section className="overflow-x-hidden flex flex-row space-x-3 ">
      {window.innerWidth >= 768 && <SideBar />}
      <div className="w-full md:w-4/5 ">
        <div className="flex flex-col md:flex-row items-start justify-between ">
          <div className=" border-1 border-white h-[85vh] overflow-y-auto flex flex-col space-y-2 w-full">
            <div className="w-1/2 border h-1/2 rounded-lg border-[#333333] p-4 flex flex-col justify-center">
                <div className="w-full h-24 bg-[#333333] rounded-full flex items-center px-5 space-x-3">

                        <h1 className=" flex items-center  justify-center h-8 w-8 bg-white text-black rounded-full">
                            0   
                        </h1>
                        <div className="flex w-full flex-col justify-center">
                        <h1>50</h1>
                    <div className="  relative h-4 w-full bg-white rounded-full">
                        <div className=" bg-[#FF9B26] rounded-full absolute left-0 w-[50%] h-full"></div>
                    </div>  
                        </div>
                    <h1 className=" flex items-center  justify-center h-8 w-8 bg-white text-black rounded-full">
                        60
                        </h1>                  


                </div>
                <div>
                    <h1 className=" text-center text-xl my-10">Next STT Pay amount</h1>
                    <div className="flex space-x-2">
                        <div className="h-24 w-1/2 rounded-full bg-[#333333]">
                        </div>
                        <div className="h-24 w-1/2 rounded-full bg-[#333333]">
                        </div>
                    </div>
                </div>
            
            </div>
            <div className="w-1/2 border h-1/2 rounded-lg border-[#333333] p-4">
              <ul className="flex flex-col space-y-3">
                <li className="flex items-center justify-between text-xl">
                  <p>Current Supply</p>
                  <p>Next Halving supply</p>
                </li>
                <li className="flex items-center justify-between text-xl">
                  <p>61,345,345</p>
                  <p>31,000,000</p>
                </li>
                <li className="flex items-center justify-between text-xl">
                  <p>Current Reward</p>
                  <p>Next Reward </p>
                </li>
                <li className="flex items-center justify-between text-xl">
                  <p>$STT price </p>
                  <p>$STT  Market Cap</p>
                </li>
                <li className="flex items-center justify-between text-xl">
                  <p>$0.35</p>
                  <p>$27,000,000</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full z-90 relative md:w-[40%] md:fixed right-10">
            <ChatBox setIsOpen={setIsChatBoxOpen} isOpen={isChatBoxOpen} />
          </div>
        </div>
        <button
          onClick={() => {
            setIsChatBoxOpen((prev) => !prev);
          }}
          className="fixed bottom-2 z-30 right-8 shadow-xl p-1 rounded-full bg-dark"
        >
          <img
            src={logoCircle}
            className="h-10 w-10 object-contain md:h-12 md:w-12 bg-black rounded-full"
            alt="Chat Button"
          />
        </button>
      </div>
    </section>
  );
};

export default Mine;
