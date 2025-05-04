
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useToast } from "@/components/ui/use-toast";
import { clubData } from "@/data/clubData";

interface MapInitializerProps {
  mapContainer: React.RefObject<HTMLDivElement>;
  onMapInitialized: (map: mapboxgl.Map) => void;
  onMapError: () => void;
  mapboxToken: string;
}

const MapInitializer: React.FC<MapInitializerProps> = ({ 
  mapContainer, 
  onMapInitialized, 
  onMapError,
  mapboxToken 
}) => {
  const map = useRef<mapboxgl.Map | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize map when the component mounts
    initializeMap();
    
    return () => {
      // Cleanup function
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);
  
  const initializeMap = () => {
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      // Cluj-Napoca coordinates
      const clujCoordinates = [23.6, 46.77];
      
      if (map.current) return; // Don't reinitialize if map exists
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: clujCoordinates,
        zoom: 13,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      map.current.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }));

      // Once map is loaded, pass it to the parent component
      map.current.on("load", () => {
        if (map.current) {
          onMapInitialized(map.current);
          
          toast({
            title: "Map loaded successfully",
            description: "You can now explore clubs around Cluj-Napoca",
          });
        }
      });
      
      map.current.on("error", (e) => {
        console.error("Mapbox error:", e);
        onMapError();
        
        toast({
          variant: "destructive",
          title: "Map Error",
          description: "Could not initialize map properly. You might need to provide a valid Mapbox token.",
        });
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      onMapError();
      
      toast({
        variant: "destructive",
        title: "Map Error",
        description: "Could not initialize map. Please check your Mapbox token.",
      });
    }
  };

  return null; // This component doesn't render anything
};

export default MapInitializer;
