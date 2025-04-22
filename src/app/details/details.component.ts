import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';

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
        <button (click)="observableHandler()" class="primary">Test Observable</button>
        <div *ngFor = "let data of observableData" >{{data}}</div>
      </section>
      <section class="test-event" id='test-from-event'>
        <button #testFromEvent class="primary">From Event</button>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements AfterViewInit {
  route: ActivatedRoute = inject(ActivatedRoute)
  housingService = inject(HousingService)
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  observableData: number[] = [];

  @ViewChild('testFromEvent') testFromEvent!: ElementRef

  constructor() {
    const housingLocationId: number = Number(this.route.snapshot.params['id']);

    // this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);

    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation: HousingLocation) => this.housingLocation = housingLocation);
  }

  observableHandler = () => {
    this.housingService.getObservable4().subscribe({
      next: (val: number) => {
        this.observableData.push(val);
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        alert("All data is streamed successfully");
      }
    }
    );
  }

  onFormSubmit = () => {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    )
  }

  ngAfterViewInit() {
    this.onTestFromEvent();
  }

  onTestFromEvent = () => {
    let count = 1;
    const buttonObservable = fromEvent(this.testFromEvent.nativeElement, 'click');

    buttonObservable.subscribe((e) => {
      console.log("Button Clicked", e);
      this.appendItem(count++);
      console.log(count, 'count');
    })
  }

  appendItem = (count: number) => {
    const item = document.createElement('div');
    item.innerHTML = `Item: ${count}`;
    item.className = "test-item";
    item.style.marginBottom = "2vh";
    document.getElementById('test-from-event')?.appendChild(item);
  }
}
