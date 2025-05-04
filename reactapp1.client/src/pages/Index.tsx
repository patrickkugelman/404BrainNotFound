
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import AuthModal from "@/components/auth/AuthModal";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("register");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    // If already logged in, redirect to map
    if (loggedIn) {
      navigate("/map");
    }
  }, [navigate]);

  const handleGetStarted = () => {
    setAuthModalTab("register");
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto pt-24 px-4">
        <section className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center text-center py-12">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight gradient-heading animate-float">
              Discover Cluj's Best Parties
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your interactive map to the hottest clubs and events in Cluj-Napoca. 
              Never miss a party again!
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button className="party-button text-lg py-6 px-8" onClick={handleGetStarted}>
                Get Started
              </Button>
            </div>
            
            <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <FeatureCard 
                title="Live Map" 
                description="Interactive map showing all clubs and active parties in Cluj-Napoca."
                icon="🗺️"
              />
              <FeatureCard 
                title="Real-Time Updates" 
                description="Get notified about new events and parties as they're announced."
                icon="⏱️"
              />
              <FeatureCard 
                title="Party Finder" 
                description="Find the perfect party based on music style, location, and more."
                icon="🔍"
              />
            </div>
          </div>
        </section>
      </main>
      
      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
        onSuccess={() => navigate("/map")}
      />
    </div>
  );
};

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => {
  return (
    <div className="p-6 rounded-lg border border-muted bg-card/30 backdrop-blur-sm hover:neon-border transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
