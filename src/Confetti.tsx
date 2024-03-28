import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const Confetti = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const getWindowSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return { height, width };
  };

  const placeConfetti = (x: number, y: number, angle = 90, particleCount = 100) => {
    const { height, width } = getWindowSize();
    const origin = { x: x / width, y: y / height };
    confetti({ origin, angle, particleCount, spread: 360 });
  };

  const checkVisibilityState = async () => {
    const newIsActive = document.visibilityState === "visible";

    if (!isActive) await new Promise((resolve) => setTimeout(resolve, 5000));

    setIsActive(newIsActive);

    const infoElement = document.getElementsByClassName("info")[0] as HTMLElement;
    if (infoElement) {
      infoElement.style.display = newIsActive ? "none" : "block";
    }

    if (!newIsActive) {
      confetti.reset();
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      checkVisibilityState();
    });

    return () => {
      document.removeEventListener("visibilitychange", () => {
        checkVisibilityState();
      });
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", ({ clientX, clientY }) => {
      placeConfetti(clientX, clientY);
    });

    return () => {
      document.removeEventListener("click", ({ clientX, clientY }) => {
        placeConfetti(clientX, clientY);
      });
    };
  }, []);

  useEffect(() => {
    const duration = 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    const animationFrameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    checkVisibilityState();
  }, []);

  return null;
};

export default Confetti;
