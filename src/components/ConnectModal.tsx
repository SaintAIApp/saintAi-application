import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useWalletService from "../hooks/useWallet";

export default ({ button }: { button: any }) => {
  const {connect} = useWalletService();
  const handleMetaMaskWallet = async ()=>{
    connect();
    
  }
  return (
    <>
      <Dialog.Root defaultOpen={false}>
        <Dialog.Trigger>{button}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-[#0008] animate-overlayShow" />
          <Dialog.Content className=" text-white border-[2px] border-slate-800   bg-[#1b1b22] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[450px] max-h-[85vh]  rounded-lg shadow-custom2 p-6 animate-contentShow">
            <Dialog.Title className="flex justify-between py-3">
              <h1 className=" text-white text-2xl">Connect Wallet</h1>
              <Dialog.Close>
                <button className="text-white">
                  <XMarkIcon className="h-5 w-5" />{" "}
                </button>
              </Dialog.Close>
            </Dialog.Title>

            <Dialog.Description>
              <ul className="flex flex-col space-y-3 ">
                <li className="bg-[#28282f] flex p-2 rounded-lg">
                  <Dialog.Close className="w-full">
                    <button onClick={handleMetaMaskWallet} className="flex w-full items-center space-x-3">
                      <img className="h-10 w-10" src="./metamask.png"></img>{" "}
                      &nbsp; MetaMask
                    </button>
                  </Dialog.Close>
                </li>
                <li className="bg-[#28282f] flex p-2 rounded-lg">
                  <Dialog.Close className="w-full">
                    <button className="flex  w-full items-center space-x-3">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="./phantom.jpg"
                      ></img>
                      &nbsp; Phantom
                    </button>
                  </Dialog.Close>
                </li>
                <li className="bg-[#28282f] flex p-2 rounded-lg">
                  <Dialog.Close className="w-full">
                    <button className="flex w-full items-center space-x-3">
                      <img className="h-10 w-10" src="./solflare.png"></img>{" "}
                      &nbsp; Solflare
                    </button>
                  </Dialog.Close>
                </li>
              </ul>
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </>
  );
};
