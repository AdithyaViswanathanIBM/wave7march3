import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  submitMessage: string;
  note: Note;
  notes: Array<Note> = [];
  noteTakeForm = new FormGroup({
    title: new FormControl(''),
    text: new FormControl('')
  });
  constructor(private notesService: NotesService) {
  }
  ngOnInit(): void {
    this.notesService.getNotes().subscribe(data => {
      this.notes = data;
    },
      error => {
        this.submitMessage = error.error;
      }
    );
  }

  // addNote() {
  //   this.notesService.addNote(this.noteTakeForm.value).subscribe(data => {
  //     this.notes.push(data);
  //   },
  //     err => {
  //      if (err.error) {
  //         this.submitMessage = err.error.message;
  //       } else {
  //         this.submitMessage = err.message;
  //       }
  //     });
  // }
}
