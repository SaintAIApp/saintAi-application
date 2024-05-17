import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import MissionCard from "../../components/MissionCard";
import { useState, useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

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
    <section className="relative cursor-none">
      {/* CURSORS */}
      <div
        id="cursor"
        className=" fixed  border border-white rounded-full w-8 h-8 z-10 pointer-events-none translate-x-[-50%] translate-y-[-50%] "
      ></div>
      <div
        id="cursor-dot"
        className="w-2 h-2 bg-white fixed rounded-full translate-x-[-50%] translate-y-[-50%]  pointer-events-none "
        style={{
          top: cursorPosition.y,
          left: cursorPosition.x,
        }}
      ></div>

      {/* HERO SECTION */}
      <div id="hero" className="flex w-full mb-32 relative py-10">
        <div className="absolute top-0 h-full  w-full left-0 inline-flex  inset-0 justify-center">
          <div className="absolute h-64 w-64 bg-shape1 bottom-0 right-20  "></div>
          <div className="absolute h-64 w-64 bg-shape2 top-96 left-10 "></div>
        </div>
        <>
          <div id="left">
            <h1 className="text-6xl mb-10 font-thin ">
              AI-driven Web3 Crypto Mine
            </h1>
            <h1 className="text-primary  text-8xl mb-10 font-heading">
              SaintAi
            </h1>
            <h1 className="text-3xl mb-10 font-thin">
              Building an AI mining community on TON and Solana
            </h1>
            <Button
              variant="rounded"
              onClick={() => {
                navigate("/");
              }}
              text="Saint APP"
            />
          </div>
          <div id="right" className="absolute right-0">
            <img
              className="md:h-72 md:w-72 rotate-[0deg]"
              src="/cube.png"
              alt=""
            />
          </div>
        </>
      </div>
      {/* VISION SECTION */}
      <div id="vision" className="">
        <h1 className="text-sm font-thin mb-5">Vision</h1>
        <h1 className="text-6xl font-thin">
          Prioritize technology-driven participation that rewards output
        </h1>
        <Button
          className="my-20"
          variant="rounded"
          onClick={() => {}}
          text="Whitepaper"
        />
      </div>
      <div className="my-16 relative">
        {/* Background blur divs */}
        <div className="absolute h-full w-full inset-0 flex">
          <div className="absolute  h-44 w-44 bg-shape1 top-[-132px] left-0 z-0 bg-blur"></div>
          <div className="absolute h-44 w-44  bg-shape1 top-[-250px] left-80 z-0 bg-blue-400 opacity-90 bg-blur"></div>
          <div className="absolute h-44 w-44  bg-shape1 top-[50px] right-20 z-0 bg-blue-400 opacity-90 bg-blur"></div>
        </div>

        <h1 className="text-center text-sm my-5 font-thin relative z-10">
          Mission
        </h1>
        <h1 className="text-6xl font-thin text-center my-4 relative z-10">
          Goals
        </h1>
        <h1 className="text-center font-thin my-5 relative z-10">
          As a streamlined generative AI and blockchain application service, our
          goals are:
        </h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-3  md:gap-8 lg:gap-36 place-items-stretch my-4 relative z-10">
          <MissionCard
            number="1"
            heading="Convert"
            description="To convert productive generative AI computing power into cryptocurrency mining"
          />
          <MissionCard
            number="2"
            heading="Convert"
            description="To convert productive generative AI computing power into cryptocurrency mining"
          />
          <MissionCard
            number="3"
            heading="Convert"
            description="To convert productive generative AI computing power into cryptocurrency mining"
          />
        </div>
      </div>
    </section>
  );
};

export default Index;
