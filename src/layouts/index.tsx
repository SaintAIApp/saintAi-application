import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
type Props = {
  children: React.ReactNode;
};

function DefaultLayout({ children }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const handleResize = () => {
    setIsMobile(window.innerWidth < 762);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location.pathname]);

  useEffect(() => {
    const updateCursorPosition = (e: any) => {
      const cursorOutline = document.getElementById("cursor");
      cursorOutline?.animate(
        {
          left: `${e.clientX}px`,
          top: `${e.clientY}px`,
        },
        { duration: 500, fill: "forwards" }
      );
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", updateCursorPosition);

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  return (
    <main className="bg-black  text-white overflow-hidden spaceGrotesk">
      <Navbar />
      <section className="px-[4vw] max-md:px-8 mt-16 lg:px-[10vw] py-4 mb-4 font-body min-h-screen">
        {/* CURSORS */}
        {!isMobile && <>
        <div
          id="cursor"
          className="fixed border border-white rounded-full w-8 h-8 z-10 pointer-events-none translate-x-[-50%] translate-y-[-50%]"
          ></div>
        <div
          id="cursor-dot"
          className="w-2 h-2 bg-white fixed rounded-full translate-x-[-50%] translate-y-[-50%] pointer-events-none"
          style={{
            top: cursorPosition.y,
            left: cursorPosition.x,
          }}
          ></div>
          </>
          }
        {children}
        <Footer />
      </section>
      <Toaster position="bottom-right" reverseOrder={false} />
    </main>
  );
}

export default DefaultLayout;
