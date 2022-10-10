import { Component, OnInit } from '@angular/core';

import {
  faUsers,
  faHouseChimneyWindow,
  faPhone,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void { }
}
