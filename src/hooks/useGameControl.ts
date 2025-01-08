import { useState } from "react";
import { useTimer } from "./useTimer";
import { AxiosResponse } from "axios";

interface GameControlsProps {
    updateMining: (time: number) => Promise<AxiosResponse<any, any>>;
  }
  export const useGameControls = ({ updateMining }: GameControlsProps) => {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [startBirdieFlappy, setStartBirdieFlappy] = useState(false);
    const { 
      startTimer,
      stopTimer,
      elapsedTime,
      formatTime 
    } = useTimer();
  
    const startGame = () => {
      setIsGameStarted(true);
      startTimer();  // Use startTimer instead of manually setting startTime
    };
  
    const endGame = async () => {
      const timeElapsed = stopTimer();  // Use stopTimer to get final time
      try {
        await updateMining(timeElapsed);
      } catch (error) {
        console.error("Error updating mining time:", error);
      }
      setIsGameStarted(false);
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
        startTimer();  // Use startTimer here
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
      formatTime
    };
  };