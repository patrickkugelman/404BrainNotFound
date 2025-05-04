import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getFavoriteClubDetails } from "@/data/clubData";
import { Club } from "@/data/clubData";
import { Heart, Camera, User, Star, Music, Ticket } from "lucide-react";

interface UserData {
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
}

const UserProfile = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData>({
    name: "Club Enthusiast",
    email: "user@example.com",
    phone: "+40 123 456 789",
    profilePicture: ""
  });
  const [favoriteClubs, setFavoriteClubs] = useState<Club[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<UserData>(userData);
  
  useEffect(() => {
    const favorites = getFavoriteClubDetails();
    setFavoriteClubs(favorites);
    
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
      setEditedData(JSON.parse(savedUserData));
    }
  }, []);
  
  const handleProfileUpdate = () => {
    setUserData(editedData);
    localStorage.setItem("userData", JSON.stringify(editedData));
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully",
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setEditedData({ ...editedData, profilePicture: result });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const cancelEditing = () => {
    setEditedData(userData);
    setIsEditing(false);
  };
  
  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <Tabs defaultValue="details">
        <TabsList className="mb-6">
          <TabsTrigger value="details">Profile Details</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Manage your profile details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={isEditing ? editedData.profilePicture : userData.profilePicture} />
                    <AvatarFallback className="text-2xl bg-party">
                      {userData.name?.charAt(0) || <User />}
                    </AvatarFallback>
                  </Avatar>
                  
                  {isEditing && (
                    <div className="absolute -bottom-2 -right-2">
                      <Label htmlFor="profile-image" className="cursor-pointer">
                        <div className="h-8 w-8 rounded-full bg-party flex items-center justify-center text-white">
                          <Camera className="h-4 w-4" />
                        </div>
                      </Label>
                      <Input 
                        id="profile-image" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload}
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{userData.name}</h3>
                  <p className="text-muted-foreground">{userData.email}</p>
                </div>
                
                {!isEditing && (
                  <Button 
                    variant="outline" 
                    className="ml-auto"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={editedData.name} 
                        onChange={(e) => setEditedData({...editedData, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={editedData.email} 
                        onChange={(e) => setEditedData({...editedData, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={editedData.phone} 
                        onChange={(e) => setEditedData({...editedData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={cancelEditing}>Cancel</Button>
                    <Button onClick={handleProfileUpdate} className="party-button">Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                    <p>{userData.phone}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Member Since</h3>
                    <p>April 2023</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Favorite Music</h3>
                    <p>House, Techno, EDM</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Favorite Clubs</h3>
                    <p>{favoriteClubs.length} clubs</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Clubs</CardTitle>
              <CardDescription>Your saved favorite clubs in Cluj</CardDescription>
            </CardHeader>
            <CardContent>
              {favoriteClubs.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-10 w-10 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">You haven't added any favorite clubs yet.</p>
                  <p className="text-sm text-muted-foreground">Browse clubs and click the heart icon to add them to your favorites.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favoriteClubs.map((club) => (
                    <Card key={club.id} className="overflow-hidden">
                      <div className="h-36 relative">
                        <img 
                          src={club.image} 
                          alt={club.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="font-semibold">{club.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-background/30 backdrop-blur-sm text-xs">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" /> {club.rating}
                            </Badge>
                            {club.activeParty && (
                              <Badge className="bg-party text-xs">
                                <Music className="h-3 w-3 mr-1" /> Active
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>My Tickets</CardTitle>
              <CardDescription>Upcoming events you've purchased tickets for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Ticket className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">You don't have any tickets yet.</p>
                <p className="text-sm text-muted-foreground">Buy tickets for upcoming events to see them here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
