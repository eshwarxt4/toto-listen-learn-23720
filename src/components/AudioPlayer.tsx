import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Loader2, AlertCircle } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  label: string;
  variant?: "toto" | "english";
  audioId?: string;
  onPlayStart?: () => void;
  onAudioRef?: (audio: HTMLAudioElement | null) => void;
}

export const AudioPlayer = ({ 
  audioUrl, 
  label, 
  variant = "english",
  audioId,
  onPlayStart,
  onAudioRef
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Check if URL is valid
  const isValidUrl = audioUrl && 
    audioUrl.trim() !== '' && 
    !audioUrl.includes('{SUPABASE_PROJECT_REF}') &&
    (audioUrl.startsWith('http://') || audioUrl.startsWith('https://') || audioUrl.startsWith('/'));

  // Cleanup: unregister audio ref when component unmounts or URL changes
  useEffect(() => {
    return () => {
      if (onAudioRef) {
        onAudioRef(null);
      }
    };
  }, [onAudioRef, audioUrl]);

  // Reset audio element when URL changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isValidUrl) return;

    // Reset audio state when URL changes
    setIsPlaying(false);
    setIsLoading(false);
    setHasError(false);
    
    // Reset the audio element
    audio.pause();
    audio.currentTime = 0;
    audio.load();
  }, [audioUrl, isValidUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isValidUrl) return;

    const handleError = (event: Event) => {
      const error = audio.error;
      let errorMessage = 'Unknown error';
      let errorCode = 'Unknown';
      
      if (error) {
        switch (error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            errorCode = 'Aborted';
            errorMessage = 'Audio playback was aborted';
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            errorCode = 'Network error';
            errorMessage = 'Network error while loading audio';
            break;
          case MediaError.MEDIA_ERR_DECODE:
            errorCode = 'Decode error';
            errorMessage = 'Audio decoding error';
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorCode = 'Source not supported';
            errorMessage = 'Audio format not supported';
            break;
          default:
            errorMessage = error.message || 'Unknown error';
        }
      } else {
        errorMessage = 'Failed to load audio file. The file may not exist or is inaccessible.';
        errorCode = 'Load failed';
      }

      console.error('Audio playback error:', {
        url: audioUrl,
        variant,
        message: errorMessage,
        code: error?.code,
        errorCode,
        networkState: audio.networkState,
        readyState: audio.readyState
      });
      
      setIsPlaying(false);
      setIsLoading(false);
      setHasError(true);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setHasError(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    const handleLoadError = () => {
      handleError(new Event('error'));
    };

    const handlePauseEvent = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('stalled', handleLoadError);
    audio.addEventListener('abort', handleLoadError);
    audio.addEventListener('pause', handlePauseEvent);

    return () => {
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('stalled', handleLoadError);
      audio.removeEventListener('abort', handleLoadError);
      audio.removeEventListener('pause', handlePauseEvent);
    };
  }, [audioUrl, variant, isValidUrl]);

  const handlePlay = async () => {
    if (!isValidUrl) {
      console.warn('Invalid audio URL:', audioUrl);
      return;
    }

    if (!audioRef.current) return;

    const audio = audioRef.current;

    try {
      // Check if audio is ready to play
      if (audio.readyState < HTMLMediaElement.HAVE_METADATA) {
        setIsLoading(true);
        setHasError(false);
        
        // Wait for audio to be ready
        await new Promise<void>((resolve, reject) => {
          const handleCanPlay = () => {
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('error', handleError);
            resolve();
          };
          
          const handleError = () => {
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('error', handleError);
            reject(new Error('Audio failed to load'));
          };
          
          audio.addEventListener('canplay', handleCanPlay);
          audio.addEventListener('error', handleError);
          
          // Load the audio if not already loading
          if (audio.readyState === HTMLMediaElement.HAVE_NOTHING) {
            audio.load();
          }
        });
      }

      // Notify parent to stop other audio players
      if (onPlayStart) {
        onPlayStart();
      }

      setIsPlaying(true);
      setIsLoading(false);
      setHasError(false);
      
      // Reset audio to beginning if already played
      if (audio.currentTime > 0) {
        audio.currentTime = 0;
      }
      
      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
      setIsLoading(false);
      setHasError(true);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsLoading(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={handlePlay}
        disabled={isPlaying || isLoading || !isValidUrl}
        variant={variant === "toto" ? "default" : "secondary"}
        className="audio-button min-w-[120px]"
      >
        {hasError ? (
          <AlertCircle className="h-4 w-4 mr-2 text-destructive" />
        ) : isLoading || isPlaying ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Volume2 className="h-4 w-4 mr-2" />
        )}
        {variant === "toto" ? "🇹 Toto" : "🇬 English"}
      </Button>
      <span className="text-xs text-muted-foreground">{label}</span>
      {isValidUrl ? (
        <audio 
          ref={(el) => {
            audioRef.current = el;
            if (onAudioRef) {
              onAudioRef(el);
            }
          }}
          src={audioUrl} 
          onEnded={handleEnded}
          onPause={handlePause}
          preload="none"
          crossOrigin="anonymous"
        />
      ) : (
        <div className="text-xs text-destructive">Invalid URL</div>
      )}
    </div>
  );
};
