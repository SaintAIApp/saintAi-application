import { notify } from "../utils/notify";
import { useAppDispatch } from "../redux/hooks";
import { connectWallet } from "../redux/slices/walletSlice";
import { useAccount, useConnect, useDisconnect } from "wagmi";
const useWalletService = () => {
  const dispath = useAppDispatch();
  const { isConnected, address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { connectors, connectAsync } = useConnect();

  const connect = async () => {
    connectAsync({ connector: connectors[0] })
      .then(() => {
        notify("Wallet connected successfully", true);
      })
      .catch((error) => {
        notify(error.cause.message, false);
      });

    //@ts-ignore
    // if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
    //   try {
    //     //@ts-ignore
    //     const accounts = await window.ethereum.request({
    //       method: "eth_requestAccounts",
    //     });
    //     console.log(accounts[0]);
    //     dispath(connectWallet({ wallet: { walledId: accounts[0] } }));
    //     notify("Connected", true);
    //   } catch (error: any) {
    //     notify(error.message, false);
    //   }
    // } else {
    //   notify("Please install Metamask wallet", false);
    // }
  };

  const getCurrentWalletConnected = async () => {
    //@ts-ignore
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        //@ts-ignore
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          dispath(connectWallet({ wallet: { walledId: accounts[0] } }));
        } else {
          console.log("Connect to wallet");
        }
      } catch (error: any) {
        notify(error.message, false);
      }
    } else {
      notify("Please install Metamask wallet", false);
    }
  };

  const handleAccountChanged = async () => {
    //@ts-ignore
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      //@ts-ignore
      window.ethereum.on("accountsChanged", (account) => {
        dispath(connectWallet({ wallet: { walledId: account[0] } }));
      });
    } else {
      notify("Please install metamask wallet", false);
    }
  };

  const disconnect = async () => {
    try {
      disconnectAsync().then(() => {
        notify("Wallet has disconnected", true);
      });
      // dispath(disconnectWallet());
      notify("Disconnected", true);
    } catch (error: any) {
      notify(error.message, false);
    }
  };

  return {
    connect,
    handleAccountChanged,
    getCurrentWalletConnected,
    disconnect,
    isConnected,
    address,
  };
};
export default useWalletService;
