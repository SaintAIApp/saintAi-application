import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useWalletService from "../hooks/useWallet";
import { useAppSelector } from "../redux/hooks";
import ConnectModal from "./ConnectModal";
import NavMenu from "./NavMenu";
import { IoMenu, IoWallet } from "react-icons/io5";
import AvatarDropDown from "./AvatarDropDown";
import logo from "../assets/saintailogo.png"
const Navbar = () => {
  const location = useLocation()

  const { wallet } = useAppSelector((state) => state.wallet);
  const { disconnect } = useWalletService();
  const { token, user } = useAppSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");

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
  }, []);

  useEffect(() => {
   
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
          // else
          //   setCurrentSection("")
        });
      },
      { threshold: 0 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [location]);

  return (
    <div className="bg-[#0008] px-[3vw] max-md:px-6 lg:px-[8vw] w-full fixed z-[100] py-4 backdrop-blur-3xl top-0">
      {isMobile ? (
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between">
            <div id="left">
              <Link to={"/"}>
                <img src={logo} className="h-5"/>
                {/* <h1 className="font-heading text-white text-lg">  </h1> */}
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
        <div className="flex items-center justify-between">
          <div id="left">
          <img src={logo} className="h-8"/>
            {/* <h1 className="font-heading text-white text-lg">SaintAi</h1> */}
          </div>
          <div className="center">
            <ul className="flex md:space-x-2 px-4 py-2 rounded-full border-[0.3px] font-thin text-sm border-[#1f2550]">
              <li
                className={
                  currentSection === "home"  ? "text-primary font-bold" : ""
                }
              >
              <a href="/#home">Home</a>
              </li>
              <li
                className={
                  currentSection === "network"  ? "text-primary font-bold" : ""
                }
              >
                <a href="/#network">Network</a>
              </li>
              <li
                className={
                  currentSection === "roadmaps"  ? "text-primary font-bold" : ""
                }
              >
                <a href="/#roadmaps">Roadmaps</a>
              </li>
              <li
                className={
                  currentSection === "contactus"  ? "text-primary font-bold" : ""
                }
              >
                <a href="/#contactus">Contact Us</a>
              </li>
            </ul>
          </div>
          <div id="right" className="flex items-center">
            <ul className="flex items-center space-x-2">
              {!token && (
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
              )}
              {!token && (
                <li>
                  <div className="bg-[#fff] space-x-1 md:space-x-2 text-sm font-thin text-black rounded-md md:px-3 md:py-2 px-1 py-1 flex items-center">
                    <Link to={"/signup"}>Sign Up</Link>
                  </div>
                </li>
              )}
              <li>
                {!wallet ? (
                  <ConnectModal
                    triggerButton={
                      <div className="bg-[#2f2e38] space-x-1 md:space-x-2 text-sm font-thin text-white rounded-md md:px-3 md:py-2 px-1 py-1 flex items-center">
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
                    Disconnect
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
