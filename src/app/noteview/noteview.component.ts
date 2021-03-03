import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-noteview',
  templateUrl: './noteview.component.html',
  styleUrls: ['./noteview.component.css']
})
export class NoteviewComponent implements OnInit {
  notes:Array<Note>=[];
  submitMessage: any;
  constructor(private notesService : NotesService) { }

  ngOnInit() {
    this.notesService.getNotes().subscribe(data => {
      this.notes = data;
    },
      error => {
        this.submitMessage = error.error;
      }
    );
  }

 
}
