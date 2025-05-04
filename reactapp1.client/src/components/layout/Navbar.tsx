
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Search, Heart } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { searchClubs } from "@/data/clubData";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import ClubList from "@/components/clubs/ClubList";
import CartButton from "@/components/cart/CartButton";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ firstName: string; lastName: string; email: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const userJSON = localStorage.getItem("partyUser");
      if (userJSON) {
        setUser(JSON.parse(userJSON));
      }
    }
    
    // Check scroll position to change navbar style
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginClick = () => {
    setAuthModalTab("login");
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthModalTab("register");
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearchDialogOpen(true);
    }
  };

  const getUserInitials = () => {
    if (!user) return "?";
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/90 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold gradient-heading">Cluj Party Mapster</span>
          </Link>
          
          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex relative max-w-md w-full mx-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search for clubs or events..." 
              className="pl-10 bg-muted/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Liked Events Button */}
                <Button variant="ghost" asChild className="hidden md:flex">
                  <Link to="/favorites">
                    <Heart className="mr-2 h-4 w-4 text-party" />
                    Liked Events
                  </Link>
                </Button>
                
                <Button variant="ghost" asChild>
                  <Link to="/map">Party Map</Link>
                </Button>
                
                {/* Cart Button - Added here */}
                <CartButton />
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    {user && (
                      <DropdownMenuLabel className="font-normal text-sm text-muted-foreground">
                        {user.email}
                      </DropdownMenuLabel>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/favorites">Favorite Clubs</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                {/* Show cart button even when not logged in */}
                <CartButton />
                
                <Button variant="ghost" onClick={handleLoginClick}>
                  Log in
                </Button>
                <Button className="party-button" onClick={handleRegisterClick}>
                  Register
                </Button>
              </>
            )}
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />

      {/* Search Results Dialog */}
      <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
        <DialogContent className="sm:max-w-[80%] max-h-[80vh] p-0">
          <div className="p-4 border-b">
            <h2 className="text-2xl font-semibold">Search Results for "{searchTerm}"</h2>
          </div>
          <div className="max-h-[70vh] overflow-auto">
            <ClubList initialSearchTerm={searchTerm} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
