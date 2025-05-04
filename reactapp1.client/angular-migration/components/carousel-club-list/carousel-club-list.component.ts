
import { Component, Input, OnInit } from '@angular/core';
import { Club } from '../../models/club.model';

@Component({
  selector: 'app-carousel-club-list',
  templateUrl: './carousel-club-list.component.html',
  styleUrls: ['./carousel-club-list.component.scss']
})
export class CarouselClubListComponent implements OnInit {
  @Input() title: string = '';
  @Input() clubs: Club[] = [];
  
  currentIndex = 0;
  
  constructor() {}
  
  ngOnInit(): void {}
  
  setCurrentIndex(index: number): void {
    this.currentIndex = index;
  }
  
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.clubs.length;
  }
  
  previousSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.clubs.length) % this.clubs.length;
  }
}
