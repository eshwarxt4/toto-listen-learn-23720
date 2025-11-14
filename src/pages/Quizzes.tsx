import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Loader2 } from "lucide-react";
import { WordItem } from "@/types/content";
import { fetchWords } from "@/lib/supabaseQueries";
import { transformWordRowToWordItem } from "@/lib/dataTransformers";

export default function Quizzes() {
  const navigate = useNavigate();
  const [ageGroup, setAgeGroup] = useState<'6-9' | '10-14'>('6-9');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizWords, setQuizWords] = useState<WordItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWords = async () => {
      try {
        setLoading(true);
        const wordRows = await fetchWords();
        const transformedWords = wordRows.map(transformWordRowToWordItem);
        // Take first 3 words for quiz
        setQuizWords(transformedWords.slice(0, 3));
      } catch (error) {
        console.error('Failed to load words:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWords();
  }, []);

  const correctWord = quizWords[currentQuestion];

  const handleAnswer = (wordId: string) => {
    setSelectedAnswer(wordId);
    
    if (wordId === correctWord.id) {
      setScore(score + 1);
      setShowResult(true);
      
      setTimeout(() => {
        if (currentQuestion < quizWords.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          // Quiz complete
          const totalStars = JSON.parse(localStorage.getItem('totalStars') || '0');
          localStorage.setItem('totalStars', JSON.stringify(totalStars + score + 1));
        }
      }, 1500);
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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Quiz Time!</h1>
          <div className="flex justify-center gap-4 mb-6">
            <Button
              variant={ageGroup === '6-9' ? 'default' : 'outline'}
              onClick={() => setAgeGroup('6-9')}
            >
              Ages 6-9
            </Button>
            <Button
              variant={ageGroup === '10-14' ? 'default' : 'outline'}
              onClick={() => setAgeGroup('10-14')}
            >
              Ages 10-14
            </Button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">⭐</span>
            <span className="text-xl font-semibold">Score: {score}</span>
          </div>
        </div>

        {loading || !correctWord ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Card className="card-elevated animate-fade-in">
            <CardHeader>
              <CardTitle className="text-center">
                Question {currentQuestion + 1} of {quizWords.length}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-xl text-muted-foreground">Which image shows:</p>
                <h2 className="text-3xl font-bold text-primary">{correctWord.toto}</h2>
                <p className="text-xl">{correctWord.english}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {quizWords.map((word) => (
                <button
                  key={word.id}
                  onClick={() => handleAnswer(word.id)}
                  disabled={selectedAnswer !== null}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedAnswer === word.id
                      ? word.id === correctWord.id
                        ? 'border-success bg-success/10'
                        : 'border-destructive bg-destructive/10'
                      : 'border-border hover:border-primary hover:scale-105'
                  }`}
                >
                  <img
                    src={word.imageUrl}
                    alt="Quiz option"
                    className="w-full aspect-square object-contain rounded"
                  />
                </button>
              ))}
            </div>

              {showResult && (
                <div className="text-center animate-celebration">
                  <Star className="h-16 w-16 text-celebration mx-auto mb-2 celebration-star" />
                  <p className="text-2xl font-bold text-success">Correct! 🎉</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
