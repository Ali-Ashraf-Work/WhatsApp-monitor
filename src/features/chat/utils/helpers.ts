export const formatTime = (timestamp: string | Date) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const handleAudioToggle = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
  isPlaying: boolean,
  setIsPlaying: (value: React.SetStateAction<boolean>) => void
) => {
  if (audioRef.current) {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }
};
