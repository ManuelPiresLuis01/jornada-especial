import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ConfettiEffectProps {
  trigger: boolean;
}

const ConfettiEffect = ({ trigger }: ConfettiEffectProps) => {
  useEffect(() => {
    if (!trigger) return;

    const duration = 4000;
    const end = Date.now() + duration;

    const colors = ["#e8587a", "#f5a623", "#ff6b9d", "#ffd700", "#ff4081"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, [trigger]);

  return null;
};

export default ConfettiEffect;
