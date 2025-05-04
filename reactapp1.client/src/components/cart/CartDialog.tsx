
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDialog = ({ open, onOpenChange }: CartDialogProps) => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleCheckout = () => {
    setIsProcessing(true);
    
    // Simulate a checkout process
    setTimeout(() => {
      toast({
        title: "Purchase complete!",
        description: `Your ${items.length > 1 ? 'tickets have' : 'ticket has'} been successfully purchased.`,
      });
      clearCart();
      setIsProcessing(false);
      onOpenChange(false);
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[350px]">
          <DialogHeader>
            <DialogTitle>Your Cart</DialogTitle>
            <DialogDescription>Your shopping cart is currently empty.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
          <DialogDescription>Review your items before checkout.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.clubId} className="flex items-center justify-between py-2">
              <div className="flex-1 mr-2">
                <h4 className="font-medium text-sm">{item.clubName}</h4>
                <p className="text-xs text-muted-foreground">
                  {item.price} RON × {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => updateQuantity(item.clubId, Math.max(1, item.quantity - 1))}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-5 text-center text-sm">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => updateQuantity(item.clubId, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeFromCart(item.clubId)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
          <div className="border-t pt-3">
            <div className="flex justify-between mb-3">
              <span className="font-medium">Total</span>
              <span className="font-bold">{total} RON</span>
            </div>
            <Button 
              className="w-full party-button" 
              onClick={handleCheckout} 
              disabled={isProcessing}
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4 mr-1" /> Proceed to Checkout
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
