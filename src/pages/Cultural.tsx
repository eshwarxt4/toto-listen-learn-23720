import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { fetchStories } from "@/lib/supabaseQueries";
import { StoryRow } from "@/lib/supabaseQueries";

export default function Cultural() {
  const navigate = useNavigate();
  const [stories, setStories] = useState<StoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  useEffect(() => {
    const loadStories = async () => {
      try {
        setLoading(true);
        const folkStories = await fetchStories();
        setStories(folkStories);
      } catch (error) {
        console.error('Failed to load stories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, []);

  // Stop all other audio players when a new one starts
  const handleAudioPlayStart = (currentAudioId: string) => {
    audioRefs.current.forEach((audio, audioId) => {
      if (audioId !== currentAudioId && audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  // Register audio element
  const registerAudio = (audioId: string, audioElement: HTMLAudioElement | null) => {
    if (audioElement) {
      audioRefs.current.set(audioId, audioElement);
    } else {
      audioRefs.current.delete(audioId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Stories</h1>
          <p className="text-lg text-muted-foreground">
            Explore traditional Toto folk stories
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No stories available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {stories.map((story) => (
              <Card
                key={story.id}
                className="card-elevated hover:scale-105 transition-transform animate-slide-in"
              >
                <CardContent className="p-6 space-y-4">
                  {story.image_url && (
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                      <img
                        src={story.image_url}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                        <BookOpen className="h-8 w-8 text-white m-4" />
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    {!story.image_url && (
                      <div className="p-3 rounded-lg bg-secondary/20">
                        <BookOpen className="h-8 w-8 text-secondary" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-2">{story.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {story.cultural_meaning || story.english_narration.substring(0, 100) + '...'}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        {story.duration && (
                          <span className="text-sm text-primary font-medium">
                            Duration: {story.duration}
                          </span>
                        )}
                        <span className="text-xs bg-muted px-2 py-1 rounded">
                          {story.type || 'Folk Story'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-center">
                    {story.audio_toto_url && (
                      <AudioPlayer
                        audioUrl={story.audio_toto_url}
                        label="Toto narration"
                        variant="toto"
                        audioId={`${story.id}-toto`}
                        onPlayStart={() => handleAudioPlayStart(`${story.id}-toto`)}
                        onAudioRef={(audio) => registerAudio(`${story.id}-toto`, audio)}
                      />
                    )}
                    {story.audio_english_url && (
                      <AudioPlayer
                        audioUrl={story.audio_english_url}
                        label="English narration"
                        variant="english"
                        audioId={`${story.id}-english`}
                        onPlayStart={() => handleAudioPlayStart(`${story.id}-english`)}
                        onAudioRef={(audio) => registerAudio(`${story.id}-english`, audio)}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto card-elevated">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Learn About Toto Culture
              </h2>
              <p className="text-muted-foreground mb-6">
                Discover the rich history and traditions of the Toto community
              </p>
              <Button onClick={() => navigate('/about')}>
                About Toto Language
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
