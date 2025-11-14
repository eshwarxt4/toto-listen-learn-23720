import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Music, BookOpen } from "lucide-react";

export default function Cultural() {
  const navigate = useNavigate();

  const culturalItems = [
    {
      id: 'folk_001',
      type: 'story',
      title: 'The Wise Owl and the River',
      description: 'A traditional Toto folk story about wisdom and nature',
      duration: '3 min',
      icon: BookOpen
    },
    {
      id: 'folk_002',
      type: 'story',
      title: 'The Mountain Spirit',
      description: 'An ancient tale passed down through generations',
      duration: '4 min',
      icon: BookOpen
    },
    {
      id: 'song_001',
      type: 'song',
      title: 'Harvest Song',
      description: 'Traditional Toto song sung during harvest season',
      duration: '2 min',
      icon: Music
    },
    {
      id: 'song_002',
      type: 'song',
      title: 'Children\'s Play Song',
      description: 'A joyful song children sing while playing',
      duration: '2 min',
      icon: Music
    }
  ];

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
          <h1 className="text-4xl font-bold text-primary mb-2">Cultural Corner</h1>
          <p className="text-lg text-muted-foreground">
            Explore traditional Toto folk stories and songs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {culturalItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                className="card-elevated hover:scale-105 transition-transform animate-slide-in"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-secondary/20">
                      <Icon className="h-8 w-8 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary font-medium">
                          Duration: {item.duration}
                        </span>
                        <span className="text-xs bg-muted px-2 py-1 rounded">
                          {item.type === 'story' ? 'Folk Story' : 'Traditional Song'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      🇹 Play Toto
                    </Button>
                    <Button variant="secondary" className="flex-1" size="sm">
                      🇬 Play English
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Audio recordings coming soon
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

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
