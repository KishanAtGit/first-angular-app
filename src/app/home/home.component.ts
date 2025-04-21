import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { increment, decrement } from '../store/counter.actions';
import { Store } from '@ngrx/store';
import { selectCounter, selectCounterValue } from '../store/counter.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent, ReactiveFormsModule, AsyncPipe],
  template: `
    <section>
      <form>
        <input data-testid='city-filter' type="text" placeholder="Filter by city" #cityFilter />
        <button class="primary" type="button" (click)="onSearchClick(cityFilter.value)">Search</button>
      </form>
    </section>

    <section style="margin-top: 2rem;">
      <h3>Counter: {{ counter$ | async }}</h3>
      <button (click)="incrementCount()">Increment</button>
      <button (click)="decrementCount()">Decrement</button>
    </section>

    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredHousingLocationList"
        [housingLocationToRender]="housingLocation"
      ></app-housing-location>
    </section>
    <p id="housing-count" style="display: none">{{ housingLocationList.length }}</p>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredHousingLocationList: HousingLocation[] = [];

  //NgRx
  store = inject(Store);

  counter$ = this.store.select(selectCounterValue);

  // formData = new FormGroup({
  //   city: new FormControl<string>(''),
  // });

  constructor() {
    // this.housingLocationList = this.housingService.getAllHousingLocations();
    // this.filteredHousingLocationList = this.housingLocationList;

    // this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
    //   this.housingLocationList = housingLocationList;
    //   this.filteredHousingLocationList = housingLocationList;
    // })

    this.getAllHousingLocationList();
  }

  getAllHousingLocationList: () => Promise<void> = async () => {
    const res = await this.housingService.getAllHousingLocations();
    this.housingLocationList = res ?? [];
    this.filteredHousingLocationList = this.housingLocationList;
  }

  onSearchClick = (text: string) => {
    if (!text) {
      this.filteredHousingLocationList = this.housingLocationList;
    } else {
      this.filteredHousingLocationList = this.housingLocationList.filter(housingLocation => housingLocation.city.toLowerCase().includes(text.toLowerCase()));
    }
  }

  incrementCount = () => {
    this.store.dispatch(increment({ msg: "Increment" }));
  }

  decrementCount = () => {
    this.store.dispatch(decrement({ msg: "2" }));
  }

  // onFormSubmit = () => {

  //   const city = this.formData.value?.city ?? '';

  //   if (city) {
  //     this.housingLocationList = this.housingService.getAllHousingLocations().filter(housingLocation => housingLocation.city.toLowerCase().includes(city.toLowerCase()));
  //   } else {
  //     this.housingLocationList = this.housingService.getAllHousingLocations();
  //   }
  // }
}