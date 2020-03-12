import { Component } from '@angular/core';
import { NotesService } from '../shared/service/notes.service';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html'
})
export class NoteAddComponent {
  constructor(private service: NotesService) {}

  addNew() {
    this.service.triggerAddEvent();
  }
}
