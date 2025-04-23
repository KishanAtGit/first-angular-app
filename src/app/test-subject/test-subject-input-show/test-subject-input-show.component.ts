import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SubjectsService } from 'src/app/subjects.service';

@Component({
  selector: 'app-test-subject-input-show',
  imports: [CommonModule],
  template: `
    <section class="items-list">
      <p *ngFor='let item of items'>{{item}}</p>
      <button class="primary" (click)="removeItemFromBottom()">Remove From Bottom</button>
    </section>
  `,
  styleUrl: '../test-subject.component.css'
})
export class TestSubjectInputShowComponent implements OnInit {
  items: string[] = [];

  subjectsService: SubjectsService = inject(SubjectsService);

  ngOnInit() {
    this.subjectsService.CreateSubject.subscribe({
      next: (item: string) => {
        this.items.push(item);
      }
    });
  }

  removeItemFromBottom() {
    this.items.pop();
  }
}
