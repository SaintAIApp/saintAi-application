// import { WalletIcon } from "@heroicons/react/24/outline";
import useWalletService from "../hooks/useWallet";
import { useAppSelector } from "../redux/hooks";
import ConnectModal from "./ConnectModal";

const Navbar = () => {
  const {wallet} = useAppSelector((state:any)=>{return state.wallet});
  console.log(wallet)
  const {disconnect} = useWalletService();
  const handleDisconnectWallet = ()=>{
    disconnect();

  }
  return (
    <div className="">
      {/* TOP */}
      <div id="top" className="flex items-center justify-between">
        <div id="left">
          <h1 className="font-heading text-white text-lg">SaintAi</h1>
        </div>
        <div id="right" className="flex items-center">
          <ul className="flex items-center space-x-3">
            <li>
              <h1>Menu</h1>
            </li>
            <li>
              { !wallet ? <ConnectModal
                button={
                  <button className="bg-white text-black rounded-md px-2 py-1 flex items-center ">
                    Connect Wallet
                  </button>
                }
              />:<button onClick={handleDisconnectWallet} className=" bg-red-400 text-white px-2 py-1 rounded-full">Disconnect</button>}
            </li>
          </ul>
        </div>
      </div>
      {/* BOTTOM */}
      <div id="top"></div>
    </div>
  );
};

export default Navbar;
