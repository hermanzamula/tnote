import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Note} from '../shared/model/note.model';
import {NotesService} from '../shared/service/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  form: FormGroup;
  note: Note = new Note();

  constructor(private fb: FormBuilder, private service: NotesService) {
    this.form = fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      keywords: [''],
      date: ['', Validators.required]
    });
    this.service.noteSelectEvent.subscribe(n => {
      this.note = n;
      if(!n) {
        return this.clearForm();
      }
      this.form.setValue({
        title: n.title,
        body: n.body,
        keywords: n.keywords,
        date: n.date
      });
    });
    this.service.noteAddEvent.subscribe(n => {
      this.clearForm();
    });
  }

  private clearForm() {
    this.note = new Note();
    this.form.setValue({
      title: '',
      body: '',
      keywords: '',
      date: ''
    });
  }

  ngOnInit() {

  }

  add() {
    const title = this.form.get('title').value;
    const body = this.form.get('body').value;
    const keywords = this.form.get('keywords').value;
    const date = this.form.get('date').value;
    const note = Object.assign(new Note(), this.note, {title, body, keywords, date});
    this.service.save(note);
    this.clearForm();
  }

  remove() {
    this.service.deleteNote(this.note);
    this.clearForm();
  }

}
