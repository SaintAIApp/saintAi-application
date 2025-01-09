import React, { memo, ReactNode, useCallback, useEffect, useRef, useState } from "react";
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
import { setGameModalList, setIsBirdieFlapModal, setIsTestrisModal, setIsTirexModal, updateIsChatCommunity } from "../redux/slices/widgetSlice";
import snakeGif from "../assets/solver_hamilton.gif";

import TetrisGame from "../components/Game/TetrisGame";
import useFileService from "../hooks/useFileService";
import ChatButton from "../components/ChatButton";
import GameModal from "../components/GameModal";
import { useGameControls } from "../hooks/useGameControl";
import { useTimer } from "../hooks/useTimer";
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
  const dispatch = useAppDispatch();
  const gridIframe = useRef<HTMLIFrameElement>(null);
  const ready = useAuthStateCheck(protectedRoute);
  const isMobile = window.innerWidth <= 768;
  const isOpen = isMobile ? false : chatOptions.chatOpenDefault;
  const [isChatOpen, setIsChatOpen] = useState(isOpen ?? false);

  const {
    isChatCommunity,
    isTetrisModal,
    isTirexModal,
    isBirdieFlappy,
    isGameModalList,
    totalUnreadMessage
  } = useAppSelector((state) => state.widget);

  const isBotRunning = useAppSelector((state) => state.mine.mine?.bot_running);
  const { updateMining } = useFileService();

  const {
    isGameStarted,
    startGame,
    endGame,
    handleGameToggle,
    iframeLoaded,
    startBirdieFlappy,
    elapsedTime,
    setIframeLoaded,
    setStartBirdieFlappy,
    startGameTesara,
    setStartTesara,
    startTesara
  } = useGameControls({ updateMining });


  const { formatTime } = useTimer();

  useEffect(() => {
    const modal = document.getElementById("my_modal_4");
    if (!modal) return;

    const handleModalClick = (event: MouseEvent) => {
      if (event.target === modal) {
        dispatch(updateIsChatCommunity({ isChatCommunity: false }));
      }
    };

    modal.addEventListener("click", handleModalClick);
    return () => modal.removeEventListener("click", handleModalClick);
  }, [dispatch]);

  const handleTetrisClose = () => {
    setStartTesara(false);
    dispatch(setIsTestrisModal({ isTetrisModal: false }));
    endGame();
  };

  const handleJurassicToggle = () =>
    handleGameToggle(
      iframeLoaded,
      setIframeLoaded,
      () => dispatch(setIsTirexModal({ isTirexModal: !iframeLoaded }))
    );

  const handleBirdieToggle = () =>
    handleGameToggle(
      startBirdieFlappy,
      setStartBirdieFlappy,
      () => dispatch(setIsBirdieFlapModal({ isBirdieFlappy: !isBirdieFlappy }))
    );

  const handleCloseGameModal = () => {
    dispatch(setGameModalList({ isGameModalList: false }));
  };

  const onClickTetris = () => {
    dispatch(setIsTestrisModal({ isTetrisModal: true }));
    dispatch(setGameModalList({ isGameModalList: false }));
  };

  const onClickJurassicBot = () => {
    dispatch(setGameModalList({ isGameModalList: false }));
    dispatch(setIsTirexModal({ isTirexModal: true }));

  };

  const onClickFlappy = () => {
    dispatch(setGameModalList({ isGameModalList: false }));
    dispatch(setIsBirdieFlapModal({ isBirdieFlappy: true }));

  };
  const [iframeMouseOver, setIframeMouseOver] = useState(false);
  const [lastClickTime, setLastClickTime] = useState<number>(0);
  const [lastBlurTime, setLastBlurTime] = useState<number>(0);

  // Use useRef for timeouts
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startInactivityTimer = useCallback(() => {

    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    const currentTime = Date.now();
    if (currentTime - lastBlurTime > 3000 && isGameStarted) {
      console.log("Inactivity detected, ending game.");
      endGame();
    }
  }, [isGameStarted, lastBlurTime, endGame]);

  const handleBlur = useCallback(() => {
    const currentTime = Date.now();
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }

    if (!isGameStarted && (currentTime - lastBlurTime >= 3000)) {
      startGame();
    }

    setLastBlurTime(currentTime);
    startInactivityTimer();
  }, [isGameStarted, lastBlurTime, startGame, startInactivityTimer]);

  const handleClick = useCallback(() => {
    const currentTime = Date.now();

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    if (!isGameStarted && (currentTime - lastClickTime > 3000)) {
      startGame();
    }

    setLastClickTime(currentTime);
    startInactivityTimer();
  }, [isGameStarted, lastClickTime, startGame, startInactivityTimer]);

  const handleMouseMove = useCallback(() => {
    startInactivityTimer();
  }, [startInactivityTimer]);

  useEffect(() => {
    if (startTesara) {
      return;
    }
    window.focus();

    window.addEventListener("blur", handleBlur);
    window.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMouseMove);

    startInactivityTimer();

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleMouseMove);

      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
      if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
    };
  }, [iframeMouseOver, handleBlur, handleClick, handleMouseMove, startInactivityTimer]);

  const handleOnMouseOver = () => {
    setIframeMouseOver(true);
  };

  const handleOnMouseOut = () => {
    window.focus();
    setIframeMouseOver(false);
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

          {withChat && (
            <>
              <div className={clsx(
                "w-[100%] flex flex-col md:pr-3 p-3 pb-3",
                "pt-[95px] md:pt-[35px]",
                "fixed md:relative ml-auto md:ml-auto h-[80%] md:h-full",
                isChatOpen ? "z-20" : "z-0",
                chatOptions.chatClassName
              )}>
                <ChatComponent
                  isOpen={isChatOpen}
                  setIsOpen={setIsChatOpen}
                  className={`${isChatOpen ? "" : "hidden"} ml-auto`}
                />
              </div>
              <ChatButton
                style={{ top: "106px" }}
                onClick={() => setIsChatOpen(prev => !prev)}
                image={logoCircle}
                alt="Chat Button"
                position={{
                  top: "[700px]",
                  right: "5"
                }}
              />

              <ChatButton
                onClick={() => dispatch(updateIsChatCommunity({ isChatCommunity: true }))}
                image="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-and-lines-1/2/11-512.png"
                alt="Halo Button"
                badge={totalUnreadMessage}
                position={{
                  bottom: "[70px]",
                  right: "5"
                }}
              />
              {isBotRunning && (
                <div className="indicator fixed md:hidden bottom-[70px] z-50 left-5">
                  <div className="bg-black flex-col flex items-center justify-center w-14 flex-grow">
                    <div className="border-[0.5px] border-grey p-1 w-14">
                      <img src={snakeGif} className="w-14" alt="Bot Running" />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <GameModal
        isOpen={isChatCommunity}
        title="HALO"
        onClose={() => dispatch(updateIsChatCommunity({ isChatCommunity: false }))}
        className="modal-bottom w-full md:w-1/2 max-w-xl min-h-[72vh]"
      >
        <Halo />
      </GameModal>

      <GameModal
        isOpen={isTetrisModal}
        title="Tessara"
        onClose={handleTetrisClose}
        className="modal-bottom w-full md:w-2/4 max-w-xl min-h-[72vh]"
      >
        <div className="flex items-center justify-center mt-10 text-xl font-bold">
          Time : {formatTime(elapsedTime)}
        </div>
        {!startTesara ? (
          <div className="flex items-center justify-center mt-6">
            <button
              onClick={() => startGameTesara()}
              className="bg-primary text-white p-2 rounded-md hover:bg-secondary"
            >
              Start Game
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center mt-4">
              <TetrisGame startNewGame={startGameTesara} onGameOver={endGame} />
          </div>
        )}
      </GameModal>

      <GameModal
        isOpen={isTirexModal}
        title="Jurassic Boy"
        onClose={handleJurassicToggle}
      >
        <div className="flex items-center justify-center mt-3 mb-3 text-xl font-bold">
          Time : {formatTime(elapsedTime)}
        </div>
        <div onMouseOver={handleOnMouseOver}
          onMouseOut={handleOnMouseOut}>

          <iframe
            ref={gridIframe}
            src="https://albert-gonzalez.github.io/run-and-jump-rxjs/"
            width="430"
            height="370"
            frameBorder={0}
            scrolling="no"
            title="Jurassic Game"
            style={{ overflow: "hidden", height: "260px", borderRadius: "10px" }}
          />
        </div>

        <div className="flex items-center justify-center mt-10">
          <button
            className="btn bg-primary text-white"
            onClick={handleJurassicToggle}
          >
            Close Game
          </button>
        </div>
      </GameModal>

      <GameModal
        isOpen={isBirdieFlappy}
        title="Birdie Flap"
        onClose={handleBirdieToggle}
        className="w-[400px]"
      >
        <div className="flex items-center justify-center mt-3 mb-3 text-xl font-bold">
          Time : {formatTime(elapsedTime)}
        </div>
        <div
          className="iframeWrapper"
          onMouseOver={handleOnMouseOver}
          onMouseOut={handleOnMouseOut}
        >
          <iframe
            onClick={() => startGame()}
            ref={gridIframe}
            src="https://ashu05g.github.io/FlappyBird_Game/game"
            title="Flappy Bird Game"
            height="600"
            width="350"
            frameBorder={0}
            scrolling="no"
            style={{ overflow: "hidden", borderRadius: "10px" }}
          />

        </div>

        <div className="flex items-center justify-center mt-3">
          <button
            className="btn bg-primary text-white"
            onClick={handleBirdieToggle}
          >
            Close Game
          </button>
        </div>
      </GameModal>

      <GameModal
        isOpen={isGameModalList}
        title="Play 2 Earn"
        onClose={handleCloseGameModal}
        className="w-[400px]"
      >
        <div className="flex items-center justify-center mt-10 text-xl font-bold">
          <ul className="flex flex-col space-y-3 w-full">
            <li className="bg-[#28282f] flex p-2 rounded-lg justify-center items-center" onClick={() => onClickTetris()}>
              <span className="w-full text-center">Tessara</span>
            </li>
            <li className="bg-[#28282f] flex p-2 rounded-lg justify-center items-center w-full" onClick={() => onClickFlappy()}>
              <span className="w-full text-center">Birdie Flap</span>
            </li>
            <li className="bg-[#28282f] flex p-2 rounded-lg justify-center items-center w-full" onClick={() => onClickJurassicBot()}>
              <span className="w-full text-center">Jurassic Boy</span>
            </li>
          </ul>
        </div>
      </GameModal>
    </div>
  );
};

export default memo(SidebarLayout);
