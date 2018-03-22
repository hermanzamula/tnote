import { Component, OnInit } from '@angular/core';
import {NotesService} from '../shared/service/notes.service';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.css']
})
export class NoteAddComponent  {

  constructor(private service: NotesService) {

  }

  addNew() {
    this.service.triggerAddEvent();
  }


}
