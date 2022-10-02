import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  faUsers,
  faHouseChimneyWindow,
  faPhone,
  faQuestion,
  faQ,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  faUsers = faUsers;
  faHouseChimneyWindow = faHouseChimneyWindow;
  faPhone = faPhone;
  faQuestion = faCircleQuestion;
  opened = false;

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.minWidth = '50vw';
    dialogConfig.maxWidth = '95vw';
    // dialogConfig.height = ""
    dialogConfig.position = {
      top: '100px',
    };
    dialogConfig.panelClass = ['custom'];
    this.dialog.open(SignUpComponent, dialogConfig);
  }

  ngOnInit(): void {
    this.openDialog();
  }
}
