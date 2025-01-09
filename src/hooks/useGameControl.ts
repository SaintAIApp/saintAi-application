import {  useState } from "react";
import { useTimer } from "./useTimer";
import { AxiosResponse } from "axios";

interface GameControlsProps {
    updateMining: (time: number) => Promise<AxiosResponse<any, any>>;
  }
  export const useGameControls = ({ updateMining }: GameControlsProps) => {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [startBirdieFlappy, setStartBirdieFlappy] = useState(false);
    const [startTesara, setStartTesara] = useState(false);
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
      setStartTesara
    };
  };