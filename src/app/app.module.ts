import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NoteComponent} from './note/note.component';
import {NoteListComponent} from './note-list/note-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NotesService} from './shared/service/notes.service';
import { NoteSearchComponent } from './note-search/note-search.component';
import { NoteAddComponent } from './note-add/note-add.component';


@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    NoteListComponent,
    NoteSearchComponent,
    NoteAddComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [NotesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
