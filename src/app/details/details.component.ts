import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" alt="">
      <section class="listing-description">
      <h2 class="listing-heading">{{housingLocation?.name}}</h2>
      <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units Available: {{housingLocation?.availableUnits}}</li>
          <li>{{housingLocation?.wifi ? 'Wifi Available' : 'No Wifi Available'}}</li>
          <li>{{housingLocation?.laundry ? 'Laundry Available' : 'No Laundry Available'}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]='applyForm' (submit)="onFormSubmit()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName='firstName'>
          
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName='lastName'>
          
          <label for="email">Email</label>
          <input id="email" type="text" formControlName='email'>
          <button type='submit' class="primary">Apply now</button>
        </form>
      </section>

      <section class="test-observable">
        <button (click)="observableHandler()">Test Observable</button>
        <div *ngFor = "let data of observableData" >{{data}}</div>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  housingService = inject(HousingService)
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  observableData: number[] = [];

  observableHandler = () => {
    this.housingService.getObservable().subscribe((data: number) => this.observableData.push(data));
  }

  constructor() {
    const housingLocationId: number = Number(this.route.snapshot.params['id']);

    // this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);

    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation: HousingLocation) => this.housingLocation = housingLocation);
  }

  onFormSubmit = () => {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    )
  }
}
