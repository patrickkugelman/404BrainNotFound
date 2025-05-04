import { Injectable } from '@angular/core';
import { Club } from '../models/club.model';
import { BehaviorSubject } from 'rxjs';

export interface PartyUpdateInfo {
  lastUpdated: string;
  changedClubs: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PartyUpdaterService {
  private clubsData: Club[] = [];
  private clubsSubject = new BehaviorSubject<Club[]>([]);
  clubs$ = this.clubsSubject.asObservable();
  
  constructor() {
    this.loadClubs();
  }
  
  private loadClubs(): void {
    // In a real application, this might come from an API
    // For now, we'll simulate loading from localStorage as in the React version
    const savedData = localStorage.getItem('clubData');
    if (savedData) {
      this.clubsData = JSON.parse(savedData);
    } else {
      // Load initial data from wherever you store it in Angular
      // this.clubsData = initialClubData;
    }
    this.clubsSubject.next(this.clubsData);
  }
  
  checkAndUpdateParties(): PartyUpdateInfo {
    // Check if we need to update based on last update date
    const lastUpdate = localStorage.getItem('lastPartyUpdate');
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // If never updated or last updated before today
    if (!lastUpdate || lastUpdate < today) {
      return this.updatePartiesWithAI();
    }
    
    // Otherwise return last update info
    const lastUpdateInfo = localStorage.getItem('lastPartyUpdateInfo');
    return lastUpdateInfo ? JSON.parse(lastUpdateInfo) : { lastUpdated: lastUpdate, changedClubs: [] };
  }
  
  updatePartiesWithAI(): PartyUpdateInfo {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    // Simulate AI updating party statuses
    const updatedClubs = this.clubsData.map(club => {
      // AI simulation: 30% chance a club's party status changes
      if (Math.random() < 0.3) {
        return { ...club, activeParty: !club.activeParty };
      }
      return club;
    });
    
    // Find clubs that changed
    const changedClubs = updatedClubs
      .filter((updatedClub, index) => updatedClub.activeParty !== this.clubsData[index].activeParty)
      .map(club => club.name);
    
    // Save the updates
    this.clubsData = updatedClubs;
    this.clubsSubject.next(updatedClubs);
    localStorage.setItem('clubData', JSON.stringify(updatedClubs));
    localStorage.setItem('lastPartyUpdate', today);
    
    const updateInfo = {
      lastUpdated: now.toISOString(),
      changedClubs: changedClubs
    };
    localStorage.setItem('lastPartyUpdateInfo', JSON.stringify(updateInfo));
    
    return updateInfo;
  }
  
  getCurrentClubData(): Club[] {
    return this.clubsData;
  }
}
