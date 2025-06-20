import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  Check,
  Loader2
} from 'lucide-react';

// Interface for video sources
interface VideoSource {
  src: string;
  type: string;
  quality: string; // e.g., '1080p', '720p', 'auto'
}

// Props for the VideoPlayer component
interface VideoPlayerProps {
  sources: VideoSource[];
  poster?: string;
  title?: string;
  onEnded?: () => void;
  autoplay?: boolean;
  loop?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  sources,
  poster,
  title = "Video player",
  onEnded,
  autoplay = false,
  loop = false,
}) => {
  console.log('VideoPlayer loaded');

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState<string>(() => sources.length > 0 ? sources[0].quality : '');
  const [currentSrc, setCurrentSrc] = useState<string>(() => sources.length > 0 ? sources[0].src : '');
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (sources.length > 0) {
      const initialSource = sources.find(s => s.quality === selectedQuality) || sources[0];
      if (!selectedQuality && initialSource) setSelectedQuality(initialSource.quality);
      if (initialSource) setCurrentSrc(initialSource.src);
      setIsLoading(true); // Assume loading when source changes
    } else {
      console.error("VideoPlayer: No sources provided.");
      setIsLoading(false);
    }
  }, [sources, selectedQuality]);


  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
      if (autoplay && videoRef.current.paused) {
        videoRef.current.play().catch(e => console.error("Autoplay failed:", e));
        setIsPlaying(true); // Ensure state consistency
      }
    }
  }, [autoplay]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setProgress(videoRef.current.currentTime);
    }
  }, []);

  const handleVideoEnded = useCallback(() => {
    setIsPlaying(false);
    if (onEnded) onEnded();
    if (loop && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.error("Loop play failed:", e));
      setIsPlaying(true);
    }
  }, [onEnded, loop]);

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(e => console.error("Play failed:", e));
    }
    setIsPlaying(prev => !prev);
  }, [isPlaying]);

  const handleVolumeChange = useCallback((value: number[]) => {
    if (!videoRef.current) return;
    const newVolume = value[0];
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (newVolume > 0 && videoRef.current.muted) { // If volume adjusted > 0, unmute
        videoRef.current.muted = false;
    }
  }, []);

  const handleMuteToggle = useCallback(() => {
    if (!videoRef.current) return;
    const newMutedState = !isMuted;
    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
    if (!newMutedState && volume === 0) { // If unmuting and volume was 0
      videoRef.current.volume = 0.5; // Set to a default volume
      setVolume(0.5);
    }
  }, [isMuted, volume]);

  const handleProgressChange = useCallback((value: number[]) => {
    if (!videoRef.current) return;
    const newTime = value[0];
    videoRef.current.currentTime = newTime;
    setProgress(newTime);
  }, []);

  const handleQualityChange = useCallback((quality: string) => {
    const newSource = sources.find(s => s.quality === quality);
    if (newSource && videoRef.current && newSource.src !== currentSrc) {
      const currentTime = videoRef.current.currentTime;
      const wasPlaying = !videoRef.current.paused;

      setIsLoading(true);
      videoRef.current.src = newSource.src; // Set new src
      videoRef.current.load(); // Load the new source

      const restorePlayback = () => {
        if (videoRef.current) {
          videoRef.current.currentTime = currentTime;
          if (wasPlaying) {
            videoRef.current.play().catch(e => console.error("Play after quality change failed:", e));
          }
          // No need to explicitly set isPlaying(wasPlaying) here as video events (onPlay/onPause) will handle it
          videoRef.current.removeEventListener('loadeddata', restorePlayback);
        }
      };
      videoRef.current.addEventListener('loadeddata', restorePlayback);
      
      setSelectedQuality(newSource.quality); // Update selected quality state
      setCurrentSrc(newSource.src); // Update current src state for the video element's key or direct src if not using key
    }
  }, [sources, currentSrc]);


  const handleFullScreenToggle = useCallback(() => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, []);

  useEffect(() => {
    const onFullScreenChange = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullScreenChange);
  }, []);

  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  useEffect(() => {
    const container = playerContainerRef.current;
    if (container) {
      container.addEventListener('mousemove', resetControlsTimeout);
      container.addEventListener('mouseleave', () => {
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        if (isPlaying) setShowControls(false);
      });
      if (isPlaying) resetControlsTimeout(); // Initial timeout if autoplaying
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', resetControlsTimeout);
        container.removeEventListener('mouseleave', () => {
          if (isPlaying) setShowControls(false);
        });
      }
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, resetControlsTimeout]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!videoRef.current || !playerContainerRef.current?.contains(document.activeElement) && document.activeElement !== playerContainerRef.current) {
         // Only apply shortcuts if player itself or one of its children has focus
         // This condition might need refinement based on desired global shortcut behavior
         // return;
      }

      // Prevent default for keys we handle, to avoid page scroll etc.
      if ([' ', 'k', 'm', 'f', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
      }
      
      switch (event.key) {
        case ' ': case 'k': handlePlayPause(); break;
        case 'm': handleMuteToggle(); break;
        case 'f': handleFullScreenToggle(); break;
        case 'ArrowLeft': if(videoRef.current) videoRef.current.currentTime -= 5; break;
        case 'ArrowRight': if(videoRef.current) videoRef.current.currentTime += 5; break;
        case 'ArrowUp':
          if (videoRef.current && videoRef.current.volume < 1) {
            const newVol = Math.min(1, videoRef.current.volume + 0.1);
            handleVolumeChange([newVol]); // Use existing handler
          }
          break;
        case 'ArrowDown':
          if (videoRef.current && videoRef.current.volume > 0) {
            const newVol = Math.max(0, videoRef.current.volume - 0.1);
            handleVolumeChange([newVol]); // Use existing handler
          }
          break;
        default: return; // Do not reset timeout for unhandled keys
      }
      resetControlsTimeout(); // Reset timeout on any handled key action
    };

    const container = playerContainerRef.current;
    container?.addEventListener('keydown', handleKeyDown);
    return () => container?.removeEventListener('keydown', handleKeyDown);
  }, [handlePlayPause, handleMuteToggle, handleFullScreenToggle, resetControlsTimeout, handleVolumeChange]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  if (sources.length === 0) {
    return <div className="w-full aspect-video bg-black text-white flex items-center justify-center">No video sources provided.</div>;
  }
  
  return (
    <div
      ref={playerContainerRef}
      className="relative w-full aspect-video bg-black overflow-hidden group/player select-none"
      onMouseEnter={resetControlsTimeout}
      onClick={(e) => { if (e.target === videoRef.current || e.target === playerContainerRef.current ) handlePlayPause();}}
      tabIndex={0} // Make div focusable for keyboard controls
    >
      <video
        // key={currentSrc} // Using key forces re-mount on src change, simpler state management for reload.
        // Or manage with videoRef.current.src = ...; videoRef.current.load();
        ref={videoRef}
        src={currentSrc}
        poster={poster}
        className="w-full h-full object-contain" // object-contain to see full video, object-cover to fill
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        onPlay={() => { setIsPlaying(true); setIsLoading(false); resetControlsTimeout(); }}
        onPause={() => { setIsPlaying(false); setShowControls(true); if(controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);}}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onClick={(e) => {e.stopPropagation(); handlePlayPause();}} // Click on video itself also plays/pauses
        loop={loop}
        // muted attribute is controlled via videoRef.current.muted
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 pointer-events-none">
          <Loader2 className="h-12 w-12 text-white animate-spin" />
        </div>
      )}

      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-3 text-white z-10 transition-opacity duration-300
                    ${(showControls || !isPlaying || isLoading) ? 'opacity-100' : 'opacity-0 group-hover/player:opacity-100'}`}
        onClick={(e) => e.stopPropagation()} // Prevent playerContainer click from bubbling
      >
        <Slider
          value={[progress]}
          max={duration}
          step={0.1} // Finer step for seeking
          onValueChange={handleProgressChange}
          className="w-full h-2 mb-2 cursor-pointer video-progress-slider [&>.track]:h-full [&>.range]:bg-red-600 [&>.thumb]:bg-red-600 [&>.thumb]:h-3 [&>.thumb]:w-3 [&>.thumb]:border-none [&>.thumb]:shadow-md"
          aria-label="Video progress"
        />

        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" onClick={handlePlayPause} aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause className="h-5 w-5 sm:h-6 sm:w-6" /> : <Play className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>

            <div className="flex items-center group/volume">
              <Button variant="ghost" size="icon" onClick={handleMuteToggle} aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted || volume === 0 ? <VolumeX className="h-5 w-5 sm:h-6 sm:w-6" /> : <Volume2 className="h-5 w-5 sm:h-6 sm:w-6" />}
              </Button>
              <div className="w-0 opacity-0 group-hover/volume:w-20 group-hover/volume:opacity-100 sm:group-hover/volume:w-24 overflow-hidden transition-all duration-200 ease-in-out">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="h-5 video-volume-slider [&>.track]:h-1 [&>.range]:bg-white [&>.thumb]:bg-white [&>.thumb]:h-2.5 [&>.thumb]:w-2.5"
                  aria-label="Volume"
                />
              </div>
            </div>

            <span className="text-xs sm:text-sm font-mono">
              {formatTime(progress)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {sources.length > 1 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Video settings">
                    <Settings className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-1 bg-black/80 border-gray-700/50 text-white backdrop-blur-sm">
                  <div className="text-sm font-semibold px-3 py-1.5">Quality</div>
                  {sources.map((source) => (
                    <Button
                      key={source.quality}
                      variant="ghost"
                      className="w-full justify-start text-xs sm:text-sm hover:bg-white/10 focus-visible:bg-white/20 h-8 px-3"
                      onClick={() => handleQualityChange(source.quality)}
                    >
                      {source.quality === selectedQuality && <Check className="mr-2 h-4 w-4" />}
                      <span className={source.quality === selectedQuality ? "" : "ml-[24px]"}>{source.quality}</span>
                    </Button>
                  ))}
                </PopoverContent>
              </Popover>
            )}

            <Button variant="ghost" size="icon" onClick={handleFullScreenToggle} aria-label={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}>
              {isFullScreen ? <Minimize className="h-5 w-5 sm:h-6 sm:w-6" /> : <Maximize className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {title && <span className="sr-only">{title}</span>}
    </div>
  );
};

export default VideoPlayer;