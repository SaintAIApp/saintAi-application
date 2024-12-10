import React, { memo, ReactNode, useState } from "react";
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
import { updateIsChatCommunity } from "../redux/slices/widgetSlice";

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
  const dispatch = useAppDispatch();
  const onCloseHalo = () => {
    dispatch(updateIsChatCommunity({ isChatCommunity: false }));
  };
  const onClickHalo = () => {
    dispatch(updateIsChatCommunity({ isChatCommunity: true }));
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
  const totalUnreadMessage = useAppSelector((state) => state.widget.totalUnreadMessage);
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
    </div >
  );
};

export default memo(SidebarLayout);
