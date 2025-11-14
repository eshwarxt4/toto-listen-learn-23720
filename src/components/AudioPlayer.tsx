import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Loader2 } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  label: string;
  variant?: "toto" | "english";
}

export const AudioPlayer = ({ audioUrl, label, variant = "english" }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      setIsPlaying(true);
      audioRef.current.play().catch(() => {
        // Placeholder audio doesn't exist yet
        setIsPlaying(false);
      });
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={handlePlay}
        disabled={isPlaying}
        variant={variant === "toto" ? "default" : "secondary"}
        className="audio-button min-w-[120px]"
      >
        {isPlaying ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Volume2 className="h-4 w-4 mr-2" />
        )}
        {variant === "toto" ? "🇹 Toto" : "🇬 English"}
      </Button>
      <span className="text-xs text-muted-foreground">{label}</span>
      <audio ref={audioRef} src={audioUrl} onEnded={handleEnded} />
    </div>
  );
};
