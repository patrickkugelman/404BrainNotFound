
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Club } from "@/data/clubData";
import { useToast } from "@/components/ui/use-toast";

interface MapMarkerManagerProps {
  map: mapboxgl.Map | null;
  clubs: Club[];
}

const MapMarkerManager = ({ map, clubs }: MapMarkerManagerProps) => {
  const markers = useRef<mapboxgl.Marker[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!map) return;
    
    // Clear existing markers when clubs change
    clearMarkers();
    
    // Add club markers
    addClubMarkers();
    
  }, [map, clubs]);

  const clearMarkers = () => {
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
  };

  const addClubMarkers = () => {
    if (!map) return;
    
    // Add club markers
    clubs.forEach(club => {
      // Create custom element for marker
      const el = document.createElement("div");
      el.className = `w-6 h-6 ${club.activeParty ? 'bg-party' : 'bg-club'} rounded-full flex items-center justify-center ${club.activeParty ? 'animate-pulse-glow' : ''} cursor-pointer`;
      
      // For clubs with active parties, add a special icon or additional visual cue
      if (club.activeParty) {
        const innerEl = document.createElement("div");
        innerEl.className = "w-4 h-4 bg-white/30 rounded-full flex items-center justify-center";
        innerEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>';
        el.appendChild(innerEl);
      }
      
      // Create marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([club.lng, club.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="text-lg font-bold">${club.name}</h3>
                <p class="text-sm">${club.address}</p>
                ${club.activeParty ? 
                  `<p class="text-sm font-bold text-party">🎉 Active party tonight!</p>` : 
                  ''}
                <p class="text-sm"><strong>Music:</strong> ${club.musicGenres.join(', ')}</p>
                <p class="text-sm"><strong>Party Type:</strong> ${club.partyType}</p>
                <p class="text-sm"><strong>Rating:</strong> ${club.rating}/5</p>
                <p class="text-sm"><strong>Hours:</strong> ${club.openingHours}</p>
              </div>
            `)
        )
        .addTo(map);
      
      markers.current.push(marker);
    });
  };

  return null; // This is a functional component with no UI
};

export default MapMarkerManager;
