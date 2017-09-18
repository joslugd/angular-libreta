import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Note } from './note';
import { EditEvent } from './edit-event';

@Injectable()
export class EventBusService {
  // Sujetos que registrarán los distintos eventos.
  private noteToEditSource = new Subject<Note>();
  private cancelledNoteEditionSource = new Subject<Note>();
  private editionEventSource = new Subject<EditEvent>();

  // Crea observables a partir de los sujetos.
  noteToEdit$ = this.noteToEditSource.asObservable();
  cancelledNoteEdition$ = this.cancelledNoteEditionSource.asObservable();
  editionEvent$ = this.editionEventSource.asObservable();

  // Métodos para emitir eventos a los sujetos.
  selectNoteToEdit(note: Note) {
    this.noteToEditSource.next(note);
  }

  cancelNoteEdition(note: Note) {
    this.cancelledNoteEditionSource.next(note);
  }

  confirmNoteEdition(event: EditEvent) {
    this.editionEventSource.next(event);
  }
}
