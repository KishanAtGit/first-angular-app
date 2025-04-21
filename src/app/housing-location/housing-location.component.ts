import { Component, Input } from '@angular/core';
import { HousingLocation } from '../housing-location';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  imports: [RouterModule],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="housingLocationToRender.photo" alt="" />
      <h2 class="listing-heading">{{housingLocationToRender.name}}</h2>
      <p class="listing-location">{{housingLocationToRender.city}}, {{housingLocationToRender.state}}</p>
      <p><a [routerLink]="['details/', housingLocationToRender.id]">Learn More</a></p>
    </section>
  `,
  styleUrls: ['./housing-location.componet.css']
})
export class HousingLocationComponent {
  @Input() housingLocationToRender!: HousingLocation;
}
