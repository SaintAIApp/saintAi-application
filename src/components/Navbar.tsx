import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useWalletService from "../hooks/useWallet";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ConnectModal from "./ConnectModal";
import NavMenu from "./NavMenu";
import { IoMenu, IoWallet } from "react-icons/io5";
import logo from "../assets/saintailogo.png";
import { updateGenericType } from "../redux/slices/widgetSlice";
import CategorySelector from "../components/CategorySelector";
const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { wallet } = useAppSelector((state) => state.wallet);
  const { disconnect } = useWalletService();

  const { curCategory, genericType } = useAppSelector((state) => state.widget);
  const [isMobile, setIsMobile] = useState(false);
  const { token, user } = useAppSelector((state) => state.auth);

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
  }, []);
  console.log(window.innerWidth);
  console.log(location.pathname);

  return (
    <div className="bg-[#0008] px-[3vw] max-md:px-5 lg:px-[3vw] py-4 w-full fixed left-0 top-0 z-[90] flex items-center justify-between h-12 backdrop-blur-3xl">
      {isMobile ? (
        <div className="flex flex-col w-full space-y-3">
          <div className="flex w-full justify-between">
            <div id="left">
              <Link to={"/"}>
                <img src={logo} className="h-5" />
              </Link>
            </div>
            <div id="right" className="flex items-center">
              <ul className="flex justify-between items-center space-x-3">
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
          {location.pathname == "/" && <CategorySelector />}
        </div>
      ) : (
        <>
          <div>
            <div id="left">
              <Link to={"/"}>
                <img src={logo} className="h-8" />
              </Link>
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
                {token && (
                  <>
                    <li>
                      <Link
                        className={`nav-link px-1 py-2 ${
                          location.pathname === "/" ? "active" : ""
                        }`}
                        to="/"
                      >
                        Generic
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={`nav-link px-1 py-2 ${
                          location.pathname === "/loaddata" ? "active" : ""
                        }`}
                        to="/loaddata"
                      >
                        Manual upload
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <button
                    onClick={() => {
                      navigate("/pricing");
                    }}
                    className=" bg-[#333] text-white px-4 mr-2 py-2 rounded-full"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  {!wallet ? (
                    <ConnectModal
                      triggerButton={
                        <div className="bg-[#fff] space-x-1 md:space-x-2 text-sm font-thin text-black rounded-full md:px-3 md:py-2 px-1 py-1 flex items-center">
                          <span className="">Connect Wallet</span>
                          {/* <IoWallet size={20} /> */}
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
              </ul>
            </div>
          </div>
          {location.pathname == "/" && (
            <div className="bottom mt-4 flex flex-col space-y-2 ">
              {window.innerWidth > 768 && (
                <div className="flex w-full justify-center space-x-3">
                  <button
                    className={`${
                      genericType === "generic1"
                        ? "text-blue font-semibold border-b-[0.7px] border-blue"
                        : ""
                    } pb-1`}
                    onClick={() => {
                      dispatch(
                        updateGenericType({
                          genericType: "generic1",
                          curCategory,
                        })
                      );
                    }}
                  >
                    Generic 1
                  </button>
                  <button
                    className={`${
                      genericType === "generic2"
                        ? "text-blue font-semibold border-b-[0.7px] border-blue"
                        : ""
                    } pb-1`}
                    onClick={() => {
                      dispatch(
                        updateGenericType({
                          genericType: "generic2",
                          curCategory,
                        })
                      );
                    }}
                  >
                    Generic 2
                  </button>
                </div>
              )}
              <CategorySelector />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
