import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { Column } from "../../components/Column";
import { useEffect, useState } from "react";
import ChatBox from "../../components/Chat/ChatBox";


import { Link, useLocation } from "react-router-dom";
import logoCircle from "../../assets/saintlogocircle.png";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { jwtDecode } from "jwt-decode";
import useFinanceService from "../../hooks/useFinance";
import Loader from "../../components/Loader";
import { updateCurCategory } from "../../redux/slices/widgetSlice";

const Generic1 = () => {
  const { getStocksData, getCryptoData, getNewsData } = useFinanceService();
  const dispatch = useAppDispatch();
  //Authentication
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const store = useAppSelector((state) => state);
  const { auth: authObject, widget } = store;
  const curCategory = widget.curCategory;
  const location = useLocation();

  const [isChatBoxOpen, setIsChatBoxOpen] = useState(true);

  const [graphSelected, setGraphSelected] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);

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
          dispatch(updateCurCategory({curCategory:"stocks",genericType:"generic1"}))
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
    } else {  fetchCategoryData(curCategory);}
  }, [curCategory]);

  useEffect(() => {
    window.innerWidth <= 768 && setIsChatBoxOpen(false);
    //   changeCategory(curCategory);
  }, [graphSelected]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id: any) => list.findIndex((task) => task._id === id);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    console.log(active + " " + over);

    if (active._id === over._id) return;

    setList((e: any[]) => {
      const originalPos = getTaskPos(active._id);
      const newPos = getTaskPos(over._id);

      return arrayMove(e, originalPos, newPos);
    });
  };

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
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [authObject]);

  return (
    <section className={`overflow-x-hidden `}>
      {!isLoggedIn && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px]">
          <div className="text-center text-white flex justify-center flex-col items-center">
            <LockClosedIcon height={40} width={40} />
            <h1>Please log in to access this content.</h1>
            <Link to="/login" className=" bg-primary rounded-md px-5 py-1 mt-2">
              Login
            </Link>
          </div>
        </div>
      )}{" "}
      {/* Show the overlay if not logged in */}
      <div className={` h-full `}>
        {isDataLoading ? (
          <Loader />
        ) : (
          <div
            className={` flex flex-col md:flex-row items-start justify-between `}
          >
            <div className=" z-20  w-full md:w-[60%]">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
              >
                <Column
                  setGraphSelected={setGraphSelected}
                  setIsChatBoxOpen={setIsChatBoxOpen}
                  curCategory={curCategory}
                  list={list}
                />
              </DndContext>
            </div>
            <div className="w-full z-[90] relative md:w-[40%] md:fixed right-10">
              <ChatBox setIsOpen={setIsChatBoxOpen} isOpen={isChatBoxOpen} />
            </div>
          </div>
        )}
        {
          <button
            onClick={() => {
              setIsChatBoxOpen((prev) => !prev);
            }}
            className="fixed bottom-2 z-30 right-8 shadow-xl p-1 rounded-full bg-dark"
          >
            <img
              src={logoCircle}
              className="h-10 w-10 object-contain  md:h-12 md:w-12 bg-black rounded-full "
              alt="Chat Button"
            />
          </button>
        }
      </div>
    </section>
  );
};

export default Generic1;
