import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MapPage from "./pages/MapPage";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

import ErrorBoundary from "@/components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/favorites" element={<NotFound />} />
                <Route path="/profile" element={<NotFound />} />
                <Route path="/contact" element={<NotFound />} />
                <Route path="/faq" element={<NotFound />} />
                <Route path="/cookies" element={<NotFound />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
