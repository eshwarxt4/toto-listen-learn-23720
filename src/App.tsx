import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import WordDetail from "./pages/WordDetail";
import Words from "./pages/Words";
import Stories from "./pages/Stories";
import StoryViewer from "./pages/StoryViewer";
import Quizzes from "./pages/Quizzes";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import AboutToto from "./pages/AboutToto";
import Cultural from "./pages/Cultural";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/word/:id" element={<WordDetail />} />
          <Route path="/words" element={<Words />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/story/:id" element={<StoryViewer />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<AboutToto />} />
          <Route path="/cultural" element={<Cultural />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
