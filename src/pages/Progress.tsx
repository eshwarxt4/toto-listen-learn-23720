import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Star, Flame, Download } from "lucide-react";
import { UserProgress } from "@/types/content";

export default function Progress() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<UserProgress>({
    learnedWords: [],
    completedStories: [],
    totalStars: 0,
    streak: 0,
    lastActive: new Date().toISOString(),
    badges: []
  });

  useEffect(() => {
    // Load progress from localStorage
    const learnedWords = JSON.parse(localStorage.getItem('learnedWords') || '[]');
    const totalStars = parseInt(localStorage.getItem('totalStars') || '0');
    const streak = parseInt(localStorage.getItem('streak') || '0');
    
    setProgress({
      learnedWords,
      completedStories: [],
      totalStars,
      streak,
      lastActive: new Date().toISOString(),
      badges: []
    });
  }, []);

  const exportProgress = () => {
    const dataStr = JSON.stringify(progress, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'toto-progress.json';
    link.click();
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
          <h1 className="text-4xl font-bold text-primary mb-2">Your Progress</h1>
          <p className="text-muted-foreground">Track your learning journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="card-elevated">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 text-success mx-auto mb-3" />
              <p className="text-3xl font-bold mb-1">{progress.totalStars}</p>
              <p className="text-muted-foreground">Total Stars</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6 text-center">
              <Flame className="h-12 w-12 text-accent mx-auto mb-3" />
              <p className="text-3xl font-bold mb-1">{progress.streak}</p>
              <p className="text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6 text-center">
              <Star className="h-12 w-12 text-celebration mx-auto mb-3" />
              <p className="text-3xl font-bold mb-1">{progress.learnedWords.length}</p>
              <p className="text-muted-foreground">Words Learned</p>
            </CardContent>
          </Card>
        </div>

        <Card className="card-elevated mb-6">
          <CardHeader>
            <CardTitle>Learning Tree</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-end gap-2 h-48">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-8 rounded-t-lg transition-all ${
                    i < progress.learnedWords.length
                      ? 'bg-secondary'
                      : 'bg-muted'
                  }`}
                  style={{ height: `${(i + 1) * 10 + 20}%` }}
                />
              ))}
            </div>
            <div className="progress-bar mt-6">
              <div
                className="progress-fill"
                style={{ width: `${Math.min((progress.learnedWords.length / 20) * 100, 100)}%` }}
              />
            </div>
            <p className="text-center mt-2 text-sm text-muted-foreground">
              {progress.learnedWords.length} / 20 words mastered
            </p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Export Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Download your progress data for teacher records
            </p>
            <Button onClick={exportProgress} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export as JSON
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
