import {Injectable} from '@angular/core';
import {Note} from '../model/note.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class NotesService {

  private notesRepo: Array<Note> = [];
  private noteSearchSubject = new Subject<string>();
  private noteSelectSubject = new Subject<Note>();
  private noteAddSubject = new Subject();
  readonly noteSearchEvent = this.noteSearchSubject.asObservable();
  readonly noteSelectEvent = this.noteSelectSubject.asObservable();
  readonly noteAddEvent = this.noteAddSubject.asObservable();

  private storage: Storage = window.localStorage;

  constructor() {
    this.notesRepo = JSON.parse(this.storage.getItem('notesRepo') || '[]');
  }

  getAll() {
    return [...this.notesRepo];
  }

  save(note: Note) {
    if (!note.id) {
      note.id = Math.random();
      this.notesRepo.push(note);
      this.updateStorage();
      return;
    }
    const toUpdate = this.notesRepo.find((n) => n.id === note.id);
    Object.assign(toUpdate, note);
    this.updateStorage();
  }

  private updateStorage() {
    this.storage.setItem('notesRepo', JSON.stringify(this.notesRepo));
  }

  deleteNote(note: Note) {
    this.notesRepo = this.notesRepo.filter(n => n.id !== note.id);
    this.updateStorage();
  }

  find(keyword: string): Array<Note> {
    if(!keyword) {
      return [...this.notesRepo];
    }
    return this.notesRepo.filter(n => n.keywords.indexOf(keyword) !== -1);
  }

  triggerSearch(str: string) {
    this.noteSearchSubject.next(str);
  }

  triggerSelect(note: Note) {
    this.noteSelectSubject.next(note);
  }

  triggerAddEvent() {
    this.noteAddSubject.next();
  }
}
