
export interface Club {
  id: string;
  name: string;
  description: string;
  address: string;
  lat: number; // Will map to Latitude in the backend
  lng: number; // Will map to Longitude in the backend
  activeParty: boolean;
  rating: number;
  openingHours: string;
  image?: string;
  musicGenres: string[];
  partyType: "Regular" | "Students" | "Themed" | "Live Music" | "EDM";
}

// This is how the Club model maps to the ASP.NET backend model
export interface AspNetClub {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number; // Maps to lat in our frontend
  longitude: number; // Maps to lng in our frontend
  activeParty: boolean;
  rating: number;
  openingHours: string;
  image?: string;
  musicGenres: string[];
  partyType: string;
}

// Utility functions for converting between frontend and backend models
export function toFrontendClub(backendClub: AspNetClub): Club {
  return {
    id: backendClub.id,
    name: backendClub.name,
    description: backendClub.description,
    address: backendClub.address,
    lat: backendClub.latitude,
    lng: backendClub.longitude,
    activeParty: backendClub.activeParty,
    rating: backendClub.rating,
    openingHours: backendClub.openingHours,
    image: backendClub.image,
    musicGenres: backendClub.musicGenres,
    partyType: backendClub.partyType as "Regular" | "Students" | "Themed" | "Live Music" | "EDM",
  };
}

export function toBackendClub(frontendClub: Club): AspNetClub {
  return {
    id: frontendClub.id,
    name: frontendClub.name,
    description: frontendClub.description,
    address: frontendClub.address,
    latitude: frontendClub.lat,
    longitude: frontendClub.lng,
    activeParty: frontendClub.activeParty,
    rating: frontendClub.rating,
    openingHours: frontendClub.openingHours,
    image: frontendClub.image,
    musicGenres: frontendClub.musicGenres,
    partyType: frontendClub.partyType,
  };
}
