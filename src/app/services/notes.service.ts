import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Note } from '../note';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NotesService {

  notes: Array<Note> = [];
  // Subject that requires an initial value and emits its current value whenever it is subscribed to.
  subject:BehaviorSubject<Array<Note>> = new BehaviorSubject(this.notes);

  constructor(private httpClient: HttpClient, private aauthService: AuthenticationService) {
      this.fetchNoteDatafromServer();
  }

fetchNoteDatafromServer(){
  this.httpClient.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.aauthService.getBearerToken()}`)
    }).subscribe(data =>{
      this.notes=data;
      this.subject.next(this.notes); // ask to update
    });
}
  getNotes() : Observable<Array<Note>>{
    return this.subject;
    }

  addNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.aauthService.getBearerToken()}`)
    }).pipe(tap(note=>{
      this.notes.push(note);
      this.subject.next(this.notes)
    }));
  }
 getNoteByID(nodeId){
     const note=this.notes.find(note => note.id === +nodeId)
     console.log("inside servi" + note.id)
     console.log()
     //return Object.assign({},note);
     return note;
 }

 editNote(note){
   return this.httpClient.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`,note,{
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.aauthService.getBearerToken()}`)
   }).pipe(tap(
        editNote=>{
          const note=this.notes.find(note=> note.id === editNote.id);
          Object.assign(note,editNote);
          this.subject.next(this.notes); // ask to update
        }
   ))
 }













}
