
import { clubData, Club } from "@/data/clubData";
import { toast } from "@/hooks/use-toast";

const LOCAL_STORAGE_KEY = "last_party_update";
const LOCAL_STORAGE_CLUBS_KEY = "club_data";

export interface PartyUpdateInfo {
  lastUpdated: string;
  changedClubs: string[];
}

/**
 * Updates club parties based on an "AI algorithm" (simulated)
 * This function simulates what would typically happen with a real backend
 */
export const updatePartiesWithAI = (): PartyUpdateInfo => {
  // Get the current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Check if we already updated today
  const lastUpdate = localStorage.getItem(LOCAL_STORAGE_KEY);
  const storedClubs = localStorage.getItem(LOCAL_STORAGE_CLUBS_KEY);
  
  let currentClubs: Club[] = [];
  
  // If we have stored clubs, use them as the base, otherwise use the default data
  if (storedClubs) {
    currentClubs = JSON.parse(storedClubs);
  } else {
    currentClubs = [...clubData];
  }
  
  // If we already updated today, return the last update info
  if (lastUpdate === today) {
    return {
      lastUpdated: today,
      changedClubs: []
    };
  }
  
  // Simulate AI algorithm that decides which parties are active
  // In a real app, this would be a backend API call to a real AI model
  const changedClubs: string[] = [];
  
  currentClubs = currentClubs.map(club => {
    // Simple "AI" algorithm:
    // 1. 30% chance to change party status
    // 2. Higher rated clubs (4.5+) have a 60% chance to have parties
    // 3. Weekend days have higher chance of parties
    const shouldChange = Math.random() < 0.3;
    
    if (shouldChange) {
      const isWeekend = [0, 5, 6].includes(new Date().getDay());
      const isHighRated = club.rating >= 4.5;
      
      // Calculate probability of having a party
      let partyProbability = 0.3; // base probability
      
      if (isWeekend) partyProbability += 0.3;
      if (isHighRated) partyProbability += 0.3;
      
      const newActiveParty = Math.random() < partyProbability;
      
      if (newActiveParty !== club.activeParty) {
        changedClubs.push(club.name);
      }
      
      return {
        ...club,
        activeParty: newActiveParty
      };
    }
    
    return club;
  });
  
  // Save the updated clubs and last update date
  localStorage.setItem(LOCAL_STORAGE_CLUBS_KEY, JSON.stringify(currentClubs));
  localStorage.setItem(LOCAL_STORAGE_KEY, today);
  
  return {
    lastUpdated: today,
    changedClubs
  };
};

/**
 * Gets the current club data, either from localStorage or the default data
 */
export const getCurrentClubData = (): Club[] => {
  const storedClubs = localStorage.getItem(LOCAL_STORAGE_CLUBS_KEY);
  
  if (storedClubs) {
    return JSON.parse(storedClubs);
  }
  
  return clubData;
};

/**
 * Checks if parties need updating and updates them if needed
 */
export const checkAndUpdateParties = (): PartyUpdateInfo => {
  const today = new Date().toISOString().split('T')[0];
  const lastUpdate = localStorage.getItem(LOCAL_STORAGE_KEY);
  
  // If we haven't updated today, update the parties
  if (lastUpdate !== today) {
    const updateInfo = updatePartiesWithAI();
    
    if (updateInfo.changedClubs.length > 0) {
      toast({
        title: "Party Updates!",
        description: `${updateInfo.changedClubs.length} clubs have updated their party status for today.`,
        duration: 5000,
      });
    }
    
    return updateInfo;
  }
  
  return {
    lastUpdated: lastUpdate || "never",
    changedClubs: []
  };
};

