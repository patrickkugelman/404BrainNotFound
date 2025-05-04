
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Club } from "@/data/clubData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Music, Star, Clock, Ticket, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import CartDialog from "@/components/cart/CartDialog";

interface ClubDetailsDialogProps {
  club: Club;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ClubDetailsDialog = ({ club, open, onOpenChange }: ClubDetailsDialogProps) => {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(club, ticketQuantity);
    
    toast({
      title: "Added to cart",
      description: `${ticketQuantity} ticket${ticketQuantity > 1 ? 's' : ''} for ${club.name} have been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addToCart(club, ticketQuantity);
    
    // Close the current dialog first
    onOpenChange(false);
    
    // Set a small timeout to ensure the current dialog closes before opening the cart
    setTimeout(() => {
      setCartOpen(true);
    }, 100);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{club.name}</DialogTitle>
          </DialogHeader>
          
          {club.image && (
            <div className="w-full h-40 overflow-hidden rounded-lg">
              <img 
                src={club.image} 
                alt={club.name} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                <Star className="h-3 w-3 text-yellow-500 mr-1" /> {club.rating}
              </Badge>
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" /> {club.openingHours}
              </Badge>
              {club.activeParty && (
                <Badge className="bg-party">
                  <Music className="h-3 w-3 mr-1" /> Active Party
                </Badge>
              )}
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-1">Location</h3>
              <p className="text-sm flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" /> {club.address}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-1">Description</h3>
              <p className="text-sm text-muted-foreground">{club.description}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-1">Music Genres</h3>
              <div className="flex flex-wrap gap-1">
                {club.musicGenres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-3">
              <h3 className="text-lg font-medium mb-2">Buy Tickets</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium">Date</h4>
                  <p className="text-sm text-muted-foreground">This Friday, 10:00 PM</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Price</h4>
                  <p className="text-sm text-muted-foreground">50 RON per ticket</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Quantity</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                    >-</Button>
                    <span className="w-8 text-center">{ticketQuantity}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setTicketQuantity(ticketQuantity + 1)}
                    >+</Button>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Total</h4>
                  <p className="text-xl font-bold">{ticketQuantity * 50} RON</p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button onClick={handleAddToCart} className="w-full party-button">
                  <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleBuyNow}
                >
                  <Ticket className="h-4 w-4 mr-1" /> Buy Now
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <CartDialog open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
};

export default ClubDetailsDialog;
