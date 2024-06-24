import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import useWalletService from "../hooks/useWallet";
import { useAppSelector } from "../redux/hooks";
import ConnectModal from "./ConnectModal";
import NavMenu from "./NavMenu.tsx";
import { IoMenu, IoWallet } from "react-icons/io5";

import AvatarDropDown from "./AvatarDropDown.tsx";

const Navbar = () => {
  const location = useLocation();
  const { disconnect, isConnected, currentNetwork, address } =
    useWalletService();
  console.log(currentNetwork, "currentNetworkcurrentNetwork");
  const { token, user } = useAppSelector((state) => {
    return state.auth;
  });
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
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location.pathname]);

  return (
    <div className="  bg-[#0008] px-3  md:px-[10vw] w-full fixed z-[100] py-4 backdrop-blur-3xl top-0 ">
      {isMobile ? (
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between">
            <div id="left">
              <Link to={"/"}>
                <h1 className="font-heading text-white text-lg">SaintAi</h1>
              </Link>
            </div>
            <div id="right" className="flex items-center">
              <ul className="flex items-center space-x-3">
                <li>
                  {!isConnected ? (
                    <ConnectModal
                      triggerButton={
                        <button className="bg-[#2f2e38] focus:ring-2 focus:ring-primary outline-none  space-x-1 md:space-x-2  text-sm font-thin text-white  rounded-md md:px-3 md:py-2 px-1 py-1 flex items-center">
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
                      <button className="bg-[#2f2e38] focus:ring-2 focus:ring-primary outline-none  space-x-1 md:space-x-2  text-sm font-thin text-white  rounded-md md:px-3 md:py-2 px-1 py-1 flex items-center">
                        <span className="">Menu</span>
                        <IoMenu />
                      </button>
                    }
                  />
                </li>
              </ul>
            </div>
          </div>

          {/* <div>
            <div className="center">
              <ul className="flex justify-center space-x-1 md:space-x-2  px-4 py-2 rounded-full border-[0.3px] font-thin text-sm border-[#1f2550]">
                <li
                  className={`${
                    location.pathname === "/" ? "text-primary font-bold" : ""
                  }`}
                >
                  <Link to="/">Home</Link>
                </li>
                <li
                  className={`${
                    location.pathname.includes("network")
                      ? "text-primary font-bold"
                      : ""
                  }`}
                >
                  <Link to="/network">Network</Link>
                </li>
                <li
                  className={`${
                    location.pathname.includes("roadmaps")
                      ? "text-primary font-bold"
                      : ""
                  }`}
                >
                  <Link to="/roadmaps">Roadmaps</Link>
                </li>
                <li
                  className={`${
                    location.pathname.includes("contactus")
                      ? "text-primary font-bold"
                      : ""
                  }`}
                >
                  <Link to="/contactus">ContactUs</Link>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div id="left">
            <h1 className="font-heading text-white text-lg">SaintAi</h1>
          </div>
          <div className="center">
            <ul className="flex  md:space-x-2 px-4 py-2 rounded-full border-[0.3px] font-thin text-sm border-[#1f2550]">
              <li
                className={`${
                  location.pathname === "/" ? "text-primary font-bold" : ""
                }`}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                className={`${
                  location.pathname.includes("network")
                    ? "text-primary font-bold"
                    : ""
                }`}
              >
                <a href="/#network">Network</a>
              </li>
              <li
                className={`${
                  location.pathname.includes("roadmaps")
                    ? "text-primary font-bold"
                    : ""
                }`}
              >
                <a href="/#roadmaps">Roadmaps</a>
              </li>
              <li
                className={`${
                  location.pathname.includes("contactus")
                    ? "text-primary font-bold"
                    : ""
                }`}
              >
                <a href="/#contactus">ContactUs</a>
              </li>
              <li>
                {!token && (
                  <div className="flex space-x-2 mr-2 items-center">
                    <Link to={"/login"} className="">
                      Login
                    </Link>
                    <Link to={"/signup"} className=" ">
                      Sign Up
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div id="right" className="flex items-center">
            <ul className="flex items-center space-x-2">
              <li>
                {!isConnected ? (
                  <ConnectModal
                    triggerButton={
                      <div className="bg-[#2f2e38] space-x-1 md:space-x-2  text-sm font-thin text-white  rounded-md md:px-3 md:py-2 px-1 py-1 flex items-center">
                        <span className="">Connect Wallet</span>
                        <IoWallet size={20} />
                      </div>
                    }
                  />
                ) : (
                  <button
                    onClick={handleDisconnectWallet}
                    className="bg-red-400 text-white px-2 py-1 rounded-full"
                  >
                    Disconnect {address} &nbsp;
                    {currentNetwork}
                  </button>
                )}
              </li>

              <li>
                {token && user && (
                  <AvatarDropDown
                    triggerButton={
                      <button className="rounded-full flex items-center">
                        <img
                          className="h-8 w-8"
                          src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                          alt="User Avatar"
                        />
                      </button>
                    }
                  />
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
