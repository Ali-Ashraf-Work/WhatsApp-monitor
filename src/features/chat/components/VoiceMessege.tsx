import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaMicrophone } from 'react-icons/fa';

export default function VoiceMessagePlayer({ audioUrl }: { audioUrl: string }) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [playbackRate, setPlaybackRate] = useState<number>(1);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isPlaying) {
            const updateTime = () => {
                if (audioRef.current && !isDragging) {
                    setCurrentTime(audioRef.current.currentTime);
                }
                animationRef.current = requestAnimationFrame(updateTime);
            };
            animationRef.current = requestAnimationFrame(updateTime);
        } else if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isPlaying, isDragging]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const togglePlaybackRate = () => {
        const rates = [1, 1.5, 2];
        const currentIndex = rates.indexOf(playbackRate);
        const nextRate = rates[(currentIndex + 1) % rates.length];
        setPlaybackRate(nextRate);
        if (audioRef.current) {
            audioRef.current.playbackRate = nextRate;
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        const progressBar = progressBarRef.current;
        const audio = audioRef.current;
        if (!progressBar || !audio) return;

        const rect = progressBar.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const offsetX = clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, offsetX / rect.width));
        const newTime = percentage * duration;

        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        handleSeek(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            const progressBar = progressBarRef.current;
            const audio = audioRef.current;
            if (!progressBar || !audio) return;

            const rect = progressBar.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const percentage = Math.max(0, Math.min(1, offsetX / rect.width));
            const newTime = percentage * duration;

            audio.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        /* eslint-disable-next-line */
    }, [isDragging]);

    const formatTime = (time: number): string => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="flex items-center justify-center">
            <div className="max-w-md">
                {/* Voice Message Bubble */}
                <div className="bg-transparent rounded-3xl p-6 space-y-4">
                    <div className="flex items-center gap-3">
                        {/* Play/Pause Button */}
                        <button
                            onClick={togglePlayPause}
                            className="shrink-0 w-12 h-12 rounded-full bg-linear-to-br from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white flex items-center justify-center shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            {isPlaying ? (
                                <FaPause className="text-lg ml-0.5" />
                            ) : (
                                <FaPlay className="text-lg ml-1" />
                            )}
                        </button>

                        {/* Waveform and Progress */}
                        <div className="flex-1 space-y-2 h-min">
                            {/* Progress Bar */}
                            <div
                                ref={progressBarRef}
                                onMouseDown={handleMouseDown}
                                onTouchStart={(e) => {
                                    setIsDragging(true);
                                    handleSeek(e);
                                }}
                                onTouchMove={handleSeek}
                                onTouchEnd={() => setIsDragging(false)}
                                className="relative h-1 bg-gray-200 rounded-full cursor-pointer group"
                            >
                                {/* Progress Fill */}
                                <div
                                    className="absolute top-0 left-0 h-full bg-linear-to-r from-teal-400 to-teal-600 rounded-full transition-all duration-100"
                                    style={{ width: `${progress}%` }}
                                />

                                {/* Progress Thumb */}
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-teal-600 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    style={{ left: `calc(${progress}% - 6px)` }}
                                />
                            </div>

                            {/* Visual Waveform */}
                            <div className="flex items-center gap-0.5 h-8">
                                {Array.from({ length: 40 }).map((_, i) => {
                                    const height = Math.sin(i * 0.5) * 15 + 20;
                                    const isPassed = (i / 40) * 100 < progress;
                                    return (
                                        <div
                                            key={i}
                                            className={`flex-1 rounded-full transition-all duration-200 ${isPassed
                                                ? 'bg-teal-500'
                                                : 'bg-gray-300'
                                                }`}
                                            style={{
                                                height: `${height}%`,
                                                opacity: isPassed ? 1 : 0.5,
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        {/* Microphone Icon */}
                        <div className="flex-linear-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                            <FaMicrophone className="text-teal-600 text-sm" />
                        </div>
                    </div>

                    {/* Time and Speed Controls */}
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-medium">
                            {formatTime(currentTime)}
                        </span>

                        <button
                            onClick={togglePlaybackRate}
                            className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors duration-200 text-xs"
                        >
                            {playbackRate}x
                        </button>

                        <span className="text-gray-500 font-medium">
                            {formatTime(duration)}
                        </span>
                    </div>
                </div>

                {/* Hidden Audio Element */}
                <audio ref={audioRef} src={audioUrl} preload="metadata" />
            </div>
        </div>
    );
};
