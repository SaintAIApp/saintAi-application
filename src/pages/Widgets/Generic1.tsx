import { Column } from "../../components/Column";
import { useEffect, useState } from "react";
import ChatBox from "../../components/Chat/ChatBox";
import { useLocation } from "react-router-dom";
import logoCircle from "../../assets/saintlogocircle.png";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { jwtDecode } from "jwt-decode";
import useFinanceService from "../../hooks/useFinance";
import Loader from "../../components/Loader";
import { updateCurCategory } from "../../redux/slices/widgetSlice";
import LoginPage from "../Auth/Login";
import Signup from "../Auth/SignUp";
import VerifyOtp from "../Auth/OTP";
import ChatComponent from "./ChatComponent";
import { LockClosedIcon } from "@heroicons/react/24/outline";

const Generic1 = () => {
  const { getStocksData, getCryptoData, getNewsData } = useFinanceService();
  const dispatch = useAppDispatch();

  // Authentication
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const store = useAppSelector((state) => state);
  const { auth: authObject, widget } = store;
  const curCategory = widget.curCategory;
  const location = useLocation();

  const [isChatBoxOpen, setIsChatBoxOpen] = useState(true);
  const [graphSelected, setGraphSelected] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  const [currentModal, setCurrentModal] = useState<string>("lock");
  const [isDataLoading, setIsDataLoading] = useState(false);

  const fetchCategoryData = async (category: string) => {
    try {
      setIsDataLoading(true);
      let res;
      switch (category) {
        case "stocks":
          res = await getStocksData();
          break;
        case "crypto":
          res = await getCryptoData();
          break;
        case "news":
          res = await getNewsData();
          break;
        default:
          dispatch(
            updateCurCategory({
              curCategory: "stocks",
              genericType: "generic1",
            })
          );
          res = await getStocksData();
          break;
      }
      if (res) {
        setList(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    if (category !== null) {
      fetchCategoryData(category);
    } else {
      fetchCategoryData(curCategory);
    }
  }, [curCategory]);

  useEffect(() => {
    window.innerWidth <= 768 && setIsChatBoxOpen(false);
  }, [graphSelected]);

  useEffect(() => {
    const { user, token } = authObject;
    if (!token || (user && !user.isActive)) {
      setIsLoggedIn(false);
    } else {
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.expiresIn * 1000 < Date.now()) {
          alert("Session Expired, please login again");
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [authObject]);

  return (
    <section className="overflow-x-hidden min-h-screen flex flex-row space-x-3">
      <div className="w-full md:w-4/5 h-full relative">


          


        {!isLoggedIn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="text-center text-white flex flex-col items-center">
              {currentModal === "lock" ? (
                <div className="flex flex-col items-center space-y-3">
                  <LockClosedIcon className=" h-12 w-12 " />
                  <h1 className="my-3">Please login to access this page</h1>
                  <button
                    className="bg-primary text-white px-3 py-1 rounded-md "
                    onClick={() => {
                      setCurrentModal("login");
                    }}
                  >
                    Login
                  </button>
                </div>
              ) : currentModal === "login" ? (
                <LoginPage
                  setIsLoggedIn={setIsLoggedIn}
                  setCurrentModal={setCurrentModal}
                />
              ) : currentModal === "signup" ? (
                <Signup
                  setIsLoggedIn={setIsLoggedIn}
                  setCurrentModal={setCurrentModal}
                />
              ) : (
                <VerifyOtp
                  setIsLoggedIn={setIsLoggedIn}
                  setCurrentModal={setCurrentModal}
                />
              )}
            </div>
          </div>
        )}
        <div>
          {isDataLoading ? (
            <Loader />
          ) : (
            <div className="flex min-h-screen overflow-hidden">
            {/* Left section */}
            <div className=" w-full md:w-3/5 overflow-y-hidden">
              <Column
                setGraphSelected={setGraphSelected}
                setIsChatBoxOpen={setIsChatBoxOpen}
                curCategory={curCategory}
                list={list}
              />
            </div>
      
            {/* Right section */}
            {window.innerWidth>768 && <div className="w-2/5 fixed right-0 top-20 bottom-0 overflow-hidden">
              <div className="h-full ">
                <ChatComponent isOpen={true} />
              </div>
            </div>}
          </div>
          )}
          {
            window.innerWidth < 768 && <ChatBox
            setIsOpen={setIsChatBoxOpen}
            isOpen={isChatBoxOpen}
          />
          }
          {window.innerWidth < 768 && (
            <button
              onClick={() => {
                setIsChatBoxOpen((prev) => !prev);
              }}
              className="fixed bottom-2 z-30 right-8 shadow-xl p-1 rounded-full bg-dark"
            >
              <img
                src={logoCircle}
                className="h-10 w-10 object-contain md:h-12 md:w-12 bg-black rounded-full"
                alt="Chat Button"
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Generic1;
