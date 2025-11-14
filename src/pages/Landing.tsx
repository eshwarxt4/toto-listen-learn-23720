import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, GraduationCap, ChevronRight, ChevronLeft } from "lucide-react";
import mascotImage from "@/assets/toto-mascot.png";

const tutorialSteps = [
  {
    title: "Play Audio",
    description: "Tap the Toto or English buttons to hear words and stories in both languages",
    icon: "🎵"
  },
  {
    title: "Learn Stories",
    description: "Explore fun stories about science, culture, and general knowledge",
    icon: "📚"
  },
  {
    title: "Take Quizzes",
    description: "Test your knowledge and earn stars for correct answers",
    icon: "⭐"
  }
];

export default function Landing() {
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  const handleStart = (role: 'child' | 'teacher') => {
    localStorage.setItem('userRole', role);
    setShowTutorial(true);
  };

  const handleSkipTutorial = () => {
    navigate('/dashboard');
  };

  const handleNextStep = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handlePrevStep = () => {
    if (tutorialStep > 0) {
      setTutorialStep(tutorialStep - 1);
    }
  };

  if (showTutorial) {
    const step = tutorialSteps[tutorialStep];
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
        <Card className="max-w-2xl w-full animate-slide-in">
          <CardContent className="p-8 space-y-6">
            <div className="text-6xl text-center">{step.icon}</div>
            <h2 className="text-3xl font-bold text-center text-primary">{step.title}</h2>
            <p className="text-lg text-center text-muted-foreground">{step.description}</p>
            
            <div className="flex items-center justify-between gap-4 pt-4">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={tutorialStep === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              <div className="flex gap-2">
                {tutorialSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === tutorialStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <Button onClick={handleNextStep}>
                {tutorialStep === tutorialSteps.length - 1 ? 'Start Learning' : 'Next'}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <Button
              variant="ghost"
              onClick={handleSkipTutorial}
              className="w-full"
            >
              Skip Tutorial
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
      <Card className="max-w-2xl w-full animate-fade-in">
        <CardContent className="p-8 space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={mascotImage}
              alt="Toto the Owl"
              className="w-48 h-48 object-contain animate-bounce-subtle"
            />
            <h1 className="text-4xl font-bold text-center text-primary">
              Welcome to Toto Infotainment
            </h1>
            <p className="text-lg text-center text-muted-foreground max-w-md">
              Learn the Toto language through fun stories, games, and cultural content
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => handleStart('child')}
              size="lg"
              className="w-full text-lg py-6"
            >
              <User className="h-6 w-6 mr-3" />
              Start as Child
            </Button>

            <Button
              onClick={() => handleStart('teacher')}
              size="lg"
              variant="secondary"
              className="w-full text-lg py-6"
            >
              <GraduationCap className="h-6 w-6 mr-3" />
              Start as Teacher/Parent
            </Button>
          </div>

          <p className="text-sm text-center text-muted-foreground">
            Choose your role to begin your learning journey
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
