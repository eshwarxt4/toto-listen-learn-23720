import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import mascotImage from "@/assets/toto-mascot.png";

export default function AboutToto() {
  const navigate = useNavigate();

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

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <img
            src={mascotImage}
            alt="Toto Mascot"
            className="w-32 h-32 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-primary mb-2">About the Toto Language</h1>
        </div>

        <Card className="card-elevated mb-6">
          <CardContent className="p-8 space-y-6 text-lg">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">The Toto Community</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Toto language is spoken by the Toto tribal community, one of the smallest and
                most endangered indigenous communities. The Toto people have a rich cultural heritage
                with unique traditions, folk stories, and songs that have been passed down through
                generations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">Language Preservation</h2>
              <p className="text-muted-foreground leading-relaxed">
                This educational platform is part of an effort to preserve and promote the Toto
                language for future generations. By making learning accessible and engaging,
                especially for children, we aim to keep this precious linguistic heritage alive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">Cultural Respect</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content in this app has been developed with deep respect for the Toto community,
                their traditions, and their language. We are grateful to the elders, speakers, and
                community members who have contributed to this project.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">How You Can Help</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you are interested in supporting Toto language preservation efforts, consider:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                <li>Sharing this app with others who might benefit</li>
                <li>Encouraging children to practice regularly</li>
                <li>Respecting and celebrating indigenous languages</li>
                <li>Supporting language documentation and education initiatives</li>
              </ul>
            </section>

            <section className="bg-muted/50 p-6 rounded-lg">
              <p className="text-sm text-center italic text-muted-foreground">
                "When we lose a language, we lose a unique worldview, a piece of human knowledge,
                and centuries of accumulated wisdom."
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
