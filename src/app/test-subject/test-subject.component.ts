import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestSubjectInputShowComponent } from './test-subject-input-show/test-subject-input-show.component';
import { SubjectsService } from '../subjects.service';

@Component({
  selector: 'app-test-subject',
  imports: [FormsModule, CommonModule, TestSubjectInputShowComponent],
  template: `
  <div>
    <section class="test-subject">
      <input type="text" [(ngModel)]='testSubject' >
      <button (click)='onTestSubjectCLick()' class="primary">Subjects</button>
    </section>
    <app-test-subject-input-show></app-test-subject-input-show>
  </div>
  `,
  styleUrls: ['./test-subject.component.css']
})
export class TestSubjectComponent {

  testSubject: string = '';
  subjectsService: SubjectsService = inject(SubjectsService);

  onTestSubjectCLick = () => {
    this.subjectsService.onCreateSubject(this.testSubject);
  }

}
