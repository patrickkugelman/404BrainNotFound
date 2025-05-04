
import { useState, useEffect } from "react";
import { Club, addToFavorites, removeFromFavorites, isFavorite } from "@/data/clubData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Music, MapPin, Star, Clock, ArrowRight, Heart, Ticket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ClubDetailsDialog from "./ClubDetailsDialog";

interface FeaturedClubCardProps {
  club: Club;
}

const FeaturedClubCard = ({ club }: FeaturedClubCardProps) => {
  const { toast } = useToast();
  const [favorited, setFavorited] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  useEffect(() => {
    setFavorited(isFavorite(club.id));
  }, [club.id]);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorited) {
      removeFromFavorites(club.id);
      setFavorited(false);
      toast({
        title: "Removed from favorites",
        description: `${club.name} has been removed from your favorites`,
      });
    } else {
      addToFavorites(club.id);
      setFavorited(true);
      toast({
        title: "Added to favorites",
        description: `${club.name} has been added to your favorites`,
      });
    }
  };

  return (
    <>
      <Card 
        className="w-full border-0 overflow-hidden group transition-all duration-300 relative cursor-pointer" 
        onClick={() => setDetailsOpen(true)}
      >
        {club.image && (
          <div className="w-full h-[300px] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
            <img 
              src={club.image} 
              alt={club.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 z-20">
              <Button 
                variant="outline" 
                size="icon" 
                className={`rounded-full ${favorited ? 'bg-red-500 text-white border-none' : 'bg-background/30 backdrop-blur-sm'}`}
                onClick={handleFavoriteToggle}
              >
                <Heart className={`h-5 w-5 ${favorited ? 'fill-current' : ''}`} />
              </Button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h2 className="text-2xl font-bold mb-2">{club.name}</h2>
              
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="bg-background/30 backdrop-blur-sm">
                  <Star className="h-3 w-3 text-yellow-500 mr-1" /> {club.rating}
                </Badge>
                <Badge variant="outline" className="bg-background/30 backdrop-blur-sm">
                  <Clock className="h-3 w-3 mr-1" /> {club.openingHours}
                </Badge>
                {club.activeParty && (
                  <Badge className="bg-party">
                    <Music className="h-3 w-3 mr-1" /> Active Party
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 max-w-2xl line-clamp-2">
                {club.description}
              </p>
              
              <div className="space-y-2">
                <div>
                  <h3 className="text-sm font-medium uppercase text-muted-foreground mb-1">
                    Featured Artist
                  </h3>
                  <p className="text-lg">
                    Artist
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium uppercase text-muted-foreground mb-1">
                    Location
                  </h3>
                  <p className="text-sm flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> {club.address}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {club.musicGenres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Button className="party-button">
                  Learn More <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
                <Button variant="outline" className="bg-background/30 backdrop-blur-sm" onClick={() => setDetailsOpen(true)}>
                  <Ticket className="h-4 w-4 mr-1" /> Buy Tickets
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      <ClubDetailsDialog
        club={club}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
};

export default FeaturedClubCard;
