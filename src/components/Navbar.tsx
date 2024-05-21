import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import useWalletService from "../hooks/useWallet";
import { useAppSelector } from "../redux/hooks";
import ConnectModal from "./ConnectModal";

const Navbar = () => {
  const location = useLocation();
  const { wallet } = useAppSelector((state) => state.wallet);
  const { disconnect } = useWalletService();

  const handleDisconnectWallet = () => {
    disconnect();
  };

  useEffect(() => {
    // Any side-effects related to location change can be handled here
  }, [location.pathname]);

  return (
    <div className="px-[6vw] bg-[#0008] max-md:px-8 lg:px-[15vw] sticky z-[100] py-4 backdrop-blur-3xl top-0 ">
      {/* TOP */}
      <div id="top" className="flex items-center justify-between">
        <div id="left">
          <h1 className="font-heading text-white text-lg">SaintAi</h1>
        </div>
        <div className="center">
          <ul className="flex space-x-2 px-4 py-2 rounded-full border-[0.3px] font-thin text-sm border-[#1f2550]">
            <li className={`${location.pathname === "/" ? "text-primary font-bold" : ""}`}>
              <Link to="/">Home</Link>
            </li>
            <li className={`${location.pathname.includes("network") ? "text-primary font-bold" : ""}`}>
              <Link to="/network">Network</Link>
            </li>
            <li className={`${location.pathname.includes("roadmaps") ? "text-primary font-bold" : ""}`}>
              <Link to="/roadmaps">Roadmaps</Link>
            </li>
            <li className={`${location.pathname.includes("contactus") ? "text-primary font-bold" : ""}`}>
              <Link to="/contactus">ContactUs</Link>
            </li>
          </ul>
        </div>
        <div id="right" className="flex items-center">
          <ul className="flex items-center space-x-3">
            <li>
              {!wallet ? (
                <ConnectModal
                  button={
                    <button className="bg-white text-sm font-thin text-black rounded-md px-2 py-1 flex items-center">
                      Connect Wallet
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
          </ul>
        </div>
      </div>
      {/* BOTTOM */}
      <div id="bottom"></div>
    </div>
  );
};

export default Navbar;
