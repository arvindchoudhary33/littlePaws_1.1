import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthService } from 'src/app/shared/auth.service';
import { DatabaseService } from 'src/app/shared/database.service';
import { petsInfo } from '../../model/commonInterfaces';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-all-pets',
  templateUrl: './all-pets.component.html',
  styleUrls: ['./all-pets.component.scss'],
})
export class AllPetsComponent implements OnInit {
  constructor(private auth: AuthService, private database: DatabaseService) {}
  allPets: petsInfo[] = [];
  tagQuery: string[] = [];
  ngOnInit(): void {
    this.getAllData([]);
  }

  getAllData(tags: string[]) {
    this.allPets = [];
    this.database.getAllData(tags).then((value) => {
      value.forEach((elements: Object) => {
        this.allPets.push(Object(elements));
      });
      console.log(this.allPets);
    });
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  // fruits: Fruit[] = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tagQuery.push(value);
      this.getAllData(this.tagQuery);
      console.log(this.tagQuery);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.tagQuery.indexOf(tag);

    if (index >= 0) {
      this.tagQuery.splice(index, 1);
      this.getAllData(this.tagQuery);
    }
  }
}
