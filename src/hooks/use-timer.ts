import { useEffect, useRef, useState } from "react";

type TimerStatus = "idle" | "running" | "paused" | "finished";

interface UseTimerOptions {
  initialSeconds: number;        
  autoStart?: boolean;           
  onFinish?: () => void;         
}

export function useTimer({ initialSeconds, autoStart = false, onFinish }: UseTimerOptions) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [status, setStatus] = useState<TimerStatus>("idle");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Inicia o timer
  const start = () => {
    if (status === "running") return;
    setStatus("running");
  };

  // Pausa o timer
  const pause = () => {
    setStatus("paused");
  };

  // Reseta o timer
  const reset = () => {
    setStatus("idle");
    setSeconds(initialSeconds);
  };

  // Efeito principal para controlar o intervalo
  useEffect(() => {
    if (status === "running") {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setStatus("finished");
            onFinish?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status, onFinish]);

  // Auto start opcional
  useEffect(() => {
    if (autoStart) start();
  }, [autoStart]);

  return {
    seconds,
    status,
    start,
    pause,
    reset,
    isRunning: status === "running",
    isPaused: status === "paused",
    isFinished: status === "finished",
  };
}
