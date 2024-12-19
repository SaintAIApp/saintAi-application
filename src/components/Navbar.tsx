import { memo, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useWalletService from "../hooks/useWallet";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ConnectModal from "./ConnectModal";
import NavMenu from "./NavMenu";
import { IoMenu, IoWallet } from "react-icons/io5";
import logo from "../assets/saintailogo.png";
import { searchTitle, updateGenericType } from "../redux/slices/widgetSlice";
import { logout } from "../redux/slices/authSlice";
import { setCurrentModal } from "../redux/slices/modalSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { wallet } = useAppSelector((state) => state.wallet);
  const loggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const { disconnect, currentNetwork } = useWalletService();

  console.log({ currentNetwork });

  const { curCategory } = useAppSelector((state) => state.widget);
  const [isMobile, setIsMobile] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
  };


  const handleDisconnectWallet = () => {
    disconnect();
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 762);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    if (window.innerWidth <= 769) {
      dispatch(updateGenericType({ curCategory, genericType: "generic1" }));
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, curCategory]);

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchTitle({ search: event.target.value }));
  };

  return (
    <>
      <div className="bg-[#0008] px-[3vw] max-md:px-10 w-full sticky py-10 left-0 top-0 z-[90] flex items-center justify-between h-16 backdrop-blur-3xl border-b border-gray-700">
        {isMobile ? (
          <div className="flex flex-col w-full space-y-3">
            <div className="flex w-full justify-between">
              <div id="left" className="block">
                <Link to={"/"} className="">
                  <img src={logo} className="h-5" alt="Logo" />
                </Link>
                <div className="w-32 mt-3">
                  <div className="relative flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-1.5 left-2.5 text-slate-600">
                      <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                    </svg>

                    <input
                      className="w-full bg-[#333333] placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      placeholder="Search"
                    />

                  </div>
                </div>
              </div>
              <div id="right" className="flex items-center">
                <ul className="flex justify-between items-stretch space-x-3">
                  <li>
                    {!wallet ? (
                      <ConnectModal
                        triggerButton={
                          <button className="bg-[#2f2e38] focus:ring-2 focus:ring-primary outline-none space-x-1 md:space-x-2 text-sm font-thin md:text-base text-white rounded-md md:px-3 md:py-2 px-1 py-1 flex items-center ">
                            <span className="">Connect Wallet</span>
                            <IoWallet size={20} />
                          </button>
                        }
                      />
                    ) : (
                      <button
                        onClick={handleDisconnectWallet}
                        className="bg-purple text-white md:px-3 md:py-2 px-2 py-1 rounded-md text-sm h-full"
                      >
                        Disconnect
                      </button>
                    )}
                  </li>
                  <li className="flex items-stretch">
                    <NavMenu
                      triggerButton={
                        <button
                          aria-label="Menu"
                          className="bg-[#2f2e38] aspect-square focus:ring-2 focus:ring-primary outline-none space-x-1 md:space-x-2 text-sm font-thin text-white rounded-md p-2 md:p-3 flex items-center"
                        >
                          <IoMenu className="h-full w-full" />
                        </button>
                      }
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <>
              <div id="left relative z-[90]" className="flex items-center">
                <Link to={"/"}>
                  <img src={logo} className="h-8" alt="Logo" />
                </Link>
                <div className="w-[170px] ml-12">
                  <div className="relative flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-1.5 left-2.5 text-slate-200">
                      <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                    </svg>

                    <input
                      onChange={(event) => onChangeSearch(event)}
                      className="w-full bg-black placeholder:text-slate-400 text-white text-sm border border-gray-700 rounded-md pl-10 pr-3 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      placeholder="Search..."
                    />

                  </div>
                </div>
            </div>

            <div id="right" className="flex items-center">
              <ul className="flex items-center space-x-2">
                <li>
                  <button
                    onClick={() => {
                      navigate("/pricing");
                    }}
                    className="text-white px-4 py-2 rounded-full"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  {!wallet ? (
                    <ConnectModal
                      triggerButton={
                        <div className="bg-[#fff] space-x-1 md:space-x-2 text-sm text-black rounded-full md:px-3 md:py-2 px-1 py-1 flex items-center">
                          <span className="">Connect Wallet</span>
                          {/* <IoWallet size={20} /> */}
                        </div>
                      }
                    />
                  ) : (
                    <button
                      onClick={handleDisconnectWallet}
                      className="bg-purple text-white px-4 py-2 rounded-full flex items-center gap-1"
                    >
                      <WalletIcon />
                      Disconnect
                    </button>
                  )}
                </li>
                <li>
                  {loggedIn ? (
                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                      className="bg-[#333] text-white px-4 py-2 rounded-full"
                    >
                      Log out
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        dispatch(setCurrentModal("login"));
                      }}
                      className="bg-primary text-white px-4 py-2 rounded-full"
                    >
                      Login
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const WalletIcon = () => {
  const { currentNetwork } = useWalletService();
  const networkIcon = useMemo(() => {
    if (currentNetwork === "metamask") {
      return "/metamask.png";
    }
    if (currentNetwork === "phantom") {
      return "/phantom.png";
    }
    if (currentNetwork === "solflare") {
      return "/solflare.png";
    }
  }, [currentNetwork]);
  return <img src={networkIcon} className="h-4 lg:h-5 inline-block" alt="Wallet Icon" />;
};

export default memo(Navbar);
