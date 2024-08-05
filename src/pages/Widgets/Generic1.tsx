import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logoCircle from "../../assets/saintlogocircle.png";
import ChatBox from "../../components/Chat/ChatBox";
import { Column } from "../../components/Column";
import Loader from "../../components/Loader";
import useFinanceService from "../../hooks/useFinance";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateCurCategory } from "../../redux/slices/widgetSlice";
import ChatComponent from "./ChatComponent";

const Generic1 = () => {
  const { getStocksData, getCryptoData, getNewsData } = useFinanceService();
  const dispatch = useAppDispatch();

  // Authentication
  const store = useAppSelector((state) => state);
  const { widget } = store;
  const curCategory = widget.curCategory;
  const location = useLocation();

  const [isChatBoxOpen, setIsChatBoxOpen] = useState(true);
  const [graphSelected, setGraphSelected] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const fetchCategoryData = useCallback(async (category: string) => {
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
  }, [dispatch, getCryptoData, getNewsData, getStocksData]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    if (category !== null) {
      fetchCategoryData(category);
    } else {
      fetchCategoryData(curCategory);
    }
  }, [curCategory, fetchCategoryData, location.search]);

  useEffect(() => {
    window.innerWidth <= 768 && setIsChatBoxOpen(false);
  }, [graphSelected]);

  return (
    <section className="overflow-x-hidden min-h-screen flex flex-row space-x-3">
      <div className="w-full md:w-4/5 h-full relative">
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
              {window.innerWidth > 768 && <div className="w-2/5 fixed right-0 top-20 bottom-0 overflow-hidden">
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
