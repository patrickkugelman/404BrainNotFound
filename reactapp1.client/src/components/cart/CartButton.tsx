
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import CartDialog from "./CartDialog";

const CartButton = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="relative"
        onClick={() => setCartOpen(true)}
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-party text-white text-xs flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>
      <CartDialog open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
};

export default CartButton;
