import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import DefaultSideBar from '../components/SideBar';
import { Toaster } from 'react-hot-toast';

type Props = {
  children: ReactNode;
  customSidebar?: ReactNode;
};

const SidebarLayout: React.FC<Props> = ({ children, customSidebar }) => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Toaster/>
      <Navbar />
      <div className="flex flex-1 pt-10">
       {window.innerWidth>768 && <aside className=" w-44 lg:w-60 fixed left-0 top-12 bottom-0 overflow-y-auto bg-black z-[90]">
          {customSidebar || <DefaultSideBar />}
        </aside>}
        <main className="flex-1  p-4  md:ml-44 lg:ml-56 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;