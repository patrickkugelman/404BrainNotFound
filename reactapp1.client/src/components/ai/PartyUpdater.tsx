
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { checkAndUpdateParties, updatePartiesWithAI, PartyUpdateInfo } from "@/utils/aiPartyUpdater";
import { RefreshCw } from "lucide-react";

export const PartyUpdater = () => {
  const { toast } = useToast();
  const [lastUpdate, setLastUpdate] = useState<PartyUpdateInfo>({
    lastUpdated: "never",
    changedClubs: []
  });
  const [isUpdating, setIsUpdating] = useState(false);

  // Check for updates when the component mounts
  useEffect(() => {
    const updateInfo = checkAndUpdateParties();
    setLastUpdate(updateInfo);
  }, []);

  const handleManualUpdate = () => {
    setIsUpdating(true);
    
    // Simulate a delay for the AI processing
    setTimeout(() => {
      const updateInfo = updatePartiesWithAI();
      setLastUpdate(updateInfo);
      
      // Show toast with results
      if (updateInfo.changedClubs.length > 0) {
        toast({
          title: "Party Updates!",
          description: `${updateInfo.changedClubs.length} clubs have updated their party status.`,
          duration: 5000,
        });
      } else {
        toast({
          title: "No Changes",
          description: "Our AI didn't find any clubs to update today.",
          duration: 3000,
        });
      }
      
      setIsUpdating(false);
      
      // Trigger page reload to update the map and club lists
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="flex items-center gap-2 p-2 text-sm bg-background/80 backdrop-blur-sm rounded-lg border border-muted">
      <div className="flex flex-col">
        <span className="font-medium">AI Party Updates</span>
        <span className="text-xs text-muted-foreground">
          Last updated: {lastUpdate.lastUpdated === "never" ? "Never" : new Date(lastUpdate.lastUpdated).toLocaleDateString()}
        </span>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleManualUpdate} 
        disabled={isUpdating}
      >
        {isUpdating ? (
          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <RefreshCw className="h-4 w-4 mr-2" />
        )}
        {isUpdating ? "Updating..." : "Update Now"}
      </Button>
    </div>
  );
};

export default PartyUpdater;
