
import { useState, useEffect } from "react";
import { Club, searchClubs } from "@/data/clubData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Music, Star, Clock } from "lucide-react";

interface ClubListProps {
  initialSearchTerm?: string;
}

const ClubList = ({ initialSearchTerm = "" }: ClubListProps) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  
  // Effect to handle search
  useEffect(() => {
    const results = searchClubs(searchTerm);
    setFilteredClubs(results);
  }, [searchTerm]);

  return (
    <div className="h-full w-full flex flex-col p-4 overflow-auto">
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search clubs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-muted"
        />
      </div>
      
      <div className="space-y-4 overflow-y-auto">
        {filteredClubs.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No clubs found</p>
        ) : (
          filteredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))
        )}
      </div>
    </div>
  );
};

const ClubCard = ({ club }: { club: Club }) => {
  return (
    <Card className="border-muted hover:neon-border transition-all duration-300 overflow-hidden">
      {club.image && (
        <div className="w-full h-40 overflow-hidden">
          <img 
            src={club.image} 
            alt={club.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      )}
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{club.name}</CardTitle>
          <div className="flex items-center text-sm">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span>{club.rating}</span>
          </div>
        </div>
        <CardDescription className="flex items-center text-sm">
          <MapPin className="h-3 w-3 mr-1" /> {club.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {club.activeParty && (
            <Badge className="bg-party hover:bg-party-dark">
              <Music className="h-3 w-3 mr-1" /> Active Party
            </Badge>
          )}
          <Badge variant="outline" className="flex items-center">
            <Clock className="h-3 w-3 mr-1" /> {club.openingHours}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{club.description}</p>
      </CardContent>
    </Card>
  );
};

export default ClubList;
