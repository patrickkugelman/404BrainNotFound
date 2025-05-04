
import { Component, Input } from '@angular/core';
import { Club } from '../../models/club.model';

@Component({
  selector: 'app-featured-club-card',
  templateUrl: './featured-club-card.component.html',
  styleUrls: ['./featured-club-card.component.scss']
})
export class FeaturedClubCardComponent {
  @Input() club!: Club;
}
