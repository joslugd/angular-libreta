import {
  Component, OnInit, OnDestroy, Input, Output, EventEmitter, HostBinding
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

import { Note } from './note';
import { NotesService } from './notes.service';
import { EventBusService } from './eventbus.service';
import { slideInAnimation } from './right-panel.animation';

@Component({
    selector: 'app-noteview',
    template: `
      <notes-noteview *ngIf="note" [title]="note.title"
          (edit-clicked)="_handleEditClicked()"
          [innerHTML]="note.content | mdToHtml">
      </notes-noteview>
    `,
    animations: [slideInAnimation],
    styles: [ ':host { width: 100% }' ]
})
export class NoteViewComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  note: Note;
  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private eventBusService: EventBusService) {
  }

  ngOnInit() {
    // Suscribirse a eventos de cambio de ruta.
    this.routeSubscription = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.notesService.getNote(+params.get('index') - 1))
      .subscribe(note => this.note = note);
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  _handleEditClicked() {
    this.eventBusService.selectNoteToEdit(this.note);
  }
}
