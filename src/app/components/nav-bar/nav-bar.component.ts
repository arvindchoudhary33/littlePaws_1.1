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
import { DatabaseService } from 'src/app/shared/database.service';

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
  constructor(
    private userauth: AuthService,
    private dialog: MatDialog,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    this.database.fetchInterestedUsers();
    // subscribing to user logged in var to change the sign-in/ logout button at top right
    this.userauth.isLogged.subscribe((isLogged) => {
      console.log(isLogged);
      this.isUserLoggedIn = Boolean(isLogged);
    });
    // if (localStorage.getItem('isNotificationSeen') != null) {
    //
    //   localStorage.setItem('isNotificationSeen', 'false');
    //
    //   this.numberOfNotification = String(this.database.allNotifications.length);
    // }
    // localStorage.setItem('currentNotificationLength', '');

    // if (
    //   nt !=
    //   Number(localStorage.getItem('currentNotificationLength'))
    // ) {
    //   this.numberOfNotification = String(
    //     Math.abs(
    //       Number(this.numberOfNotification) -
    //       Number(localStorage.getItem('currentNotificationLength'))
    //     )
    //   );
    // } else {
    //   this.numberOfNotification = '';
    // }
    // this.database.fetchInterestedUsers().then((value) => {
    //   console.log('coming');
    //   if (Boolean(localStorage.getItem('isNotificationSeen')) !== true) {
    //     console.log('here');
    //     this.numberOfNotification = value.length;
    //   }
    // });
  }

  openNotificationsDialog() {
    localStorage.setItem('isNotificationSeen', 'true');
    this.numberOfNotification = '';
    this.dialog.open(NotificationComponent);
  }
  toggleSideNav() {
    this.opened = !this.opened;
  }

  logout() {
    localStorage.removeItem('isNotificationSeen');
    localStorage.removeItem('currentNotificationLength');
    this.userauth.logout();
  }
}
