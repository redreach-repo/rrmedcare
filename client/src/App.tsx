import { Switch, Route, Router, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Chatbot } from "@/components/chatbot";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Hospitals from "@/pages/hospitals";
import Estimate from "@/pages/estimate";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import Admin from "@/pages/admin";

function ChatbotWrapper() {
  const [location] = useLocation();
  // Only show chatbot on patient-facing pages, not admin
  if (location.startsWith("/admin")) return null;
  return <Chatbot />;
}

function AppRouter() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/hospitals" component={Hospitals} />
        <Route path="/estimate" component={Estimate} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
      <ChatbotWrapper />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router hook={useHashLocation}>
            <AppRouter />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
