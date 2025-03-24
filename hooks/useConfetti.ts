import { useCallback, useMemo } from "react";
import confetti, { Shape } from "canvas-confetti";

type ConfettiColors = {
  primary?: string[];
  secondary?: string[];
};

type ConfettiOptions = {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  scalar?: number;
  ticks?: number;
  origin?: {
    x?: number;
    y?: number;
  };
  shapes?: Shape[];
  colors?: string[];
};

export const useConfetti = (defaultColors?: ConfettiColors) => {
  const colors = useMemo(() => {
    return (
      defaultColors ?? {
        primary: ["#ff3d78", "#ffcad8", "#ffc2d4"],
        secondary: ["#c1a065", "#d9c8a2", "#e6dac1"],
      }
    );
  }, [defaultColors]);

  const triggerConfetti = useCallback(
    (options?: ConfettiOptions) => {
      const defaultOptions: ConfettiOptions = {
        particleCount: 100,
        spread: 70,
        startVelocity: 30,
        decay: 0.94,
        scalar: 1,
        ticks: 60,
        origin: { x: 0.5, y: 0.5 },
        colors: [...(colors.primary ?? []), ...(colors.secondary ?? [])],
      };

      confetti({
        ...defaultOptions,
        ...options,
      });
    },
    [colors]
  );

  // Confetti cannon from a specific position
  const triggerConfettiCannon = useCallback(
    (x: number, y: number, options?: ConfettiOptions) => {
      const defaultOptions: ConfettiOptions = {
        particleCount: 80,
        spread: 100,
        startVelocity: 30,
        decay: 0.94,
        scalar: 1,
        ticks: 60,
        origin: { x, y },
        colors: [...(colors.primary ?? []), ...(colors.secondary ?? [])],
      };

      confetti({
        ...defaultOptions,
        ...options,
      });
    },
    [colors]
  );

  // Confetti explosion from all sides
  const triggerConfettiExplosion = useCallback(() => {
    const count = 5;
    const defaults = {
      origin: { y: 0.7 },
      colors: [...(colors.primary ?? []), ...(colors.secondary ?? [])],
    };

    function fire(particleRatio: number, opts: ConfettiOptions) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    // Left side
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      origin: {
        x: 0.1,
        y: 0.5,
      },
    });

    // Right side
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      origin: { x: 0.9, y: 0.5 },
    });

    // Middle top
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      origin: { x: 0.5, y: 0.3 },
    });

    // Middle bottom
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      origin: { x: 0.5, y: 0.7 },
    });

    // Middle
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      origin: { x: 0.5, y: 0.5 },
    });
  }, [colors]);

  // Celebratory confetti rain
  const triggerConfettiRain = useCallback(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Random confetti bursts
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: colors.primary,
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: colors.secondary,
      });
    }, 250);

    return () => clearInterval(interval);
  }, [colors]);

  return {
    triggerConfetti,
    triggerConfettiCannon,
    triggerConfettiExplosion,
    triggerConfettiRain,
  };
};
