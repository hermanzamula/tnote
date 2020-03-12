import {Component} from '@angular/core';
import {NotesService} from '../shared/service/notes.service';


import {Note} from '../shared/model/note.model';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html'
})
export class NoteListComponent {
  notesFn;
  selected: Note;

  constructor(private service: NotesService) {
    this.notesFn = () => service.getAll();
    this.service.noteSearchEvent.subscribe(n => {
      this.notesFn = () => this.service.find(n);
      this.selected = this.service.find(n)[0];
      this.service.triggerSelect(this.selected);
    });
    this.service.noteAddEvent.subscribe(n => this.selected = null);
  }

  selectNote(n: Note) {
    this.selected = n;
    this.service.triggerSelect(n);
  }

}
