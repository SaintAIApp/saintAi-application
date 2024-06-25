import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWalletService from "../hooks/useWallet";
import { useAppSelector } from "../redux/hooks";
import ConnectModal from "./ConnectModal";
import NavMenu from "./NavMenu";
import { IoMenu, IoWallet } from "react-icons/io5";
// import AvatarDropDown from "./AvatarDropDown";
import logo from "../assets/saintailogo.png";
// import { useAppDispatch } from "../redux/hooks";
// import { logout } from "../redux/slices/authSlice";
// import { clearPlan } from "../redux/slices/subscriptionSlice";
const Navbar = () => {
  // const dispatch = useAppDispatch()

  const { wallet } = useAppSelector((state) => state.wallet);
  const { disconnect } = useWalletService();
  const { token, user } = useAppSelector((state) => state.auth);
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
  }, []);


  return (
    <div className="bg-[#0008] px-[3vw] max-md:px-5 lg:px-[3vw] w-full fixed z-[100] py-4 backdrop-blur-3xl top-0">
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

            <Link to={"/"}>
              <img src={logo} className="h-8"/>
            </Link>
            {/* <h1 className="font-heading text-white text-lg">SaintAi</h1> */}
          </div>
         
          <div id="right" className="flex items-center">
            <ul className="flex items-center space-x-2">
              {/* <li>    <Link className="bg-white text-black px-2 py-2 rounded-md" to={"/loaddata"}>
               Manual upload
               </Link> </li> */}
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
                  // <AvatarDropDown
                  //   triggerButton={
                  //     <button className="rounded-full flex items-center">
                  //       <img
                  //         className="h-8 w-8"
                  //         src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                  //         alt="User Avatar"
                  //       />
                  //     </button>
                  //   }
                  // />
                  <Link to={"/profile"}>Profile</Link>
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
