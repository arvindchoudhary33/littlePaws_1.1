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
  isUserLoggedIn: boolean = false;
  // :TODO change the var name to something more understandable
  opened = false;

  displayRoutes: boolean = false;
  constructor(
    private userauth: AuthService,
    location: Location,
    router: Router
  ) {
    router.events.subscribe((val) => {
      if (location.path() == '/choose-type') {
        console.log('router event');
        this.isUserAuthenticated();
      } else {
      }
    });
  }

  ngOnInit(): void {
    this.isUserLoggedIn = this.userauth.isAuthenticated();
  }

  toggleSideNav() {
    this.opened = !this.opened;
  }

  logout() {
    this.userauth.logout();
  }
  isUserAuthenticated() {
    if (this.userauth.isAuthenticated()) {
      this.displayRoutes = true;
    } else {
      this.displayRoutes = false;
    }
  }
}
