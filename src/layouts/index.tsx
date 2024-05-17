import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
type Props = {
  children: React.ReactNode;
};

function DefaultLayout({ children }: Props) {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="px-[6vw] max-md:px-8 lg:px-[15vw] py-4 mb-4 font-body">
        <Navbar />
      
        {children}
        <Footer/>
      </section>
      <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
    </main>
  );
}

export default DefaultLayout;
