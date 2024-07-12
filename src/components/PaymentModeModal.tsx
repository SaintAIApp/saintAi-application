import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";
// import useWalletService from "../hooks/useWallet";
import stripeLogo from "../assets/stripelogo.png"
import coinbaseLogo from "../assets/coinbaseLogo.png"
export default ({ triggerButton,createStripeCheckout,createCoinbaseCheckout }: { triggerButton: React.ReactNode,createStripeCheckout:any,createCoinbaseCheckout:any }) => {
  // const {connect} = useWalletService();
  // const handleMetaMaskWallet = async ()=>{
  //   connect();
  // }

  return (
      <Dialog.Root  >
        <Dialog.Trigger>{triggerButton}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0  bg-[#0008] animate-overlayShow" />
          <Dialog.Content className=" z-50 text-white border-[2px] border-slate-800   bg-[#1b1b22] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[450px] max-h-[85vh]  rounded-lg shadow-custom2 p-6 animate-contentShow">
            <Dialog.Title className="flex text-white text-2xl justify-between py-3">
               Select payment mode
              <Dialog.Close>
                  <XMarkIcon className="h-5 w-5" />
              </Dialog.Close>
            </Dialog.Title>
      
            <>
              <ul className="flex flex-col space-y-3 ">
                <li className="bg-[#28282f] flex p-2 rounded-lg">
                  <Dialog.Close onClick={createStripeCheckout} className="flex w-full items-center space-x-3">
                      <img className="h-10 w-10 rounded-full object-cover" src={stripeLogo}></img>
                      &nbsp; Stripe
                  </Dialog.Close>
                </li>
                <li className="bg-[#28282f] flex p-2 rounded-lg">
                  <Dialog.Close onClick={createCoinbaseCheckout} className="w-full flex items-center space-x-3">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={coinbaseLogo}
                      ></img>
                      &nbsp; CoinBase
                  </Dialog.Close>
                </li>
              
              </ul>
            </>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>


  );
};
