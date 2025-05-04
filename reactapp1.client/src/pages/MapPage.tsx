
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import MapComponent from "@/components/map/MapComponent";
import HorizontalClubList from "@/components/clubs/HorizontalClubList";
import CarouselClubList from "@/components/clubs/CarouselClubList";
import RequireAuth from "@/components/auth/RequireAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Map, User, Heart } from "lucide-react";
import { getClubsByMusicGenre, getClubsByPartyType, getFavoriteClubDetails } from "@/data/clubData";
import UserProfile from "@/components/profile/UserProfile";
import Footer from "@/components/layout/Footer";

const MapPage = () => {
  const [activeTab, setActiveTab] = useState<string>("partyType");
  const [mapOpen, setMapOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const clubsByMusicGenre = getClubsByMusicGenre();
  const clubsByPartyType = getClubsByPartyType();
  const favoriteClubs = getFavoriteClubDetails();
  
  // Detect scroll position and update active tab
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const scrollPosition = contentRef.current.scrollTop;
      const threshold = 300; // Adjust based on your layout
      
      if (scrollPosition < threshold && activeTab !== "partyType") {
        setActiveTab("partyType");
      } else if (scrollPosition >= threshold && activeTab !== "musicGenre") {
        setActiveTab("musicGenre");
      }
    };
    
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
    }
    
    return () => {
      if (contentElement) {
        contentElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [activeTab]);
  
  // Scroll to the appropriate section when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (!contentRef.current) return;
    
    if (value === "partyType") {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else if (value === "musicGenre") {
      contentRef.current.scrollTo({ top: 400, behavior: "smooth" }); // Adjust based on your layout
    } else if (value === "favorites") {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  return (
    <RequireAuth>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="pt-16 flex-1 flex flex-col overflow-hidden">
          {/* Map Button - Fixed position */}
          <div className="fixed bottom-6 right-6 z-10 flex flex-col gap-2">
            <Button 
              size="lg" 
              className="rounded-full shadow-lg bg-party hover:bg-party/90 flex items-center gap-2"
              onClick={() => setMapOpen(true)}
            >
              <Map className="h-5 w-5" />
              <span>Map View</span>
            </Button>
            
            <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="rounded-full shadow-lg bg-secondary hover:bg-secondary/90 flex items-center gap-2"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
                <UserProfile />
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Content Selection Tabs */}
          <div className="w-full bg-muted/30 backdrop-blur-sm border-y border-muted p-2 sticky top-16 z-10">
            <Tabs defaultValue="partyType" value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="mx-auto">
                <TabsTrigger value="partyType">Party Types</TabsTrigger>
                <TabsTrigger value="musicGenre">Music Genres</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Scrollable Content Area */}
          <div 
            ref={contentRef}
            className="flex-1 overflow-y-auto bg-gradient-to-b from-background/90 to-background"
          >
            <div className="p-4 space-y-12">
              {/* Party Types Section */}
              {activeTab === "partyType" && (
                <div id="partyType-section" className="space-y-12">
                  {clubsByPartyType.map(({ partyType, clubs }, index) => 
                    index === 0 ? (
                      <CarouselClubList
                        key={partyType}
                        title={partyType}
                        clubs={clubs}
                      />
                    ) : (
                      <HorizontalClubList 
                        key={partyType} 
                        title={partyType} 
                        clubs={clubs} 
                      />
                    )
                  )}
                </div>
              )}
              
              {/* Music Genres Section */}
              {activeTab === "musicGenre" && (
                <div id="musicGenre-section" className="space-y-12 pt-8">
                  {clubsByMusicGenre.map(({ genre, clubs }, index) => 
                    index === 0 ? (
                      <CarouselClubList
                        key={genre}
                        title={genre}
                        clubs={clubs}
                      />
                    ) : (
                      <HorizontalClubList 
                        key={genre} 
                        title={genre} 
                        clubs={clubs} 
                      />
                    )
                  )}
                </div>
              )}
              
              {/* Favorites Section */}
              {activeTab === "favorites" && (
                <div id="favorites-section" className="space-y-12 pt-8">
                  {favoriteClubs.length > 0 ? (
                    <CarouselClubList
                      title="Your Favorite Clubs"
                      clubs={favoriteClubs}
                    />
                  ) : (
                    <div className="text-center py-16">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                        <Heart className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h2 className="mt-4 text-xl font-semibold">No Favorites Yet</h2>
                      <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                        You haven't added any clubs to your favorites. Click the heart icon on any club card to save it here.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <Footer />
        </main>
        
        {/* Map Dialog */}
        <Dialog open={mapOpen} onOpenChange={setMapOpen}>
          <DialogContent className="max-w-5xl h-[80vh] p-0 overflow-hidden">
            <MapComponent />
          </DialogContent>
        </Dialog>
      </div>
    </RequireAuth>
  );
};

export default MapPage;
