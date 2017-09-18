import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PolymerModule } from '@codebakery/origami';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NoNoteComponent } from './nonote.component';
import { NotFoundComponent } from './notfound.component';
import { NoteViewComponent } from './noteview.component';
import { NoteEditComponent } from './noteedit.component';
import { HelpComponent } from './help.component';
import { MdToHtmlPipe } from './md-to-html.pipe';
import { NotesService } from './notes.service';
import { EventBusService } from './eventbus.service';

const appRoutes = [
  { path: '', component: NoNoteComponent },
  { path: 'notes/:index', component: NoteViewComponent },
  { path: 'notes/:index/edit', component: NoteEditComponent },
  { path: 'help', component: HelpComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  declarations: [
    AppComponent,
    NoNoteComponent,
    NotFoundComponent,
    NoteViewComponent,
    NoteEditComponent,
    HelpComponent,
    MdToHtmlPipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    PolymerModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [NotesService, EventBusService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
