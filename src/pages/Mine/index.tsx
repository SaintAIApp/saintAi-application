import { useEffect, useState } from "react";
import ChatBox from "../../components/Chat/ChatBox";

import logoCircle from "../../assets/saintlogocircle.png";
import { useAppSelector } from "../../redux/hooks";
import { jwtDecode } from "jwt-decode";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import LoginPage from "../Auth/Login";
import Signup from "../Auth/SignUp";
import VerifyOtp from "../Auth/OTP";
import ChatComponent from "../Widgets/ChatComponent";

const Mine = () => {
  const [currentModal, setCurrentModal] = useState<string>("lock");

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(true);
  const store = useAppSelector((state) => state);
  const { auth: authObject } = store;

  useEffect(() => {
    const { user, token } = authObject;
    if (!token || (user && !user.isActive)) {
      setIsLoggedIn(false);
    } else {
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.expiresIn * 1000 < Date.now()) {
          alert("Session Expired, please login again");
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [authObject]);

  return (
    <section className="overflow-x-hidden  flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 p-4 ml-0 md:ml-10">
      {!isLoggedIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="text-center text-white flex flex-col items-center">
            {currentModal === "lock" ? (
              <div className="flex flex-col items-center space-y-3">
                <LockClosedIcon className=" h-12 w-12 " />
                <h1 className="my-3">Please login to access this page</h1>
                <button
                  className="bg-primary text-white px-3 py-1 rounded-md "
                  onClick={() => {
                    setCurrentModal("login");
                  }}
                >
                  Login
                </button>
              </div>
            ) : currentModal === "login" ? (
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                setCurrentModal={setCurrentModal}
              />
            ) : currentModal === "signup" ? (
              <Signup
                setIsLoggedIn={setIsLoggedIn}
                setCurrentModal={setCurrentModal}
              />
            ) : (
              <VerifyOtp
                setIsLoggedIn={setIsLoggedIn}
                setCurrentModal={setCurrentModal}
              />
            )}
          </div>
        </div>
      )}
      <div className="w-full flex space-x-2 lg:w-full">
        <div className="flex w-full md:w-3/5 flex-col lg:flex-row items-start justify-between space-y-4 lg:space-y-0 lg:space-x-4 ">
          <div className=" h-[85vh] overflow-y-auto flex flex-col space-y-4 w-full ">
            <div className="border rounded-lg border-[#333333] p-4 flex flex-col justify-center">
              <div className="w-full h-16 bg-[#333333] rounded-full flex items-center px-5 space-x-3">
                <h1 className="flex items-center justify-center text-sm h-6 w-6 md:h-8 md:w-8 bg-white text-black rounded-full">
                  0
                </h1>
                <div className="flex w-full flex-col justify-center">
                  <h1>50</h1>
                  <div className="relative h-4 w-full bg-white rounded-full">
                    <div className="bg-[#FF9B26] rounded-full absolute left-0 w-[50%] h-full"></div>
                  </div>
                </div>
                <h1 className="flex items-center justify-center h-6 w-6 md:h-8 md:w-8 bg-white text-black text-sm rounded-full">
                  60
                </h1>
              </div>
              <div>
                <h1 className="text-center text-xl my-6">
                  Next STT Pay amount
                </h1>
                <div className="flex space-x-2">
                  <div className="h-12 md:h-24 w-1/2 rounded-full bg-[#333333]"></div>
                  <div className="h-12 md:h-24 w-1/2 rounded-full bg-[#333333]"></div>
                </div>
              </div>
            </div>
            <div className="border rounded-lg border-[#333333] p-4">
              <ul className="flex flex-col space-y-3">
                <li className="flex items-center justify-between text-sm lg:text-xl">
                  <p>Current Supply</p>
                  <p>Next Halving supply</p>
                </li>
                <li className="flex items-center justify-between text-sm lg:text-xl">
                  <p>61,345,345</p>
                  <p>31,000,000</p>
                </li>
                <li className="flex items-center justify-between text-sm lg:text-xl">
                  <p>Current Reward</p>
                  <p>Next Reward</p>
                </li>
                <li className="flex items-center justify-between text-sm lg:text-xl">
                  <p>$STT price</p>
                  <p>$STT Market Cap</p>
                </li>
                <li className="flex items-center justify-between text-sm lg:text-xl">
                  <p>$0.35</p>
                  <p>$27,000,000</p>
                </li>
              </ul>
            </div>
          </div>
          {window.innerWidth < 768 && (
            <div className="w-full lg:w-2/5">
              <ChatBox setIsOpen={setIsChatBoxOpen} isOpen={isChatBoxOpen} />
            </div>
          )}
        </div>
        {window.innerWidth>768 &&
          <div className="w-2/5 ">
            <ChatComponent isOpen />
          </div>}
        
      </div>
      {window.innerWidth < 768 && (
        <button
          onClick={() => setIsChatBoxOpen((prev) => !prev)}
          className="fixed bottom-4 right-4 z-30 shadow-xl p-1 rounded-full bg-dark lg:hidden"
        >
          <img
            src={logoCircle}
            className="h-10 w-10 object-contain bg-black rounded-full"
            alt="Chat Button"
          />
        </button>
      )}
    </section>
  );
};

export default Mine;
