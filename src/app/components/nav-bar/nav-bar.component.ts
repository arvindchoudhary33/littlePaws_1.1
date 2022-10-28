import { AfterViewInit, Component, OnInit } from '@angular/core';
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
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, AfterViewInit {
  faBell = faBell;
  faUsers = faUsers;
  faHouseChimneyWindow = faHouseChimneyWindow;
  faPhone = faPhone;
  faCat = faCat;
  faShieldDog = faShieldDog;
  faQuestion = faCircleQuestion;
  numberOfNotification: any;
  isUserLoggedIn: boolean = Boolean(
    localStorage.getItem('token') && localStorage.getItem('isEmailVerified')
  );
  // :TODO change the var name to something more readable
  opened = false;

  displayRoutes: boolean = false;
  constructor(
    private userauth: AuthService,
    private dialog: MatDialog,
    private database: DatabaseService
  ) { }

  ngAfterViewInit(): void { }
  ngOnInit(): void {
    this.database.checkForNotificationChange();
    this.database.notificationsChangeSubject.subscribe((value) => {
      console.log('whyyyyyy', value);
      this.numberOfNotification = String(value);
    });
    // subscribing to user logged in var to change the sign-in/ logout button at top right
    this.userauth.isLogged.subscribe((isLogged) => {
      console.log(isLogged);
      this.isUserLoggedIn = Boolean(isLogged);
    });

    // subscribing to notification change
  }

  openNotificationsDialog() {
    // localStorage.setItem('isNotificationSeen', 'true');
    this.numberOfNotification = '';
    this.dialog.open(NotificationComponent);
  }
  toggleSideNav() {
    this.opened = !this.opened;
  }

  logout() {
    // localStorage.setItem('isNotificationSeen', 'false');
    this.userauth.logout();
  }
}
