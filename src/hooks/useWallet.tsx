import { notify } from "../utils/notify";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { connectWallet } from "../redux/slices/walletSlice";
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-base";
import axios from "axios";
import { useEffect } from "react";
const useWalletService = () => {
  const dispatch = useAppDispatch();
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { wallet } = useAppSelector((state) => state.wallet);
  const {
    connect: solanaConnect,
    select,
    publicKey,
    connected,
    disconnect: solanaDisconnect,
  } = useWallet();
  const { disconnectAsync } = useDisconnect();
  const { connectors, connectAsync } = useConnect();

  const cryptoSigin = async ({ chainId, networkName, walletAddress }: any) => {
    await axios({
      url: "https://saintai-backend.onrender.com/api/v1/user/crypto-signin",
      method: "POST",
      data: {
        chainId,
        networkName,
        walletAddress,
      },
    });
  };
  useEffect(() => {
    console.log("sdnfnsd");
    if (isConnected) {
      cryptoSigin({
        chainId: chain?.id,
        networkName: "SOLANA",
        walletAddress: address,
      });
      return;
    }
    if (connected) {
      cryptoSigin({
        chainId: 900,
        networkName: "SOLANA",
        walletAddress: publicKey?.toBase58(),
      });
      return;
    }
  }, [connected, isConnected]);

  const connect = async () => {
    connectAsync({ connector: connectors[0] })
      .then(() => {
        dispatch(
          connectWallet({
            wallet: {
              walletNetwork: "metamask",
            },
          })
        );

        notify("Wallet connected successfully", true);
      })
      .catch((error) => {
        notify(error.cause.message, false);
      });
  };
  const connectSolana = async ({
    walletName,
  }: {
    walletName: WalletName | null;
  }) => {
    await select(walletName);
    await solanaConnect()
      .then(() => {
        dispatch(
          connectWallet({
            wallet: {
              walletNetwork: "solana",
            },
          })
        );

        notify("Wallet connected successfully", true);
      })
      .catch((error) => {
        console.log(error);
        notify(error.message, false);
      });
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
      if (isConnected) {
        disconnectAsync().then(() => {
          notify("Wallet has disconnected", true);
        });
      }
      if (connected) {
        await solanaDisconnect().then(() => {
          notify("Wallet has disconnected", true);
        });
      }

      dispatch(
        connectWallet({
          wallet: null,
        })
      );

      // notify("Disconnected", true);
    } catch (error: any) {
      notify(error.message, false);
    }
  };

  return {
    connect,
    handleAccountChanged,
    getCurrentWalletConnected,
    disconnect,
    currentNetwork: wallet?.walletNetwork,
    isConnected: isConnected || connected,
    address: address || publicKey?.toBase58(),
    connectSolana,
  };
};
export default useWalletService;
