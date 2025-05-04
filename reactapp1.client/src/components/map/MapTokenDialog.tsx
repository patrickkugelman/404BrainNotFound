
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { saveMapboxToken } from "@/utils/mapboxToken";

interface MapTokenDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onTokenSubmit: () => void;
}

const MapTokenDialog: React.FC<MapTokenDialogProps> = ({ 
  isOpen, 
  onOpenChange,
  onTokenSubmit
}) => {
  const [mapboxToken, setMapboxToken] = useState("");
  const { toast } = useToast();

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mapboxToken) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a Mapbox token",
      });
      return;
    }
    
    saveMapboxToken(mapboxToken);
    onTokenSubmit();
    
    toast({
      title: "Success",
      description: "Mapbox token saved successfully",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mapbox Token Required</DialogTitle>
          <DialogDescription>
            Please enter your Mapbox token to enable the map functionality.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleTokenSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mapbox-token">Enter your Mapbox token</Label>
            <Input
              id="mapbox-token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              placeholder="pk.eyJ1Ijoi..."
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              You can get a token from <a href="https://account.mapbox.com" target="_blank" rel="noopener noreferrer" className="underline">Mapbox</a>
            </p>
          </div>
          <Button type="submit" className="w-full">Save Token</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MapTokenDialog;
