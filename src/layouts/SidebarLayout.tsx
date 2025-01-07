import React, { memo, ReactNode, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import logoCircle from "../assets/saintlogocircle.png";
import AuthModal from "../components/AuthModal";
import Navbar from "../components/Navbar";
import DefaultSideBar from "../components/SideBar";
import { useAuthStateCheck } from "../hooks/useAuthState";
import ChatComponent from "../pages/Widgets/ChatComponent";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Halo from "../pages/Halo";
import { setIsBirdieFlapModal, setIsTestrisModal, setIsTirexModal, updateIsChatCommunity } from "../redux/slices/widgetSlice";
import snakeGif from "../assets/solver_hamilton.gif";

import TetrisGame from "../components/Game/TetrisGame";
import useFileService from "../hooks/useFileService";
type Props = {
  children: ReactNode;
  customSidebar?: ReactNode;
  protectedRoute?: boolean;
  locked?: boolean;
  withChat?: boolean;
  chatOptions?: {
    chatOpenDefault?: boolean;
    chatClassName?: string;
  }
};

const SidebarLayout: React.FC<Props> = ({ children, customSidebar, protectedRoute = false, locked, withChat = false, chatOptions = {
  chatOpenDefault: false,
  chatClassName: "",
} }) => {
  const ready = useAuthStateCheck(protectedRoute);
  const isMobile = window.innerWidth <= 768;
  const isOpen = isMobile ? false : chatOptions.chatOpenDefault;
  const [isChatOpen, setIsChatOpen] = useState(isOpen ?? false);
  const isChatCommunity = useAppSelector((state) => state.widget.isChatCommunity);
  const isTetrisModal = useAppSelector((state) => state.widget.isTetrisModal);
  const isTirexModal = useAppSelector((state) => state.widget.isTirexModal);
  const isBirdieFlappy = useAppSelector((state) => state.widget.isBirdieFlappy);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const { updateMining } = useFileService();
  const dispatch = useAppDispatch();
  const onClickHalo = () => {
    dispatch(updateIsChatCommunity({ isChatCommunity: true }));

  };
  const onCloseHalo = () => {
    dispatch(updateIsChatCommunity({ isChatCommunity: false }));

  };
  const onCloseTetris = async () => {
    dispatch(setIsTestrisModal({ isTetrisModal: false }));
    setIsGameStarted(false);
    const endTime = Date.now();
    const timeElapsed = (endTime - startTime) / 1000;
    await updateMining(timeElapsed);
  };
  const modal = document.getElementById("my_modal_4");

  if (modal) {
    window.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target === modal) {
        onCloseHalo();
      }
    });
  }
  const [startTime, setStartTime] = useState(0);
  const startGame = () => {
    setIsGameStarted(true);
    setStartTime(Date.now());
  };

  const endGame = async () => {
    const endTime = Date.now();
    const timeElapsed = (endTime - startTime) / 1000;
    await updateMining(timeElapsed);
    setIsGameStarted(false);
  };
  const isBotRunning = useAppSelector((state) => state.mine.mine?.bot_running);
  const totalUnreadMessage = useAppSelector((state) => state.widget.totalUnreadMessage);

  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [startBirdieFlappy, setStartBirdieFlappy] = useState(false);
  const gridIframe = useRef<HTMLIFrameElement>(null);

  const handleStartJurassic = async () => {
    setIframeLoaded(!iframeLoaded);

    if (iframeLoaded) {
      dispatch(setIsTirexModal({ isTirexModal: false }));
      setIsGameStarted(false);
      const endTime = Date.now();
      const timeElapsed = (endTime - startTime) / 1000;
      await updateMining(timeElapsed);
    } else {
      setStartTime(Date.now());
    }
  };
  const handleStartBirdie = async () => {
    setStartBirdieFlappy(!startBirdieFlappy);

    if (startBirdieFlappy) {
      dispatch(setIsBirdieFlapModal({ isBirdieFlappy: false }));
      setIsGameStarted(false);
      const endTime = Date.now();
      const timeElapsed = (endTime - startTime) / 1000;
      await updateMining(timeElapsed);
    } else {
      setStartTime(Date.now());
    }
  };

  return (
    <div className="flex flex-col min-h-screen h-screen bg-black text-white">
      <Toaster />
      <Navbar />
      <div className="flex overflow-hidden h-full w-full">
        <aside className="hidden md:block w-44 bg-black flex-shrink-0">
          {customSidebar || <DefaultSideBar />}
        </aside>
        <main className="flex flex-row gap-4 w-full">
          <AuthModal defaultModal={locked ? "lock" : null} />
          <div className="flex-grow">
            {ready ? children : null}
          </div>
          {
            withChat === true && (
              <>
                <div className={clsx(`w-[100%] flex flex-col md:pr-3 p-3 pb-3 pt-[95px] md:pt-[35px] fixed md:relative ml-auto md:ml-auto  h-[80%] md:h-full ${isChatOpen ? "z-20" : "z-0"} ${chatOptions.chatClassName}`)}>
                  <ChatComponent isOpen={isChatOpen} setIsOpen={setIsChatOpen} className={`${isChatOpen ? "" : "hidden"} ml-auto`} />
                </div>
                <button
                  onClick={() => {
                    setIsChatOpen((prev) => !prev);
                  }}
                  className="fixed md:hidden top-[108px] z-50 right-2 shadow-xl p-1 rounded-full bg-dark "
                >
                  <img
                    src={logoCircle}
                    className="h-10 w-10 object-contain md:h-12 md:w-12 bg-black rounded-full"
                    alt="Chat Button"
                  />
                </button>
                <div
                  onClick={() => {
                    onClickHalo();
                  }}
                  className="indicator fixed md:hidden bottom-[70px] z-50 right-5 shadow-xl p-1 rounded-full bg-dark "
                >



                  {(totalUnreadMessage ?? 0) > 0 && (
                    <span className="indicator-item badge badge-secondary">{totalUnreadMessage}+</span>
                  )}
                  <button
                  >
                    <img
                      src={"https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-and-lines-1/2/11-512.png"}
                      className="h-10 w-10 object-contain md:h-12 md:w-12 bg-black rounded-full"
                      alt="Chat Button"
                    />
                  </button>
                </div>
                {isBotRunning && (
                <div
                  className="indicator fixed md:hidden bottom-[70px] z-50 left-5  "
                >
                  <div className="bg-black  flex-col flex items-center justify-center w-14 flex-grow">
                    <div className="border-[0.5px] border-grey p-1 w-14 ">
                      <img src={snakeGif} className="w-14" />
                    </div>
                  </div>
                </div>
                )}
              </>
            )
          }
        </main>
      </div>
      <dialog id="my_modal_4" className={`modal p-4 md:p-0  ${isChatCommunity ? "modal-open" : ""}`} >
        <div className="bg-black  border-1 border border-grey p-4 rounded-badge modal-bottom w-full md:w-1/2 max-w-xl  h-auto min-h-[72vh]">
          <div className="flex items-center justify-center flex-row gap-3">
            <img
              src={logoCircle}
              className="h-10 w-10 object-contain md:h-8 md:w-8 bg-black rounded-full"
              alt="Chat Button"
            />
            <h6 className="font-bold text-2xl">HALO</h6>
            <button onClick={() => onCloseHalo()} className="btn btn-sm btn-circle btn-ghost">✕</button>
          </div>
          <Halo />
        </div>
      </dialog>
      <dialog id="my_modal_6" className={`modal p-2 md:p-0  ${isTetrisModal ? "modal-open" : ""}`} >
        <div className="bg-black  border-1 border border-grey p-1 rounded-badge modal-bottom w-full md:w-2/4 max-w-xl  h-auto min-h-[72vh]">
          <div className="flex items-center justify-center flex-row gap-3 mt-5">
            <img
              src={logoCircle}
              className="h-10 w-10 object-contain md:h-8 md:w-8 bg-black rounded-full"
              alt="Chat Button"
            />
            <h5 className="font-bold text-xl">CENTIPEDE</h5>
            <button onClick={() => onCloseTetris()} className="btn btn-sm btn-circle btn-ghost">✕</button>
          </div>
          {!isGameStarted ? (
            <div className="flex items-center justify-center mt-6">
              <button onClick={() => startGame()} className="bg-primary text-white p-2 rounded-md hover:bg-secondary">Start Game</button>
            </div>
          ) : (
              <div className="flex items-center justify-center mt-4">
                <TetrisGame onGameOver={endGame} />
              </div>

          )}
        </div>
      </dialog>
      <dialog id="my_modal_1" className={`modal ${isTirexModal ? "modal-open" : ""}`}>
        <div
          className="
    max-h-[calc(100vh-5em)]
    col-start-1
    row-start-1
    w-11/12
    max-w-xl
    scale-90
    transform
    translate-x-var(--tw-translate-x)
    translate-y-var(--tw-translate-y)
    rotate-var(--tw-rotate)
    skew-x-var(--tw-skew-x)
    skew-y-var(--tw-skew-y)
    scale-x-[0.9]
    scale-y-[0.9]
    rounded-box
    border border-grey
    bg-black
    p-6
    transition-all
    duration-200
    ease-[cubic-bezier(0.4,0,0.2,1)]
    shadow-2xl
    overflow-y-auto
    overscroll-contain
  "
        >

          <div>
            <div className="flex items-center justify-center flex-row gap-3 mb-10">
              <img
                src={logoCircle}
                className="h-10 w-10 object-contain md:h-8 md:w-8 bg-black rounded-full"
                alt="Chat Button"
              />
              <h5 className="font-bold text-xl">Jurassic Boy</h5>
              <button onClick={() => handleStartJurassic()} className="btn btn-sm btn-circle btn-ghost">✕</button>
            </div>

            {iframeLoaded && (
              <iframe
                // ref={iframeRef}
                ref={gridIframe}
                src="https://albert-gonzalez.github.io/run-and-jump-rxjs/"
                width="530"
                height="400"
                title="Game Iframe"
                frameBorder={0}
                scrolling="no"
                style={{ overflow: "hidden", height: "330px", borderRadius: "10px", }} 
              />
            )}
          </div>
          <div className="flex items-center justify-center mt-10">
            <button className="btn bg-primary text-white" onClick={() => handleStartJurassic()}>{iframeLoaded ? "Close Game" : "Start Game"}</button>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_1" className={`modal ${isBirdieFlappy ? "modal-open" : ""}`}>
        <div
          className="
         max-h-[calc(100vh-5em)]
          w-[400px]
    scale-90
    transform
    translate-x-var(--tw-translate-x)
    translate-y-var(--tw-translate-y)
    rotate-var(--tw-rotate)
    skew-x-var(--tw-skew-x)
    skew-y-var(--tw-skew-y)
    scale-x-[0.9]
    scale-y-[0.9]
    rounded-box
    border border-grey
    bg-black
    p-6
    transition-all
    duration-200
    ease-[cubic-bezier(0.4,0,0.2,1)]
    shadow-2xl
    overflow-y-auto
    overscroll-contain
  "
        >

          <div>
            <div className="flex items-center justify-center flex-row gap-3 mb-10">
              <img
                src={logoCircle}
                className="h-10 w-10 object-contain md:h-8 md:w-8 bg-black rounded-full"
                alt="Chat Button"
              />
              <h5 className="font-bold text-xl">Birdie Flap</h5>
              <button onClick={() => handleStartBirdie()} className="btn btn-sm btn-circle btn-ghost">✕</button>
            </div>

            {startBirdieFlappy && (
              <iframe
                // ref={iframeRef}
                ref={gridIframe}
                src="https://ashu05g.github.io/FlappyBird_Game/game"
                title="Game Iframe"
                height="600"
                width="350"
                frameBorder={0}
                scrolling="no"
                style={{ overflow: "hidden", borderRadius: "10px", }}
              />
            )}
          </div>
          <div className="flex items-center justify-center mt-10">
            <button className="btn bg-primary text-white" onClick={() => handleStartBirdie()}>{startBirdieFlappy ? "Close Game" : "Start Game"}</button>
          </div>
        </div>
      </dialog>
    </div >
  );
};

export default memo(SidebarLayout);
