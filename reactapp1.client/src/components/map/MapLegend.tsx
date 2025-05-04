
import React from "react";

const MapLegend: React.FC = () => {
  return (
    <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-muted z-10">
      <h3 className="text-sm font-medium mb-2">Map Legend</h3>
      <div className="flex items-center mb-1">
        <div className="w-4 h-4 rounded-full bg-party mr-2 animate-pulse-glow"></div>
        <span className="text-xs">Active party (AI updated daily)</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 rounded-full bg-club mr-2"></div>
        <span className="text-xs">Inactive club</span>
      </div>
    </div>
  );
};

export default MapLegend;
