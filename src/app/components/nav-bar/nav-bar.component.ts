import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import {
  faUsers,
  faHouseChimneyWindow,
  faPhone,
  faCat,
  faShieldDog,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationComponent } from '../all-pets/child/notification/notification.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  faBell = faBell;
  faUsers = faUsers;
  faHouseChimneyWindow = faHouseChimneyWindow;
  faPhone = faPhone;
  faCat = faCat;
  faShieldDog = faShieldDog;
  faQuestion = faCircleQuestion;
  numberOfNotification = '';
  isUserLoggedIn: boolean = Boolean(
    localStorage.getItem('token') && localStorage.getItem('isEmailVerified')
  );
  // :TODO change the var name to something more readable
  opened = false;

  displayRoutes: boolean = false;
  constructor(private userauth: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // subscribing to user logged in var to change the sign-in/ logout button at top right
    this.userauth.isLogged.subscribe((isLogged) => {
      console.log(isLogged);
      this.isUserLoggedIn = Boolean(isLogged);
    });
  }

  openNotificationsDialog() {
    this.dialog.open(NotificationComponent);
  }
  toggleSideNav() {
    this.opened = !this.opened;
  }

  logout() {
    this.userauth.logout();
  }
}
