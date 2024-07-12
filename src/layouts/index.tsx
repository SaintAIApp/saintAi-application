import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAppSelector } from "../redux/hooks";
import { useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

function DefaultLayout({ children }: Props) {
  const genericType = useAppSelector((state) => state.widget.genericType);
  const location = useLocation();
  const isUploadPage = location.pathname.startsWith("/loaddata");

  return (
    <main className="bg-black flex flex-col text-white font-light min-h-screen">
      <Navbar />
      <section className={`flex-grow ${
        isUploadPage 
          ? "flex items-center justify-center mt-12 overflow-hidden" 
          : "px-[3vw] max-md:px-5 lg:px-[3vw] py-4 mb-4 mt-24 md:mt-36 overflow-auto"
      }`}>
        {children}
        {genericType !== "generic2" && !isUploadPage && <Footer />}
      </section>
      <Toaster position="bottom-right" reverseOrder={false} />
    </main>
  );
}

export default DefaultLayout;