import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

import { Note } from './note';
import { NotesService } from './notes.service';
import { EventBusService } from './eventbus.service';
import { EditEvent } from './edit-event';
import { slideInAnimation } from './right-panel.animation';

@Component({
  selector: 'app-noteedit',
  template: `
    <notes-noteedit [note]="note"
      (back-clicked)="_onBackClicked($event)"
      (save-clicked)="_onSaveClicked($event)"></notes-noteedit>
  `,
  animations: [slideInAnimation],
  styles: [ ':host { width: 100% }' ]
})
export class NoteEditComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  note: Note;
  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private eventBusService: EventBusService
  ) { }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.notesService.getNote(+params.get('index') - 1))
      .subscribe(note => this.note = note);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  _onBackClicked(event) {
    this.eventBusService.cancelNoteEdition(event.detail.note);
  }

  _onSaveClicked(event) {
    this.eventBusService.confirmNoteEdition(event.detail);
  }
}
