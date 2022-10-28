import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  totalNotifications: number = 0;
  allNotifications: any;
  panelOpenState = false;
  constructor(private database: DatabaseService) {}

  ngOnInit(): void {
    console.log(this.allNotifications);
    this.allNotifications = this.database.allNotifications;
    console.log('dfadf', this.database.allNotifications);
  }
}
