
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartyUpdaterComponent } from './party-updater/party-updater.component';
import { CarouselClubListComponent } from './carousel-club-list/carousel-club-list.component';
import { FeaturedClubCardComponent } from './featured-club-card/featured-club-card.component';

@NgModule({
  declarations: [
    PartyUpdaterComponent,
    CarouselClubListComponent,
    FeaturedClubCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PartyUpdaterComponent,
    CarouselClubListComponent
  ]
})
export class PartyMapModule { }
