import {
  Component, OnInit, ElementRef, ViewChild, OnDestroy
} from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription';

import { Note } from './note';
import { NotesService } from './notes.service';
import { EventBusService } from './eventbus.service';

@Component({
  selector: 'app-root',
  template: `
    <notes-skeleton #skeleton
        (add-note)="_onNoteAdded($event)"
        (note-selected)="_onNoteSelected($event)"
        (note-delete)="_onNoteDeleted($event)"
        (help-clicked)="_onHelpClicked()"
        [notes]="notes"
        [selectedNote]="selectedNote">
      <router-outlet></router-outlet>
    </notes-skeleton>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('skeleton') skeleton: ElementRef;

  selectedNote: Note;
  notes: Note[];

  // Suscripciones.
  private routerSubscription: Subscription;
  private editionSubscription: Subscription;
  private cancelledEditionSubscription: Subscription;
  private editionConfirmedSubscription: Subscription;

  constructor(
    private notesService: NotesService,
    private eventBusService: EventBusService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.notesService.getNotes().then(notes => {
      this.notes = notes;
    });

    // Suscribirse a cambios de ruta.
    this.routerSubscription = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        const url = event.url;
        if (url.startsWith('/notes/')) {
          // El índice de la nota será el índice de la ruta - 1, debido
          // a que la ruta especifica el índice en base 1.
          const noteIdx = +url.split('/')[2] - 1;
          if (noteIdx < 0 || noteIdx >= this.notes.length) {
            this.selectedNote = null;
            this.router.navigate(['404']);
          } else {
            this.selectedNote = this.notes[noteIdx];
          }
        }
      }
    );

    // Suscribirse a evento de seleccionar nota para edición.
    this.editionSubscription = this.eventBusService.noteToEdit$.subscribe(
      note => {
        const noteIndex = this.notes.indexOf(note);
        this.router.navigate(['notes', noteIndex + 1, 'edit']);
      }
    );

    // Suscribirse a evento de cancelar edición.
    this.cancelledEditionSubscription = this.eventBusService
        .cancelledNoteEdition$.subscribe(note => {
      const noteIndex = this.notes.indexOf(note);
      this.router.navigate(['notes', noteIndex + 1]);
    });

    // Suscribirse a evento de confirmar edición.
    this.editionConfirmedSubscription =
      this.eventBusService.editionEvent$.subscribe(event => {
        const noteIndex = this.notes.indexOf(event.originalNote);
        this.notesService.updateNote(
          noteIndex, event.newTitle, event.newContent);

        // Notificar de la edición al componente Polymer.
        const polymerComp = this.skeleton.nativeElement;
        polymerComp.notifyNoteEdited(
          noteIndex, event.newTitle, event.newContent);

        // Cambiar de ruta a la de visualizar la nota.
        this.router.navigate(['notes', noteIndex + 1]);
      }
    );
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
    this.editionSubscription.unsubscribe();
    this.cancelledEditionSubscription.unsubscribe();
    this.editionConfirmedSubscription.unsubscribe();
  }

  _onHelpClicked() {
    this.selectedNote = null;
    this.router.navigate(['help']);
  }

  _onNoteSelected(event) {
    this.selectedNote = event.detail.note;

    const noteIndex = this.notes.indexOf(this.selectedNote);
    this.router.navigate(['notes', noteIndex + 1]);
  }

  _onNoteAdded(event) {
    this.notesService.createNote()
      .then((note: Note) => {
        this.skeleton.nativeElement.notifySplices('notes', [
          { index: this.notes.length - 1, removed: [], addedCount: 1,
            object: this.notes, type: 'splice' }
        ]);
      });
  }

  _onNoteDeleted(event) {
    const deletedNote: Note = event.detail.note;
    const selectedNoteIndex = this.notes.indexOf(this.selectedNote);
    const noteIndex = this.notes.indexOf(deletedNote);

    this.notesService.deleteNote(noteIndex)
      .then((_) => {
        // Notificar a Polymer.
        this.skeleton.nativeElement.notifySplices('notes', [
          { index: noteIndex, removed: [deletedNote], addedCount: 0,
            object: this.notes, type: 'splice' }
        ]);

        // Actualizar ruta si procede.
        if (selectedNoteIndex === noteIndex) {
          this.router.navigate(['']);
        }
      });
  }
}
