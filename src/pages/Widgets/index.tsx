import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import crypto from "../../mock/crypto.json";
import stocks from "../../mock/stocks.json";
import forex from "../../mock/forex.json";
import { Column } from "../../components/Column";
import { useEffect, useState } from "react";
import ChatBox from "../../components/Chat/ChatBox";
import CategorySelector from "../../components/CategorySelector";
import GraphLg from "../../components/Graphs/AreaChartLg";
import { Link, useLocation } from "react-router-dom";
import logoCircle from "../../assets/saintlogocircle.png";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useAppSelector } from "../../redux/hooks";
import { jwtDecode } from "jwt-decode";

const Widgets = ({
  dataType,
  setDataType,
  getButtonClass,
  getIconClass,
}: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  //Authentication
  const authObject = useAppSelector((state) => state.auth);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(true);
  const [curCategory, setCurCategory] = useState(
    category !== null ? category : "stocks"
  );
  const [graphSelected, setGraphSelected] = useState<any>(null);
  const [list, setList] = useState(stocks);

  useEffect(() => {
    window.innerWidth <= 768 && setIsChatBoxOpen(false);
    changeCategory(curCategory);
  }, [graphSelected]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id: any) => list.findIndex((task) => task.id === id);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setList((e) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(e, originalPos, newPos);
    });
  };

  const changeCategory = (category: any) => {
    setCurCategory(category);
    switch (category) {
      case "crypto":
        setList(crypto);
        break;
      case "stocks":
        setList(stocks);
        break;
      case "forex":
        setList(forex);
        break;
      case "news":
        setList([]);
        break;
      default:
        break;
    }
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
    <section className={`overflow-x-hidden relative`}>
      {!isLoggedIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px]">
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
      {graphSelected !== null && (
        <div className=" h-full  w-full  z-40 backdrop-blur-md absolute top-0">
          <div className="  flex w-full justify-center">
            <GraphLg
              setIsChatBoxOpen={setIsChatBoxOpen}
              setGraphSelected={setGraphSelected}
              graphSelected={graphSelected}
            />
          </div>
        </div>
      )}
      {graphSelected !== null && (
        <div className=" h-full  w-full  z-40 backdrop-blur-md absolute top-0">
          <div className="  flex w-full justify-center">
            <GraphLg
              setIsChatBoxOpen={setIsChatBoxOpen}
              setGraphSelected={setGraphSelected}
              graphSelected={graphSelected}
            />
          </div>
        </div>
      )}
      <div className={`relative h-full `}>
        <div className={` w-full z-[30]  fixed top-0`}>
          <div className="tabs w-full  bg-black">
            <div className="border-b bg-black border-gray-200 dark:border-gray-700 mt-14">
              <ul className="flex flex-wrap justify-center bg-black -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li className="me-2">
                  <button
                    onClick={() => setDataType("generic")}
                    className={getButtonClass("generic")}
                    aria-current={dataType === "generic" ? "page" : undefined}
                  >
                    <svg
                      className={getIconClass("generic")}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                    >
                      <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                    </svg>
                    Generic
                  </button>
                </li>
                <li className="me-2">
                  <button
                    onClick={() => setDataType("custom")}
                    className={getButtonClass("custom")}
                    aria-current={dataType === "custom" ? "page" : undefined}
                  >
                    <svg
                      className={getIconClass("custom")}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
                    </svg>
                    Custom
                  </button>
                </li>
              </ul>
            </div>
            <CategorySelector
              curCategory={curCategory}
              changeCategory={changeCategory}
            />
          </div>
        </div>
        <div
          className={` pt-32 flex flex-col md:flex-row items-start justify-between `}
        >
          <div className=" w-full md:w-[60%]">
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
          <div className="w-full md:w-[40%]">
            <ChatBox
              closable={window.innerWidth <= 768}
              setIsOpen={setIsChatBoxOpen}
              isOpen={isChatBoxOpen}
            />
          </div>
        </div>
        {window.innerWidth <= 768 && (
          <button
            onClick={() => {
              setIsChatBoxOpen((prev) => !prev);
            }}
            className="fixed bottom-2 right-8 shadow-xl p-1 rounded-full bg-dark"
          >
            <img
              src={logoCircle}
              className="h-10 w-10 object-contain  md:h-12 md:w-12 bg-black rounded-full "
              alt="Chat Button"
            />
          </button>
        )}
      </div>
    </section>
  );
};

export default Widgets;
