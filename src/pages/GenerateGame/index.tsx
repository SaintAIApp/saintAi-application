
import "./index.css";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { TweenMax, Elastic } from "gsap";
import useMineService from "../../hooks/useMine";
import { detailMine } from "../../redux/slices/mineSlice";
import { useDispatch } from "react-redux";
const Mine = () => {
  const navigate = useNavigate();
  const mine = useAppSelector((state) => state.mine.mine);
  const maxMiningDurationInMinutes: number = mine?.max_mining_duration ?? 0;

  function resetDailyCounter(lastMiningDate: Date | undefined, maxMiningDurationInMinutes: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let result: string | number = "0:00";


    if (lastMiningDate) {
      const lastMiningDateObj = new Date(lastMiningDate);
      lastMiningDateObj.setHours(0, 0, 0, 0);

      const hours = Math.floor(maxMiningDurationInMinutes / 60);
      const minutes = maxMiningDurationInMinutes % 60;
      result = `${hours}:${minutes.toString().padStart(2, "0")}`;

    } else {
      const hours = Math.floor(maxMiningDurationInMinutes / 60);
      const minutes = maxMiningDurationInMinutes % 60;
      result = `${hours}:${minutes.toString().padStart(2, "0")}`;
    }
    return result;
  }


  const miningDuration = resetDailyCounter(mine?.last_mining_date ? new Date(mine.last_mining_date) : undefined, maxMiningDurationInMinutes);


  const isJackpot = useAppSelector((state) => state.mine.isJackpot);
  function generateRandomNumber(existingNumbers: number[]): number {
    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * 900) + 100;
    } while (existingNumbers.includes(randomNum));
    return randomNum;
  }
  const [totalDuration, setTotalDuration] = useState(0);

  const [randomNumbers, setRandomNumbers] = useState<number[]>([
    generateRandomNumber([]),
    generateRandomNumber([]),
    generateRandomNumber([]),
    generateRandomNumber([]),
    generateRandomNumber([]),
  ]);

  const { getTotalDuration } = useMineService();

  const fetchDetailMine = useCallback(async () => {
    try {
      const res = await getTotalDuration();
      console.log("RESPONSE MINE DETAIL", res.data);
      setTotalDuration(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [getTotalDuration]);

  const isBotRunning = useAppSelector((state) => state.mine.mine?.bot_running);
  const listRef = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (!listRef.current) return;


    const firstChild = listRef.current.querySelector("span:first-child");
    if (firstChild) {
      listRef.current.appendChild(firstChild.cloneNode(true));
    }

    const liHeight = listRef.current.querySelector("span")?.offsetHeight || 0;
    let counter = 1;
    const totalDurationInHour = totalDuration / 60;
    console.log("TOTAL DURATION", totalDurationInHour, totalDuration);

    if (totalDurationInHour === 1000) {
      setRandomNumbers(Array(5).fill(100));
      fetchDetailMine();
      return;
    }
    if (isJackpot) {
      const interval = setInterval(() => {

        setRandomNumbers((prevNumbers) => {
          const newNumbers = [...prevNumbers];
          newNumbers.forEach((_, index) => {
            newNumbers[index] = generateRandomNumber(newNumbers);
          });
          return newNumbers;
        });
        if (counter === listRef.current?.querySelectorAll("span").length) {
          counter = 1;
          TweenMax.set(listRef.current, { y: 0 });
        }


        TweenMax.to(listRef.current, 1, {
          y: 0 - liHeight * counter,
          ease: Elastic.easeInOut.config(8, 0),
        });

        counter++;
      }, 100);
      return () => clearInterval(interval);
    }

    if (isBotRunning) {
      const interval = setInterval(() => {
        setRandomNumbers((prevNumbers) => {
          const newNumbers = [...prevNumbers];
          newNumbers.forEach((_, index) => {
            newNumbers[index] = generateRandomNumber(newNumbers);
          });
          return newNumbers;
        });

        if (counter === listRef.current?.querySelectorAll("span").length) {
          counter = 1;
          TweenMax.set(listRef.current, { y: 0 });
        }

        TweenMax.to(listRef.current, 1, {
          y: 0 - liHeight * counter,
          ease: Elastic.easeInOut.config(8, 0),
        });

        counter++;
      }, 4000); // Run the interval every 10 seconds

      return () => clearInterval(interval);
    }

  }, [isJackpot, totalDuration, isBotRunning, fetchDetailMine]);


  const { getMineDetail } = useMineService();
  useEffect(() => {
    fetchDetailMine();
  }, [fetchDetailMine]); const { user } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMineDetail = async () => {
      const userId = user?._id.toString();
      if (userId) {
        const mine = await getMineDetail(userId);
        dispatch(detailMine(mine.data.data));
      }
    };

    // Panggil fetchMineDetail segera saat komponen dimuat
    fetchMineDetail();

    // Atur interval untuk memanggil fetchMineDetail setiap 10 detik
    const intervalId = setInterval(fetchMineDetail, 10000);

    // Bersihkan interval ketika komponen di-unmount
    return () => clearInterval(intervalId);
  }, [user, dispatch, getMineDetail]);

  return (
    <section className="overflow-x-hidden responsive-width  flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 p-4 ml-0 md:ml-10 pt-[35px]">
      <div className="w-full flex space-x-21">
        Game
      </div>
    </section>
  );
};

export default Mine;
