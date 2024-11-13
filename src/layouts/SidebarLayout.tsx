import React, { memo, ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import logoCircle from "../assets/saintlogocircle.png";
import AuthModal from "../components/AuthModal";
import Navbar from "../components/Navbar";
import DefaultSideBar from "../components/SideBar";
import { useAuthStateCheck } from "../hooks/useAuthState";
import ChatComponent from "../pages/Widgets/ChatComponent";
import clsx from "clsx";

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
  const [isChatOpen, setIsChatOpen] = useState(chatOptions.chatOpenDefault ?? false);

  useEffect(() => {
    // Detect screen size
    const isMobile = window.innerWidth <= 768;

    // Set initial value of isChatOpen based on screen size
    setIsChatOpen(isMobile ? false : true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen h-screen bg-black text-white">
      <Toaster />
      <Navbar />
      <div className="flex overflow-hidden h-full">
        <aside className="hidden md:block w-44 bg-black flex-shrink-0">
          {customSidebar || <DefaultSideBar />}
        </aside>
        <main className="flex flex-row gap-4">
          <AuthModal defaultModal={locked ? "lock" : null} />
          <div className="flex-grow">
            {ready ? children : null}
          </div>
          {
            withChat === true && (
              <>
                <div className={clsx("flex flex-col pr-3 pb-3 pt-[95px] fixed md:relative ml-4 md:ml-auto", chatOptions.chatClassName)}>
                  <ChatComponent isOpen={isChatOpen} setIsOpen={setIsChatOpen} className={`${isChatOpen ? "" : "hidden"} ml-auto`} />
                </div>
                <button
                  onClick={() => {
                    setIsChatOpen((prev) => !prev);
                  }}
                  className="fixed md:hidden top-[105px] z-30 right-6 shadow-xl p-1 rounded-full bg-dark"
                >
                  <img
                    src={logoCircle}
                    className="h-10 w-10 object-contain md:h-12 md:w-12 bg-black rounded-full"
                    alt="Chat Button"
                  />
                </button>
              </>
            )
          }
        </main>
      </div>
    </div >
  );
};

export default memo(SidebarLayout);
