import { Component, ComponentFactoryResolver, Inject, OnInit } from '@angular/core';
import { text } from '@angular/core/src/render3';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dialog-material',
  templateUrl: './dialog-material.component.html',
  styleUrls: ['./dialog-material.component.css']
})
export class DialogMaterialComponent implements OnInit {

   note: Note;
  noteTakeForm = new FormGroup({
    title: new FormControl(''),
    text: new FormControl('')
  });
  constructor(
    public dialogRef: MatDialogRef<DialogMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private noteService: NotesService
  ) {   }
  get title() {
    return this.noteTakeForm.get('title');
  }
  get text() {
    return this.noteTakeForm.get('text');
  }
  ngOnInit(): void {
    console.log("--->" + this.data.noteId)
    this.note = this.noteService.getNoteByID(this.data.noteId);
    console.log('find by id -> ' + this.note.id)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  updateNote() {
    console.log("Inside Update " + this.note.id);
    this.noteService.editNote(this.note).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    })
  }

}
