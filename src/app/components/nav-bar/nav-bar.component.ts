import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import {
  faUsers,
  faHouseChimneyWindow,
  faPhone,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/auth.service';

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
  isUserLoggedIn: boolean = Boolean(localStorage.getItem('token'));
  // :TODO change the var name to something more readable
  opened = false;

  displayRoutes: boolean = false;
  constructor(
    private userauth: AuthService,
    // location: Location,
    router: Router
  ) {
    userauth.isLogged.subscribe((data) => {
      this.isUserLoggedIn = Boolean(data);
    });

    // router.events.subscribe((val) => {
    //   if (location.path() == '/choose-type') {
    //   } else {
    //   }
    // });
  }

  ngOnInit(): void {
    // subscribing to user logged in var to change the sign-in/ logout button at top right
    this.userauth.isLogged.subscribe((isLogged) => {
      this.isUserLoggedIn = Boolean(isLogged);
    });
  }

  toggleSideNav() {
    this.opened = !this.opened;
  }

  logout() {
    this.userauth.logout();
  }
}
