import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-all-pets',
  templateUrl: './all-pets.component.html',
  styleUrls: ['./all-pets.component.scss'],
})
export class AllPetsComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.auth.logout();
  }
}
