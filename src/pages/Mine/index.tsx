
import "./index.css";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { TweenMax, Elastic } from "gsap";
const Mine = () => {
  const navigate = useNavigate();
  const mine = useAppSelector((state) => state.mine.mine);
  const maxMiningDurationInMinutes: number | null | undefined = mine?.max_mining_duration ?? 0;

  const hours = Math.floor(maxMiningDurationInMinutes / 60);
  const minutes = maxMiningDurationInMinutes % 60;
  const formattedDuration = `${hours}:${minutes.toString().padStart(2, "0")}`;
  const isJackpot = useAppSelector((state) => state.mine.isJackpot);
  console.log("IS JACKPOT", isJackpot);
  function generateRandomNumber(existingNumbers: number[]): number {
    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * 900) + 100; // Angka acak 3 digit antara 100-999
    } while (existingNumbers.includes(randomNum)); // Pastikan angka unik
    return randomNum;
  }


  const [randomNumbers, setRandomNumbers] = useState<number[]>([
    generateRandomNumber([]),
    generateRandomNumber([]),
    generateRandomNumber([]),
    generateRandomNumber([]),
    generateRandomNumber([]),
  ]);



  const listRef = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (!listRef.current) return; // Ensure the ref is available

    // Clone first child and append it to the list (for scrolling animation)
    const firstChild = listRef.current.querySelector("span:first-child");
    if (firstChild) {
      listRef.current.appendChild(firstChild.cloneNode(true));
    }

    const liHeight = listRef.current.querySelector("span")?.offsetHeight || 0;
    let counter = 1;

    // Set interval for animation and random number update
    const interval = setInterval(() => {
      if (isJackpot) {
        // Only update random numbers when isJackpot is true
        setRandomNumbers((prevNumbers) => {
          const newNumbers = [...prevNumbers];
          newNumbers.forEach((_, index) => {
            newNumbers[index] = generateRandomNumber(newNumbers);
          });
          return newNumbers;
        });
      }

      // Perform scrolling animation
      if (counter === listRef.current?.querySelectorAll("span").length) {
        counter = 1;
        TweenMax.set(listRef.current, { y: 0 }); // Reset position Y
      }

      // Apply animation to list (scroll effect)
      TweenMax.to(listRef.current, 1, {
        y: 0 - liHeight * counter,
        ease: Elastic.easeInOut.config(8, 0),
      });

      counter++;
    }, 3000); // Interval set to 3 seconds

    // Cleanup interval when the component is unmounted
    return () => clearInterval(interval);
  }, [isJackpot]);


  return (
    <section className="overflow-x-hidden responsive-width  flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 p-4 ml-0 md:ml-10 pt-[35px]">
      <div className="w-full flex space-x-21">
        <div className="flex w-full flex-col lg:flex-row items-start justify-between space-y-4 lg:space-y-0 lg:space-x-4 ">
          <div className=" h-[85vh] overflow-y-auto flex flex-col space-y-4 w-full ">
            <div className="rounded-xl border-2 border-[#333333] p-4 flex flex-col justify-center">
              <div className="w-full h-20 bg-[#333333] rounded-full flex items-center px-5 space-x-3 flex-col">
                <div className="w-full flex justify-center">
                  <h1>{mine?.clock ? (Number.isInteger(mine.clock) ? mine.clock : mine.clock.toFixed(2)) : 0}</h1>
                </div>
                <div className="w-full flex items-center space-x-4">
                  <h1 className="flex items-center justify-center text-sm h-6 w-6 md:h-8 md:w-8 bg-white text-black rounded-full">
                    0
                  </h1>
                  <div className="flex w-full flex-col justify-center">
                    <div className="relative h-4 w-full bg-white rounded-full">
                      <div
                        className="bg-[#FF9B26] rounded-full absolute left-0 h-full"
                        style={{
                          width: `${Math.min(((mine?.clock ?? 60) / 60), 1) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  <h1 className="flex items-center justify-center h-6 w-6 md:h-8 md:w-8 bg-white text-black text-sm rounded-full">
                    60
                  </h1>
                </div>
              </div>
              <div>
                <h1 className="text-center text-xl my-6">
                  Next STT Pay amount
                </h1>
                <div className="flex space-x-2">
                  <div className="flex items-center justify-center h-12 md:h-24 w-1/2 rounded-full bg-[#333333] text-white text-center">
                    <label className="text-xl font-bold">{mine?.coin_stt || 0} STT</label>
                  </div>
                  <div className="flex items-center justify-center h-12 md:h-24 w-1/2 rounded-full bg-[#333333] text-white text-center">
                    <label className="text-xl font-bold">{formattedDuration} hours
                    </label>
                  </div>
                </div>
                <div className="flex space-x-2 mt-2">
                  <div className="flex items-center justify-center h-12 md:h-24 w-1/2 rounded-full bg-gradient-to-r from-[#3e0094] to-[#6a0dad] text-white text-center">
                    <p style={{
                      fontFamily: "Oswald",
                      fontSize: "36px",
                      textTransform: "uppercase",
                      color: "black",
                      height: "1em",
                      lineHeight: "1em",
                      overflow: "hidden",
                      margin: 0,
                      WebkitFontSmoothing: "antialiased",
                      WebkitBackfaceVisibility: "hidden",
                      backfaceVisibility: "hidden",
                    }}>
                      <span style={{
                        margin: "-.25em 0 0 0",
                        padding: 0,
                        display: "inline-block",
                        verticalAlign: "middle",
                        height: "1em",
                        lineHeight: "1em",
                      }} ref={listRef}>
                        {randomNumbers.map((number, index) => (
                          <span
                            key={index}
                            style={{
                              margin: 0,
                              padding: 0,
                              listStyle: "none",
                              height: "1em",
                              lineHeight: "1em",
                              display: "block",
                              color: "white",
                              fontWeight: "bold",
                              marginRight: "0.75rem",
                            }}
                          >
                            {number.toString().split("").join(" ")} {/* Spacing between digits */}
                          </span>
                        ))}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigate("/pricing");
                    }}
                    className="cursor-pointer bg-gradient-to-r from-[#17B982] to-[#0F766E] rounded-full w-1/2 text-xl font-bold"
                  >
                    <div className="flex flex-col cursor-pointer">
                      <label htmlFor="" className="cursor-pointer">Power Pass</label>
                      <label htmlFor="" className="cursor-pointer">Upgrade</label>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="border-2 rounded-xl border-[#333333] p-4">
              <ul className="flex flex-col space-y-6  *:pb-2">
                <li className="flex items-center justify-between text-sm lg:text-xl">
                  <p>Current Supply</p>
                  <p>Next Halving supply</p>
                </li>
                <li className="flex items-center justify-between text-sm lg:text-xl">
                  <p>61,345,345</p>
                  <p>31,000,000</p>
                </li>
                <li className="flex items-center justify-between text-sm lg:text-xl">
                  <p>Current Reward</p>
                  <p>Next Reward</p>
                </li>
                <li className="flex items-center justify-between text-sm lg:text-xl">
                  <p>$STT price</p>
                  <p>$STT Market Cap</p>
                </li>
                <li className="flex items-center justify-between text-sm lg:text-xl">
                  <p>$0.35</p>
                  <p>$27,000,000</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mine;
