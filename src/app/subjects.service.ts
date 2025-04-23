import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  // CreateSubject: EventEmitter<string> = new EventEmitter<string>(); //We can create emitter by using this way

  CreateSubject = new Subject<string>();

  onCreateSubject(item: string) {
    // this.CreateSubject.emit(item);
    this.CreateSubject.next(item);
  }
}
