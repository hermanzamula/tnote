import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NotesService} from '../shared/service/notes.service';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-note-search',
  templateUrl: './note-search.component.html',
  styleUrls: ['./note-search.component.css']
})
export class NoteSearchComponent implements OnInit {
  search: FormGroup;
  @Output()
  onSearch: EventEmitter<string> = new EventEmitter();

  constructor(private service: NotesService, fb: FormBuilder) {
    this.search = fb.group({
      search: ['']
    });
  }

  ngOnInit() {
    this.search.get('search')
      .valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(str => {
        this.onSearch.emit(str);
        this.service.triggerSearch(str);
      });
  }
}

