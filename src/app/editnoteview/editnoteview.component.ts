import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DialogMaterialComponent } from '../dialog-material/dialog-material.component';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-editnoteview',
  templateUrl: './editnoteview.component.html',
  styleUrls: ['./editnoteview.component.css']
})
export class EditnoteviewComponent implements OnInit {

  constructor(private dialog: MatDialog, private activeRoute: ActivatedRoute, private routerService: RouterService) {

    const id = +this.activeRoute.snapshot.paramMap.get('noteId');

    this.dialog.open(DialogMaterialComponent, {
      width: '250px',
      data: {
        noteId: id,
      }
    }).afterClosed().subscribe(result => {
      console.log("Id -> "+ id)
      this.routerService.routeToDashboard();
    })
  }
  ngOnInit() {
  }

}
