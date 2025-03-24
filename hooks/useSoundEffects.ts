import { boolean } from "zod";
import { useCallback, useState } from "react";
import useSound from "use-sound";

type SoundEffectOptions = {
  volume?: number;
  playbackRate?: number;
  interrupt?: boolean;
};

export const useSoundEffects = () => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sounds
  const [playClick] = useSound("/sounds/mixkit-arcade-game-jump-coin-216.wav", {
    volume: 0.5,
  });
  const [playPop] = useSound("/sounds/pop.mp3", { volume: 0.5 });
  const [playWin] = useSound("/sounds/mixkit-retro-game-notification-212.wav", {
    volume: 0.7,
  });
  const [playGameStart] = useSound(
    "/sounds/mixkit-software-interface-start-2574.wav",
    { volume: 0.6 }
  );
  const [playError] = useSound(
    "/sounds/mixkit-game-show-wrong-answer-buzz-950.wav",
    { volume: 0.5 }
  );

  // Toggle sound on/off
  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  // Sound effect players with sound toggle control
  const playClickSound = useCallback(() => {
    if (soundEnabled) playClick();
  }, [playClick, soundEnabled]);

  const playPopSound = useCallback(() => {
    if (soundEnabled) playPop();
  }, [playPop, soundEnabled]);

  const playWinSound = useCallback(() => {
    if (soundEnabled) playWin();
  }, [playWin, soundEnabled]);

  const playGameStartSound = useCallback(() => {
    if (soundEnabled) playGameStart();
  }, [playGameStart, soundEnabled]);

  const playErrorSound = useCallback(() => {
    if (soundEnabled) playError();
  }, [playError, soundEnabled]);

  return {
    soundEnabled,
    toggleSound,
    playClickSound,
    playPopSound,
    playWinSound,
    playGameStartSound,
    playErrorSound,
  };
};
