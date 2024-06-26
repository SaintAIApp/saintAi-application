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

import GraphLg from "../../components/Graphs/AreaChartLg";

import { Link, useLocation } from "react-router-dom";

import logoCircle from "../../assets/saintailogo.png";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useAppSelector } from "../../redux/hooks";
import { jwtDecode } from "jwt-decode";
import ChatItem from "../../components/Chat/ChatItem";

const Generic2 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  //Authentication
  const { auth: authObject, widget } = useAppSelector((state) => state);
  const curCategory = widget.curCategory;
  const location = useLocation();
  const [chats, setChats] = useState([
    {
      sender: "Mia",
      message:
        "Hello, welcome to S.AI.N.T. I am your streamlined AI providing Analytical Market intelligence. But you can call me Mia, your market intelligence analyst. How can I help you?",
    },
  ]);
  const [chat, setChat] = useState("");

  // const [isChatBoxOpen, setIsChatBoxOpen] = useState(true);

  const [graphSelected, setGraphSelected] = useState<any>(null);
  const [list, setList] = useState(stocks);

  // useEffect(() => {
  //   window.innerWidth <= 768 && setIsChatBoxOpen(false);
  // }, [graphSelected]);

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
    // console.log(curCategory)
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    if (category !=null ) {
      console.log(category)
      changeCategory(category);
    } else { console.log(curCategory); changeCategory(curCategory);}
  }, [curCategory]);

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
    <section className={`overflow-x-hidden  `}>
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
        <div className=" h-full  w-full  z-[100] backdrop-blur-md absolute top-0">
          <div className="  flex w-full justify-center">
            <GraphLg

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

              setGraphSelected={setGraphSelected}
              graphSelected={graphSelected}
            />
          </div>
        </div>
      )}
      <div className={` `}>

        <div
          className={` flex flex-col items-start justify-between  -red-100 `}
        >
          <div className="top w-full flex ">
            <div className="left w-full md:w-[50%]">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
              >
                <Column
                  setGraphSelected={setGraphSelected}
                  // setIsChatBoxOpen={setIsChatBoxOpen}
                  curCategory={curCategory}
                  list={list}
                />
              </DndContext>
            </div>
            <div className="right rounded-tl-md fixed right-0  h-full w-1/2 bg-dark overflow-y-scroll">
              <div className="top px-3 flex py-3 justify-between">
                <img className=" h-8 object-contain  md:h-8 "
                src={logoCircle}></img>
              </div>
              <div className="flex flex-col h-full">
      
        <div
          id="body"
          className="px-3 justify-start w-full items-end overflow-y-auto max-h-[calc(100%-64px)]"
        >
          {chats.map((chat, index) => {
            return (
              <ChatItem
                key={index}
                sender={chat.sender}
                message={chat.message}
              />
            );
          })}
        </div>
      </div>
            </div>
          </div>
          <div className="flex z-20 bg-[#292929] py-2 fixed bottom-0 items-center justify-center bottom w-full    ">
            <input value={chat}  onChange={(e) => {
            setChat(e.target.value);
          }} className="bg-black py-1 outline-none  rounded-full px-3 w-1/2 mr-1 " placeholder="type here..." />
            <button  onClick={() => {
            chat !== "" &&
              setChats((prev) => [...prev, { sender: "Me", message: chat }]);
            setChat("");
          }} className=" bg-primary rounded-full text-white px-4 py-1 "> Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Generic2;
