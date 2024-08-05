import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";
import DefaultSideBar from "../components/SideBar";
import { Toaster } from "react-hot-toast";
import AuthModal from "../components/AuthModal";
import { useAuthStateCheck } from "../hooks/useAuthState";

type Props = {
  children: ReactNode;
  customSidebar?: ReactNode;
  protectedRoute?: boolean;
  locked?: boolean;
};

const SidebarLayout: React.FC<Props> = ({ children, customSidebar, protectedRoute = false, locked }) => {
  const ready = useAuthStateCheck(protectedRoute);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Toaster />
      <Navbar />
      <div className="flex flex-1">
        {window.innerWidth > 768 && (
          <aside className="w-44 lg:w-60 fixed left-0 top-16 bottom-0 overflow-y-auto bg-black z-[90]">
            {customSidebar || <DefaultSideBar />}
          </aside>
        )}
        <main className="relative flex-1 md:ml-44 mt-16 lg:ml-56 overflow-y-auto">
          <AuthModal defaultModal={locked ? "lock" : null} />
          {ready ? children : null}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
