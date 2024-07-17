import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWalletService from "../hooks/useWallet";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ConnectModal from "./ConnectModal";
import NavMenu from "./NavMenu";
import { IoMenu, IoWallet } from "react-icons/io5";
import logo from "../assets/saintailogo.png";
import { updateGenericType } from "../redux/slices/widgetSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const { wallet } = useAppSelector((state) => state.wallet);
  const { disconnect } = useWalletService();

  const {  curCategory } = useAppSelector((state) => state.widget);
  const [isMobile, setIsMobile] = useState(false);

  const handleDisconnectWallet = () => {
    disconnect();
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 762);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    if (window.innerWidth <= 769) {
      dispatch(updateGenericType({ curCategory, genericType: "generic1" }));
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, curCategory]);

  return (
    <div className="bg-[#0008] px-[3vw] max-md:px-5 lg:px-[3vw] w-full fixed top-0 z-[90] py-3 backdrop-blur-3xl">
      {isMobile ? (
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between">
            <div id="left">
              <Link to={"/"}>
                <img src={logo} className="h-5" />
              </Link>
            </div>
            <div id="right" className="flex items-center">
              <ul className="flex items-center space-x-3">
                <li>
                  {!wallet ? (
                    <ConnectModal
                      triggerButton={
                        <button className="bg-[#2f2e38] focus:ring-2 focus:ring-primary outline-none space-x-1 md:space-x-2 text-sm font-thin text-white rounded-md md:px-3 md:py-2 px-1 py-1 flex items-center">
                          <span className="">Connect Wallet</span>
                          <IoWallet size={20} />
                        </button>
                      }
                    />
                  ) : (
                    <button
                      onClick={handleDisconnectWallet}
                      className="bg-red-400 text-white px-2 py-1 rounded-full"
                    >
                      Disconnect
                    </button>
                  )}
                </li>
                <li>
                  <NavMenu
                    triggerButton={
                      <button className="bg-[#2f2e38] focus:ring-2 focus:ring-primary outline-none space-x-1 md:space-x-2 text-sm font-thin text-white rounded-md md:px-3 md:py-2 px-1 py-1 flex items-center">
                        <span className="">Menu</span>
                        <IoMenu />
                      </button>
                    }
                  />
                </li>
              </ul>
            </div>
          </div>
         
        </div>
      ) : (
        <div className="flex flex-col ">
          <div className="flex items-center justify-between top">
            <div id="left">
              <Link to={"/"}>
                <img src={logo} className="h-8" />
              </Link>
            </div>

            <div id="right" className="flex items-center">
              <ul className="flex items-center space-x-2">
               <li><button className=" bg-[#333] text-white px-4 mr-2 py-2 rounded-full">
                Pricing</button></li>
                <li>
                  {!wallet ? (
                    <ConnectModal
                      triggerButton={
                        <div className="bg-[#fff] space-x-1 md:space-x-2 text-sm font-thin text-black rounded-full md:px-3 md:py-2 px-1 py-1 flex items-center">
                          <span className="">Connect Wallet</span>
                          {/* <IoWallet size={20} /> */}
                        </div>
                      }
                    />
                  ) : (
                    <button
                      onClick={handleDisconnectWallet}
                      className="bg-red-400 text-white px-2 py-1 rounded-full"
                    >
                      Disconnect
                    </button>
                  )}
                </li>
               
              </ul>
            </div>
          </div>
         
        </div>
      )}
    </div>
  );
};

export default Navbar;
