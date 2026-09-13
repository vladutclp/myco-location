import { useEffect, useRef, useState } from "react";

const useToast = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isToastExiting, setIsToastExiting] = useState(false);

  const handleOnAnimationEnd = () => {
    if (isToastExiting) {
      setIsToastVisible(false);
      setIsToastExiting(false);
    }
  };

  const dismissToast = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (isToastVisible) {
      setIsToastExiting(true);
    }
  };

  const showToast = () => {
    setIsToastExiting(false);
    setIsToastVisible(true);
    startToastTimeout();
  };

  const startToastTimeout = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setIsToastExiting(true);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return {
    isToastExiting,
    isToastVisible,
    dismissToast,
    handleOnAnimationEnd,
    showToast,
  };
};

export default useToast;
