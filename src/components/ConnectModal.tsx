import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useWalletService from "../hooks/useWallet";
import { useWallet } from "@solana/wallet-adapter-react";

// eslint-disable-next-line react-refresh/only-export-components
export default ({ triggerButton }: { triggerButton: React.ReactNode }) => {
  const { connect, connectSolana } = useWalletService();
  const { wallets } = useWallet();

  const handleMetaMaskWallet = async () => {
    connect();
  };
  const handleSolanaWallet = async (walletName: any) => {
    connectSolana({ walletName });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>{triggerButton}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0  bg-[#0008] animate-overlayShow" />
        <Dialog.Content className=" z-50 text-white border-[2px] border-slate-800   bg-[#1b1b22] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[450px] max-h-[85vh]  rounded-lg shadow-custom2 p-6 animate-contentShow">
          <Dialog.Title className="flex text-white text-2xl justify-between py-3">
            Connect Wallet
            <Dialog.Close>
              <XMarkIcon className="h-5 w-5" />
            </Dialog.Close>
          </Dialog.Title>

          <>
            <ul className="flex flex-col space-y-3 ">
              <li className="bg-[#28282f] flex p-2 rounded-lg">
                <Dialog.Close
                  onClick={handleMetaMaskWallet}
                  className="flex w-full items-center space-x-3"
                >
                  <img className="h-10 w-10" src="./metamask.png"></img> &nbsp;
                  MetaMask
                </Dialog.Close>
              </li>
              <li className="bg-[#28282f] flex p-2 rounded-lg">
                <Dialog.Close
                  onClick={() => {
                    handleSolanaWallet(wallets[0].adapter.name);
                  }}
                  className="w-full flex items-center space-x-3"
                >
                  <img
                    className="h-10 w-10 rounded-full"
                    src="./phantom.jpg"
                  ></img>
                  &nbsp; Phantom
                </Dialog.Close>
              </li>
              <li className="bg-[#28282f] flex p-2 rounded-lg">
                <Dialog.Close
                  onClick={() => {
                    handleSolanaWallet(wallets[2].adapter.name);
                  }}
                  className="flex w-full items-center space-x-3"
                >
                  <img className="h-10 w-10" src="./solflare.png"></img>
                  &nbsp; Solflare
                </Dialog.Close>
              </li>
            </ul>
          </>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
