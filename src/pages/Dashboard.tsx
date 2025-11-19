import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Trophy, Sparkles, Library, Settings, Zap, Loader2 } from "lucide-react";
import { SwipeableWordCard } from "@/components/SwipeableWordCard";
import { Progress } from "@/components/ui/progress";
import { WordItem } from "@/types/content";
import { useGamification } from "@/hooks/useGamification";
import { toast } from "@/hooks/use-toast";
import mascotImage from "@/assets/toto-mascot.png";
import { fetchWords } from "@/lib/supabaseQueries";
import { transformWordRowToWordItem } from "@/lib/dataTransformers";

export default function Dashboard() {
  const navigate = useNavigate();
  const [words, setWords] = useState<WordItem[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const gamification = useGamification();

  useEffect(() => {
    const loadWords = async () => {
      try {
        setLoading(true);
        const wordRows = await fetchWords();
        const transformedWords = wordRows.map(transformWordRowToWordItem);
        setWords(transformedWords);
        
        // Cycle through words
        const savedIndex = parseInt(localStorage.getItem('currentWordIndex') || '0');
        setCurrentWordIndex(savedIndex % transformedWords.length);
      } catch (error) {
        console.error('Failed to load words:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWords();
  }, []);

  const currentWord = words[currentWordIndex];

  const nextWord = () => {
    const nextIndex = (currentWordIndex + 1) % words.length;
    setCurrentWordIndex(nextIndex);
    localStorage.setItem('currentWordIndex', nextIndex.toString());
  };

  const handleSwipeLeft = () => {
    gamification.addXp(5);
    toast({
      title: "Skipped!",
      description: "+5 XP for reviewing",
    });
    nextWord();
  };

  const handleSwipeRight = () => {
    const result = gamification.addXp(15);
    
    // Save word
    const learnedWords = JSON.parse(localStorage.getItem('learnedWords') || '[]');
    if (!learnedWords.includes(currentWord.id)) {
      learnedWords.push(currentWord.id);
      localStorage.setItem('learnedWords', JSON.stringify(learnedWords));
    }

    if (result.leveledUp) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
      toast({
        title: "🎉 Level Up!",
        description: `You reached level ${result.newLevel}!`,
        duration: 5000,
      });
    } else {
      toast({
        title: "Word Saved! ❤️",
        description: "+15 XP earned",
      });
    }
    
    nextWord();
  };

  const handleSwipeUp = () => {
    gamification.addXp(10);
    toast({
      title: "Learning more!",
      description: "+10 XP earned",
    });
    navigate(`/word/${currentWord.id}`);
  };

  const quickLinks = [
    { icon: BookOpen, label: "Stories", path: "/stories", color: "text-primary" },
    { icon: Sparkles, label: "Words", path: "/words", color: "text-accent" },
    { icon: Library, label: "Folk Stories", path: "/cultural", color: "text-secondary" },
    { icon: Trophy, label: "Progress", path: "/progress", color: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img src={mascotImage} alt="Toto" className="w-12 h-12" />
              <h1 className="text-2xl font-bold text-primary">Toto Infotainment</h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          {/* Gamification Stats */}
          <div className="bg-muted/50 rounded-lg p-2 px-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-celebration" />
                <span className="font-semibold text-sm">Level {gamification.level}</span>
              </div>
              <div className="flex-1 max-w-[200px]">
                <Progress value={gamification.progressPercent} className="h-1.5" />
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {gamification.xp}/{gamification.xpToNextLevel} XP
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Level Up Animation */}
      {showLevelUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in pointer-events-none">
          <div className="bg-card p-8 rounded-2xl shadow-2xl animate-celebration">
            <div className="text-center space-y-4">
              <Trophy className="h-24 w-24 text-celebration mx-auto" />
              <h2 className="text-4xl font-bold text-primary">Level Up!</h2>
              <p className="text-2xl">You reached Level {gamification.level}! 🎉</p>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Swipeable Word Card */}
        <section className="animate-fade-in">
          <h2 className="text-3xl font-bold mb-2 text-center">Word of the Day</h2>
          <p className="text-center text-muted-foreground mb-6">
            Swipe ← to skip • Swipe → to save • Swipe ↑ to learn more
          </p>
          {loading || !currentWord ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <SwipeableWordCard
              word={currentWord}
              showTransliteration={showTransliteration}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              onSwipeUp={handleSwipeUp}
            />
          )}
        </section>

        {/* Quick Links */}
        <section className="animate-slide-in">
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Card
                  key={link.path}
                  className="cursor-pointer hover:scale-105 transition-transform card-elevated"
                  onClick={() => navigate(link.path)}
                >
                  <CardContent className="p-6 flex flex-col items-center gap-3">
                    <Icon className={`h-12 w-12 ${link.color}`} />
                    <h3 className="font-semibold text-lg text-center">{link.label}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Daily Motivation */}
        <section>
          <Card className="card-elevated bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardHeader>
              <CardTitle className="text-center">Keep Going! 💪</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <p className="text-muted-foreground">
                You're doing great! Every word you learn is a step forward.
              </p>
              <p className="text-sm font-medium text-primary">
                {words.length > 0 ? `${words.length - currentWordIndex} more words to explore today!` : 'Loading words...'}
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
