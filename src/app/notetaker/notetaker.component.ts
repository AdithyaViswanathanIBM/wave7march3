import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notetaker',
  templateUrl: './notetaker.component.html',
  styleUrls: ['./notetaker.component.css']
})
export class NotetakerComponent implements OnInit {

  notes: Array<Note>=[];
  noteTakeForm = new FormGroup({
    title: new FormControl(''),
    text: new FormControl('')
  });
  submitMessage: string;

  constructor(private notesService : NotesService) { }

  ngOnInit() {
  }

  addNote() {
    this.notesService.addNote(this.noteTakeForm.value).subscribe(data => {
      this.notes.push(data);
    },
      err => {
       if (err.error) {
          this.submitMessage = err.error.message;
        } else {
          this.submitMessage = err.message;
        }
      });
  }

}
