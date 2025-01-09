import {  useState } from "react";
import { useTimer } from "./useTimer";
import { AxiosResponse } from "axios";
import { useAppSelector } from "../redux/hooks";
import useMineService from "./useMine";
import { detailMine } from "../redux/slices/mineSlice";
import { useDispatch } from "react-redux";

interface GameControlsProps {
    updateMining: (time: number) => Promise<AxiosResponse<any, any>>;
  }
  export const useGameControls = ({ updateMining }: GameControlsProps) => {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [startBirdieFlappy, setStartBirdieFlappy] = useState(false);
    const [startTesara, setStartTesara] = useState(false);
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { getMineDetail } = useMineService();
    const { 
        startTimer,
        stopTimer,
        elapsedTime,
        formatTime 
    } = useTimer();
  
    const startGame = () => {
        setIsGameStarted(true);
        startTimer();  
    };
    const startGameTesara = () => {
      setStartTesara(true);
        startTimer();  
    };
  
    const endGame = async () => {
      const timeElapsed = stopTimer();  
      setIsGameStarted(false);
      try {
        await updateMining(timeElapsed);
        const userId = user?._id.toString();
        const mine = await getMineDetail(userId || "");
        dispatch(detailMine(mine.data.data));
      } catch (error) {
        console.error("Error updating mining time:", error);
      }
      
    };
  
    const handleGameToggle = async (
        isLoaded: boolean,
        setLoaded: (value: boolean) => void,
        modalAction: (value: boolean) => void
    ) => {
        setLoaded(!isLoaded);
        if (isLoaded) {
            await endGame();
            modalAction(false);
        } else {
            startTimer();  // Mulai timer di sini
        }
    };
    return {
      isGameStarted,
      iframeLoaded,
      startBirdieFlappy,
      startGame,
      endGame,
      handleGameToggle,
      setStartBirdieFlappy,
      setIframeLoaded,
      elapsedTime,
      formatTime,
      startGameTesara,
      startTesara,
      setStartTesara,
      setIsGameStarted
    };
  };