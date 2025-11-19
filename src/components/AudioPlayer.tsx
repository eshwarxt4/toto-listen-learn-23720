import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Loader2, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = () => {
      const error = audio.error;
      console.error('Audio playback error:', {
        url: audioUrl,
        variant,
        message: error?.message || 'Unknown error',
        code: error?.code,
        errorCode: error?.code === MediaError.MEDIA_ERR_ABORTED ? 'Aborted' :
                   error?.code === MediaError.MEDIA_ERR_NETWORK ? 'Network error' :
                   error?.code === MediaError.MEDIA_ERR_DECODE ? 'Decode error' :
                   error?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED ? 'Source not supported' :
                   'Unknown'
      });
      setIsPlaying(false);
      setIsLoading(false);
      setHasError(true);
      toast({
        title: "Audio Error",
        description: `Failed to play ${variant} audio. Please check if the file exists.`,
        variant: "destructive",
      });
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setHasError(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleLoadError = () => {
      handleError();
    };

    const handlePauseEvent = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('stalled', handleLoadError);
    audio.addEventListener('abort', handleLoadError);
    audio.addEventListener('pause', handlePauseEvent);

    return () => {
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('stalled', handleLoadError);
      audio.removeEventListener('abort', handleLoadError);
      audio.removeEventListener('pause', handlePauseEvent);
    };
  }, [audioUrl, variant]);

  const handlePlay = async () => {
    if (!isValidUrl) {
      console.warn('Invalid audio URL:', audioUrl);
      toast({
        title: "Invalid Audio URL",
        description: "The audio file URL is not configured. Please check your Supabase settings.",
        variant: "destructive",
      });
      return;
    }

    if (!audioRef.current) return;

    try {
      // Notify parent to stop other audio players
      if (onPlayStart) {
        onPlayStart();
      }

      setIsPlaying(true);
      setIsLoading(true);
      setHasError(false);
      
      // Reset audio to beginning if already played
      if (audioRef.current.currentTime > 0) {
        audioRef.current.currentTime = 0;
      }
      
      await audioRef.current.play();
      setIsLoading(false);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
      setIsLoading(false);
      setHasError(true);
      toast({
        title: "Playback Error",
        description: `Could not play ${variant} audio. ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
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
          preload="metadata"
        />
      ) : (
        <div className="text-xs text-destructive">Invalid URL</div>
      )}
    </div>
  );
};
