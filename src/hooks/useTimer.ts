import { useState, useEffect } from "react";

interface UseTimerReturn {
  startTime: number | null;
  elapsedTime: number;
  setStartTime: (time: number | null) => void;
  setElapsedTime: (time: number) => void;
  formatTime: (time: number) => string;
  startTimer: () => void;
  stopTimer: () => number;
  resetTimer: () => void;
}

export const useTimer = (): UseTimerReturn => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (startTime !== null) {
      // Immediately calculate initial elapsed time
      setElapsedTime(Date.now() - startTime);
      
      // Update every second
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [startTime]);

  const startTimer = () => {
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  const stopTimer = () => {
    const finalElapsedTime = startTime ? (Date.now() - startTime) / 1000 : 0;
    setStartTime(null);
    setElapsedTime(0);
    return finalElapsedTime;
  };

  const resetTimer = () => {
    setStartTime(null);
    setElapsedTime(0);
  };

  const pad = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return {
    startTime,
    elapsedTime,
    setStartTime,
    setElapsedTime,
    formatTime,
    startTimer,
    stopTimer,
    resetTimer
  };
};