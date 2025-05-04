
import { Component, OnInit } from '@angular/core';
import { PartyUpdaterService, PartyUpdateInfo } from '../../services/party-updater.service';

@Component({
  selector: 'app-party-updater',
  templateUrl: './party-updater.component.html',
  styleUrls: ['./party-updater.component.scss']
})
export class PartyUpdaterComponent implements OnInit {
  lastUpdate: PartyUpdateInfo = {
    lastUpdated: "never",
    changedClubs: []
  };
  isUpdating = false;
  
  constructor(
    private partyUpdaterService: PartyUpdaterService,
    private toastService: ToastService // You would create this service for Angular
  ) {}
  
  ngOnInit(): void {
    const updateInfo = this.partyUpdaterService.checkAndUpdateParties();
    this.lastUpdate = updateInfo;
  }
  
  handleManualUpdate(): void {
    this.isUpdating = true;
    
    // Simulate a delay for the AI processing
    setTimeout(() => {
      const updateInfo = this.partyUpdaterService.updatePartiesWithAI();
      this.lastUpdate = updateInfo;
      
      // Show toast with results
      if (updateInfo.changedClubs.length > 0) {
        this.toastService.show({
          title: "Party Updates!",
          description: `${updateInfo.changedClubs.length} clubs have updated their party status.`,
          duration: 5000,
        });
      } else {
        this.toastService.show({
          title: "No Changes",
          description: "Our AI didn't find any clubs to update today.",
          duration: 3000,
        });
      }
      
      this.isUpdating = false;
      
      // Trigger page reload to update the map and club lists
      window.location.reload();
    }, 1500);
  }
}
