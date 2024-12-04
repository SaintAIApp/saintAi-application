import { memo, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Column } from "../../components/Column";
import Loader from "../../components/Loader";
import useFinanceService from "../../hooks/useFinance";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateCurCategory } from "../../redux/slices/widgetSlice";
import useMineService from "../../hooks/useMine";
import { detailMine } from "../../redux/slices/mineSlice";
import useFileService from "../../hooks/useFileService";
import { BeatLoader } from "react-spinners";
const Generic1 = () => {
  const { getStocksData, getCryptoData, getNewsData } = useFinanceService();
  const { summarizeArticle } = useFileService();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [article, setArticle] = useState(null);
  const [isSummarizeLoading, setIsSummarizeLoading] = useState(false);
  const { getMineDetail } = useMineService();
  const fetchDetailMine = useCallback(async () => {
    if (!user?._id) return;
    try {

      const res = await getMineDetail(user._id);
      console.log("RESPONSE MINE DETAIL", res.data);
      dispatch(detailMine(res.data.data));
    } catch (error) {
      console.log(error);
    } finally {
      // setIsDataLoading(false);
    }
  }, [getMineDetail, user?._id, dispatch]);

  const storeSummarize = useCallback(async (url: string) => {
    if (!user?._id) return;
    try {
      setIsSummarizeLoading(true);
      const res = await summarizeArticle(url);
      console.log("RESPONSE SUMMARIZE", res.data);
      setArticle(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSummarizeLoading(false);
    }
  },
    [summarizeArticle, user?._id]);

  // Authentication
  const store = useAppSelector((state) => state);
  const { widget } = store;
  const curCategory = widget.curCategory;
  const location = useLocation();

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
    fetchDetailMine();
  }, [curCategory, fetchCategoryData, location.search, fetchDetailMine]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = async (url: string) => {
    setIsModalOpen(true);
    await storeSummarize(url);
  };
  const closeModal = () => { setIsModalOpen(false); };
  return (
    <section
      className="overflow-x-hidden flex flex-row ">
      <div className="h-full w-full md:w-[30rem] lg:w-[40rem] xl:w-[50rem]">
        <div>
          {isDataLoading ? (
            <Loader />
          ) : (
              <div className="flex min-h-screen
          ">
              {/* Left section */}
                <div className="w-full overflow-y-scroll scrollbar-hide 
                ">
                <Column
                    openModal={openModal}
                  curCategory={curCategory}
                  list={list}
                />
              </div>
            </div>
          )}
        </div>
        <dialog id="my_modal_1" className={`modal ${isModalOpen ? "modal-open" : ""}`}>
          <div className="modal-box">
            <h3 className="text-lg font-bold">Summarize Article</h3>

            {isSummarizeLoading ?
              (
                <div className="w-full justify-center flex flex-col items-center">
                  <BeatLoader color="#17B982" />
                  <label className="text-sm text-gray-300 mt-4">Please Waiting...</label>
                </div>
              ) : (
                <article>{article}</article>
              )}
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </dialog>
      </div>
    </section>
  );
};

export default memo(Generic1);
